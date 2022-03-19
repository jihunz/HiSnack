package kr.ac.hisnack.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ac.hisnack.model.Product;
import kr.ac.hisnack.service.ProductService;
import kr.ac.hisnack.util.Pager;

@Controller
@RequestMapping("/shopping")
public class ShoppingController {
	@Autowired
	ProductService service;
	
	final String PATH = "shopping/";
	
//	쇼핑 메인 페이지
//	상품 리스트를 전달한다
	@GetMapping("/list")
	public String list(Pager pager, Model model){
		List<Product> list = service.list(pager);
		model.addAttribute("list", list);
		return PATH+"list";
	}
	
//	상품 상세 페이지
//	상품 정보를 전달한다
	@GetMapping("/{code}")
	public String item(@PathVariable int code, Model model) {
		Product item = service.item(code);
		model.addAttribute("item", item);
		return PATH+"item";
	}
}
