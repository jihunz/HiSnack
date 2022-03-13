package kr.ac.hisnack.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ac.hisnack.service.ProductService;

@Controller
public class RootController {
	@Autowired
	ProductService ps;
	
	@RequestMapping("/")
	public String index() {
		return "index";
	}
}
