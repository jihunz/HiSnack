package kr.ac.hisnack.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import kr.ac.hisnack.model.Image;
import kr.ac.hisnack.model.Product;
import kr.ac.hisnack.service.ProductImageService;
import kr.ac.hisnack.service.ProductService;
import kr.ac.hisnack.util.FileUploader;
import kr.ac.hisnack.util.Pager;

@Controller
@RequestMapping("/product")
public class ProductController {
	@Autowired
	ProductService service;
	@Autowired
	ProductImageService imageService;
	
	final String PATH = "product/";
	
	
	@GetMapping("/list")
	public String list(Pager pager, Model model){
		List<Product> list = service.list(pager);
		model.addAttribute("list", list);
		return PATH+"list";
	}
	
	@GetMapping("/item")
	public String item(int code, Model model) {
		Product item = service.item(code);
		model.addAttribute("item", item);
		return PATH+"item";
	}
	
	@GetMapping("/add")
	public String add() {
		return PATH+"add";
	}
	
//	이미지를 보낼때 name 속성을 image로 통일하여 보내면 됩니다 
	@PostMapping("/add")
	public String add(Product item, @RequestParam("image") List<MultipartFile> images, FileUploader uploader) {
		List<Image> imageList = uploader.upload(images);
		item.setImages(imageList);
		
		service.add(item);
		return "redirect:list";
	}
	
	@GetMapping("/update")
	public String update(Model model, int code) {
		Product item = service.item(code);
		model.addAttribute("item", item);
		return PATH+"update";
	}
	
	@PostMapping("/update")
	public String update(Product item, @RequestParam("image") List<MultipartFile> images, FileUploader uploader) {
		
		imageService.delete(item.getCode());
		
		List<Image> imageList = uploader.upload(images);
		item.setImages(imageList);
		
		service.update(item);
		return "redirect:list";
	}
	
	@GetMapping("/delete")
	public String delete(int code, FileUploader uploader) {
		imageService.delete(code);
		service.delete(code);
		
		return "redirect:list";
	}
}
