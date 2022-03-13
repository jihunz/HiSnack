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

import kr.ac.hisnack.model.Orders;
import kr.ac.hisnack.service.OrdersService;
import kr.ac.hisnack.util.Pager;

@RestController
@RequestMapping("/rest/orders")
public class OrdersRestService {
	@Autowired
	OrdersService service;
	
	@GetMapping
	public List<Orders> list(Pager pager){
		return service.list(pager);
	}
	
	@GetMapping("/item")
	public Orders item(int code) {
		return service.item(code);
	}
	
	@PostMapping
	public Orders add(@RequestBody Orders item) {
		service.add(item);
		return item;
	}
	
	@PutMapping
	public Orders update(@RequestBody Orders item) {
		service.update(item);
		return item;
	}
	
	@DeleteMapping
	public int delete(int code) {
		service.delete(code);
		return code;
	}
}
