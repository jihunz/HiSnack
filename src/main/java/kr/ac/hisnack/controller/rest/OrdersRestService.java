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

//	주문 시 pcodes(제품의 기본키)와 amount의 개수가 같아야한다
	@PostMapping
	public Orders add(Orders item, @RequestParam("pcode") List<Integer> pcodes, 
			@RequestParam("amount") List<Integer> amounts) {
		try {
			item.setProducts(pcodes, amounts);
		} catch (Exception e) {
			e.printStackTrace();
		}
		service.add(item);
		return item;
	}
	
//	pcodes(제품의 기본키)와 amount의 개수가 같아야한다
	@PostMapping("/{code}")
	public Orders update(@PathVariable int code, Orders item, @RequestParam("pcode") List<Integer> pcodes,
			@RequestParam("amount") List<Integer> amounts) {
		item.setCode(code);
		
		try {
			item.setProducts(pcodes, amounts);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		service.update(item);
		return item;
	}
	
	@DeleteMapping("/{code}")
	public int delete(@PathVariable int code) {
		service.delete(code);
		return code;
	}
}
