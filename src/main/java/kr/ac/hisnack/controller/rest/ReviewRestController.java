package kr.ac.hisnack.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.ac.hisnack.model.Review;
import kr.ac.hisnack.service.ImageService;
import kr.ac.hisnack.service.ReviewService;
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
	
	@GetMapping("/item")
	public Review item(int code) {
		return service.item(code);
	}
	
	@PostMapping
	public Review add(@RequestBody Review item) {
		service.add(item);
		return item;
	}
	
	@PutMapping
	public Review update(@RequestBody Review item) {
		imageService.delete(item.getCode());
		service.update(item);
		return item;
	}
	
	@DeleteMapping
	public int delete(int code) {
		imageService.delete(code);
		service.delete(code);
		return code;
	}
}
