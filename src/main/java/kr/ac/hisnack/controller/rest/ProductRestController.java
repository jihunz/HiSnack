package kr.ac.hisnack.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.ac.hisnack.model.Product;
import kr.ac.hisnack.service.ProductService;
import kr.ac.hisnack.util.Pager;

@RestController
@RequestMapping("/rest/product")
public class ProductRestController {
	@Autowired
	ProductService service;
	
	@GetMapping
	public List<Product> list(Pager pager){
		return service.list(pager);
	}
	
	@GetMapping("/item")
	public Product item(int code) {
		return service.item(code);
	}
	
	@PostMapping
	public Product add(@RequestBody Product item) {
		service.add(item);
		return item;
	}
	
	@PutMapping
	public Product update(@RequestBody Product item) {
		service.update(item);
		return item;
	}
	
	@DeleteMapping
	public int delete(int code) {
		service.delete(code);
		return code;
	}
}
