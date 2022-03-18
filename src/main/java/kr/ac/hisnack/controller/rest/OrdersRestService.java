package kr.ac.hisnack.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	@GetMapping("/{code}")
	public Orders item(@PathVariable int code) {
		return service.item(code);
	}

//	formData를 사용해야 하는 메소드
	@PostMapping
	public Orders add(Orders item, @RequestParam("pcode") List<Integer> pcodes) {
		service.add(item);
		return item;
	}
	
//	formData를 사용해야 하는 메소드
	@PostMapping("/{code}")
	public Orders update(@PathVariable int code, Orders item, @RequestParam("pcode") List<Integer> pcodes) {
		item.setCode(code);
		service.update(item);
		return item;
	}
	
	@DeleteMapping("/{code}")
	public int delete(@PathVariable int code) {
		service.delete(code);
		return code;
	}
}
