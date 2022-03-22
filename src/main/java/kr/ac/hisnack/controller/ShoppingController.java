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

/**
 * 쇼핑과 관련된 일을 하는 Controller
 * @author 오종택
 */
@Controller
@RequestMapping("/shopping")
public class ShoppingController {
	@Autowired
	ProductService service;
	
	final String PATH = "shopping/";
	
	/**
	 * 쇼핑 페이지로 이동시키는 메서드, 상품의 리스트를 jsp에 넘겨준다 
	 * @param pager : 표시할 상품의 개수를 정할 수 있다
	 * @param model : jsp 상품을 전달할 때 사용된다
	 * @return 쇼핑 상품 리스트 페이지의 경로를 반환
	 */
	@GetMapping("/list")
	public String list(Pager pager, Model model){
		List<Product> list = service.list(pager);
		model.addAttribute("list", list);
		return PATH+"list";
	}
	
	/**
	 * 쇼핑 상세 페이지로 이동 시키는 메서드
	 * @param code : 상세한 정보를 보고 싶은 상품의 기본키
	 * @param model : 상품의 정보를 전달하는데 사용한 클래스
	 * @return 쇼핑 상품 상세 페이지의 경로 반환
	 */
	@GetMapping("/{code}")
	public String item(@PathVariable int code, Model model) {
		Product item = service.item(code);
		model.addAttribute("item", item);
		return PATH+"item";
	}
}
