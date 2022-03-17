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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.ac.hisnack.model.Product;
import kr.ac.hisnack.service.ImageService;
import kr.ac.hisnack.service.ProductService;
import kr.ac.hisnack.util.Pager;

@RestController
@RequestMapping("/rest/product")
public class ProductRestController {
	@Autowired
	ProductService service;
	@Autowired
	@Qualifier("ProductImageService")
	ImageService imageService;
	
	@GetMapping
	public List<Product> list(Pager pager){
		return service.list(pager);
	}
	
	@GetMapping("/item")
	public Product item(int code) {
		return service.item(code);
	}
	
	@PostMapping
	public Product add(@RequestBody Product item, @RequestParam("tcode") List<Integer> tcodes) {
		item.setTagsWithTcode(tcodes);
		service.add(item);
		return item;
	}
	
	@PutMapping
	public Product update(@RequestBody Product item, @RequestParam("tcode") List<Integer> tcodes) {
		imageService.delete(item.getCode());
		item.setTagsWithTcode(tcodes);
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
