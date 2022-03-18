package kr.ac.hisnack.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.ac.hisnack.model.Image;
import kr.ac.hisnack.model.Review;
import kr.ac.hisnack.service.ImageService;
import kr.ac.hisnack.service.ReviewService;
import kr.ac.hisnack.util.FileUploader;
import kr.ac.hisnack.util.Pager;

@RestController
@RequestMapping("/rest/review")
public class ReviewRestController {
	@Autowired
	ReviewService service;
	@Autowired
	@Qualifier("ReviewImageService")
	ImageService imageService;
	
	@GetMapping
	public List<Review> list(Pager pager){
		return service.list(pager);
	}
	
	@GetMapping("/{code}")
	public Review item(@PathVariable int code) {
		return service.item(code);
	}
	
//	formData를 사용해야 하는 메소드
	@PostMapping
	public Review add(Review item, @RequestParam("image") List<MultipartFile> images) {
		FileUploader uploader = new FileUploader();
		List<Image> imageList = uploader.upload(images);
		item.setImages(imageList);
		service.add(item);
		return item;
	}
	
//	formData를 사용해야 하는 메소드
	@PostMapping("/{code}")
	public Review update(@PathVariable int code, Review item, @RequestParam("image") List<MultipartFile> images) {
		item.setCode(code);
		imageService.delete(item.getCode());
		
		FileUploader uploader = new FileUploader();
		List<Image> imageList = uploader.upload(images);
		item.setImages(imageList);
		
		service.update(item);
		return item;
	}
	
	@DeleteMapping("/{code}")
	public int delete(@PathVariable int code) {
		imageService.delete(code);
		service.delete(code);
		return code;
	}
}
