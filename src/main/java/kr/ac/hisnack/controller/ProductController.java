package kr.ac.hisnack.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import kr.ac.hisnack.model.Image;
import kr.ac.hisnack.model.Product;
import kr.ac.hisnack.service.ProductService;
import kr.ac.hisnack.util.FileUploader;

@Controller
@RequestMapping("/product")
public class ProductController {
	@Autowired
	ProductService service;
	final String PATH = "product/";
	
	@GetMapping("/add")
	public String add() {
		return PATH+"add";
	}
	
	@PostMapping("/add")
	public String add(Product item, @RequestParam("image") List<MultipartFile> images) {
		FileUploader uploader = new FileUploader();
		List<Image> imageList = uploader.upload(images);
		item.setImages(imageList);
		service.add(item);
		return "redirect:/";
	}
}
