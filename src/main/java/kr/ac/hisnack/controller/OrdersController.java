package kr.ac.hisnack.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import kr.ac.hisnack.model.Member;
import kr.ac.hisnack.model.Orders;
import kr.ac.hisnack.model.Product;
import kr.ac.hisnack.model.Tag;
import kr.ac.hisnack.service.MemberTagService;
import kr.ac.hisnack.service.OrdersService;

@Controller
@RequestMapping("/orders")
public class OrdersController {
	final String PATH = "orders/";
	
	@Autowired
	OrdersService service;
	@Autowired
	MemberTagService mts;
	
//	결제 페이지
//	만약 로그인을 했으면 유저의 정보를 결제페이지에 보내줌 
//	장바구니에 들어있는 상품들의 정보를 보내줌
	@GetMapping("/payment")
	public String payment(Model model, HttpSession session) {
		Member user = (Member) session.getAttribute("user");
		
		if(user != null) {
			model.addAttribute("user", user);
		}
		
		Object cart = session.getAttribute("cart");
		
		if(cart != null && cart instanceof Collection) {
			List<?> list = new ArrayList<>((Collection<?>)cart);
			
			List<Product> products = list.stream()
			.filter(elem -> elem instanceof Product)
			.map(elem -> (Product)elem)
			.collect(Collectors.toList());
			
			model.addAttribute("list", products);
		}
		
		return PATH+"payment";
	}
	
//	결제 확인시 들어오는 컨트롤러
//	파라미터로 결제 내용, 결제하는 상품의 기본키들, 결제하는 상품의 양들을 받는다
//	만약 구독을 통에 결제 페이지에 들어오면 구독에서 선택한 태그들이 있는지 확인한다
//	session에 넣어두었던 list를 태그 리스트로 변환하고 결제 내용에 이 결제는 구독이라고 명시한다
//	DB에 저장하기 전에 주문 정보에 주문한 상품들을 넣는다
	@PostMapping("/payment")
	public String payment(Orders item, HttpSession session, 
			@RequestParam("pcode") List<Integer> pcodes, 
			@RequestParam("amount") List<Integer> amounts,
			RedirectAttributes ra) {
		Object tags = session.getAttribute("tags");
		
		if(tags != null && tags instanceof Collection) {
			List<?> list = new ArrayList<>((Collection<?>)tags);
			Member user = (Member) session.getAttribute("user");
			
			List<Tag> tagList = list.stream()
			.filter(elem -> elem instanceof Tag)
			.map(elem -> (Tag)elem)
			.collect(Collectors.toList());
			
			mts.add(tagList, user);
			
			item.setSubscribe('y');
			session.removeAttribute("tags");
		}
		else {
			item.setSubscribe('n');
		}
		
		try {
			item.setProducts(pcodes, amounts);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		service.add(item);
		ra.addFlashAttribute("order_code", item.getCode());
		return "redirect:confirm";
	}
	
//	장바구니 페이지
//	현재 세션에 저장되있는 상품들을 전달한다
	@GetMapping("/cart")
	public String cart(Model model, HttpSession session) {
		Object cart = session.getAttribute("cart");
		
		if(cart != null && cart instanceof Collection) {
			List<?> list = new ArrayList<>((Collection<?>)cart);
			
			List<Product> products = list.stream()
			.filter(elem -> elem instanceof Product)
			.map(elem -> (Product)elem)
			.collect(Collectors.toList());
			
			model.addAttribute("list", products);
		}
		return PATH+"cart";
	}
	
//	결제를 완료 했을 시 오는 페이지
//	결제 정보를 전달한다
	@GetMapping("/confirm")
	public String confirm(Model model, RedirectAttributes rs) {
		Map<String, ?> map = rs.getFlashAttributes();
		
		if(map != null) {
			int code = (int) map.get("order_code");
			Orders item = service.item(code);
			
			model.addAttribute("item", item);
		}
		
		return PATH+"confirm";
	}
}
