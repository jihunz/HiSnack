package kr.ac.hisnack.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import kr.ac.hisnack.model.Image;
import kr.ac.hisnack.model.Review;
import kr.ac.hisnack.service.ImageService;
import kr.ac.hisnack.service.ReviewService;
import kr.ac.hisnack.util.FileUploader;
import kr.ac.hisnack.util.Pager;

@Controller
@RequestMapping("/review")
public class ReviewController {
	final String PATH = "review/";
	
	@Autowired
	ReviewService service;
	@Autowired
	@Qualifier("ReviewImageService")
	ImageService imageService;
	
//	리뷰 리스트 페이지
	@GetMapping("/list")
	public String list(Pager pager, Model model) {
		List<Review> list = service.list(pager);
		model.addAttribute("list", list);
		
		return PATH+"list";
	}
	
//	리뷰 상세 페이지
	@GetMapping("/{code}")
	public String item(@PathVariable int code, Model model) {
		Review item = service.item(code);
		model.addAttribute("item", item);
		return PATH+"item";
	}
	
//	리뷰 작성 페이지
	@GetMapping("/add")
	public String add() {
		return PATH+"add";
	}
	
//	작성한 리뷰를 DB에 추가하고 리뷰 리스트 페이지로 이동
//	이미지를 D드라이브에 저장하고 리뷰VO에 저장 후 Service에게 전달
	@PostMapping("/add")
	public String add(Review item, @RequestParam("image") List<MultipartFile> images, FileUploader uploader) {
		List<Image> imageList = uploader.upload(images);
		item.setImages(imageList);
		service.add(item);
 		return "redirect:list";
	}
	
//	리뷰 수정 페이지
//	수정할 리뷰를 전달한다
	@GetMapping("/update/{code}")
	public String update(@PathVariable int code, Model model) {
		Review item = service.item(code);
		model.addAttribute("item", item);
		return PATH+"update";
	}
	
//	수정한 리뷰를 저장한다
//	리뷰 이미지를 D드라이브에서 다 지우고 다시 저장한다
//	그 후 리스트 페이지로 이동
	@PostMapping("/update/{code}")
	public String update(@PathVariable int code, Review item,
			@RequestParam("image") List<MultipartFile> images, FileUploader uploader) {
		item.setCode(code);
		imageService.delete(item.getCode());
		
		List<Image> imageList = uploader.upload(images);
		item.setImages(imageList);
		
		service.update(item);
		return "redirect:../list";
	}
	
//	지정한 리뷰를 지우고 리스트 페이지로 이동
	@GetMapping("/delete/{code}")
	public String delete(@PathVariable int code) {
		imageService.delete(code);
		service.delete(code);
		return "redirect:../list";
	}
}
