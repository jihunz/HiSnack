package kr.ac.hisnack.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
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
	
	@GetMapping("/list")
	public String list(Pager pager, Model model) {
		List<Review> list = service.list(pager);
		model.addAttribute("list", list);
		
		return PATH+"list";
	}
	
	@GetMapping("/item")
	public String item(int code, Model model) {
		Review item = service.item(code);
		model.addAttribute("item", item);
		return PATH+"item";
	}
	
	@GetMapping("/add")
	public String add() {
		return PATH+"add";
	}
	
	@PostMapping("/add")
	public String add(Review item, @RequestParam("image") List<MultipartFile> images, FileUploader uploader) {
		List<Image> imageList = uploader.upload(images);
		item.setImages(imageList);
		service.add(item);
 		return "redirect:list";
	}
	
	@GetMapping("/update")
	public String update(int code, Model model) {
		Review item = service.item(code);
		model.addAttribute("item", item);
		return PATH+"update";
	}
	
	@PostMapping("/update")
	public String update(Review item, @RequestParam("image") List<MultipartFile> images, FileUploader uploader) {
		imageService.delete(item.getCode());
		
		List<Image> imageList = uploader.upload(images);
		item.setImages(imageList);
		
		service.update(item);
		return "redirect:list";
	}
	
	@GetMapping("/delete")
	public String delete(int code) {
		imageService.delete(code);
		service.delete(code);
		return "redirect:list";
	}
}
