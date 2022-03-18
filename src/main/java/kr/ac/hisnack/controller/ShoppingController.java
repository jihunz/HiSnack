package kr.ac.hisnack.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
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
}
