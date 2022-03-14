package kr.ac.hisnack.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.ac.hisnack.model.Image;
import kr.ac.hisnack.model.Product;
import kr.ac.hisnack.service.ProductImageService;
import kr.ac.hisnack.service.ProductService;
import kr.ac.hisnack.util.FileUploader;
import kr.ac.hisnack.util.Pager;

@RestController
@RequestMapping("/rest/product")
public class ProductRestController {
	@Autowired
	ProductService service;
	@Autowired
	ProductImageService imageService;
	
	@GetMapping
	public List<Product> list(Pager pager){
		return service.list(pager);
	}
	
	@GetMapping("/item")
	public Product item(int code) {
		return service.item(code);
	}
	
//	이미지를 보낼때 name 속성을 image로 통일하여 보내면 됩니다 
	@PostMapping
	public Product add(Product item, @RequestParam("image") List<MultipartFile> images, FileUploader uploader) {
		List<Image> imageList = uploader.upload(images);
		item.setImages(imageList);
		
		service.add(item);
		return item;
	}
	
	@PutMapping
	public Product update(Product item, @RequestParam("image") List<MultipartFile> images, FileUploader uploader) {
		
		imageService.delete(item.getCode());
		
		List<Image> imageList = uploader.upload(images);
		item.setImages(imageList);
		
		service.update(item);
		return item;
	}
	
	@DeleteMapping
	public int delete(int code, FileUploader uploader) {
		imageService.delete(code);
		service.delete(code);
		
		return code;
	}
}
