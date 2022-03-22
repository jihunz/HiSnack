package kr.ac.hisnack.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ac.hisnack.model.Member;
import kr.ac.hisnack.model.OrderedProduct;
import kr.ac.hisnack.model.Orders;
import kr.ac.hisnack.model.Product;
import kr.ac.hisnack.service.MemberTagService;
import kr.ac.hisnack.service.OrdersService;
import kr.ac.hisnack.service.ProductService;
import kr.ac.hisnack.util.ObjectConverter;

/**
 * 주문과 관련된 일을 하는 Controller
 * @author 오종택
 *
 */
@Controller
@RequestMapping("/orders")
public class OrdersController {
	final String PATH = "orders/";
	
	@Autowired
	OrdersService service;
	@Autowired
	MemberTagService mts;
	@Autowired
	ProductService ps;
	
/**
 * 주문 바구니에 넣어둔 상품 리스트를 결재하기 위한 페이지,
 * 회원이 로그인하고 있으면 회원의 정보를 jsp에 넘겨준다
 * @param model : 장바구니에 있는 상품리스트와 회원의 정보를 전달하는데 사용
 * @param session : 장바구니와 회원의 정보를 얻는데 사용
 * @param converter : object 변수를 list로 변환해줌
 * @return 결재 페이지의 경로를 반환
 */
	@GetMapping("/payment")
	public String payment(Model model, HttpSession session, ObjectConverter<OrderedProduct> converter) {
		Member user = (Member) session.getAttribute("user");
		
		if(user != null) {
			model.addAttribute("user", user);
		}
		
		Object cart = session.getAttribute("cart");
		List<OrderedProduct> products = converter.list(cart, OrderedProduct.class);
		
		if(products != null) {
			List<Product> productList = ps.list(products);
			model.addAttribute("list", productList);
		}
		else {
//			장바구니에 상품이 없으면 결제페이지에 오늘 걸 막는다
//			intercepter에 이 기능을 추가할 가능성 있음
			System.out.println("주문한 상품이 없습니다.");
			return "redirect:cart";
		}
		
		return PATH+"payment";
	}
	
/**
 * 입력한 주문 정보를 저장하고 결제 확인 페이지로 이동시키는 메서드,
 * 장바구니에서 상품들을 꺼내와 주문에 넣어준다.
 * 장바구니에 상품을 넣은 상태로 와야 제대로 작동한다.
 * @param item : 회원이 입력한 주문 정보, 아이디, 주소, 이름, 전화번호가 입력 되있어야 된다
 * @param session : 장바구니에 있는 상품을 꺼낼 때 사용
 * @param converter : object 변수를 list로 변환해줌
 * @return 결제 확인 페이지의 경로
 */
	@PostMapping("/payment")
	public String payment(Orders item, HttpSession session, ObjectConverter<OrderedProduct> converter) {
		Object cart = session.getAttribute("cart");
		
		List<OrderedProduct> products = converter.list(cart, OrderedProduct.class);
		item.setProducts(products);
		
		if(products != null) {
			int total = ps.priceTotal(products);
			item.setTotal(total);
		}
		else {
//			장바구니에 상품이 없으면 결제페이지에 오늘 걸 막는다
//			intercepter에 이 기능을 추가할 가능성 있음
			System.out.println("주문한 상품이 없습니다.");
			return "redirect:cart";
		}
		
		item.setSubscribe('n');
		
		service.add(item);
		session.removeAttribute("cart");
		return "redirect:confirm";
	}
	
/**
 * 회원이 주문하고 싶은 상품을 저장한 장바구니의 내용물을 확인하는 페이지로 이동시키는 메서드
 * @param model : 상품을 전달하는데 사용하는 Model
 * @param session : 저장한 장바구니를 얻을 때 사용하는 Session
 * @param converter : object 변수를 list로 변환해줌
 * @return 장바구니 페이지의 경로를 반환
 */
	@GetMapping("/cart")
	public String cart(Model model, HttpSession session, ObjectConverter<OrderedProduct> converter) {
		Object cart = session.getAttribute("cart");
		
		List<OrderedProduct> products = converter.list(cart, OrderedProduct.class);
		
		if(products != null) {
			List<Product> productList = ps.list(products);
			model.addAttribute("list", productList);	
		}
		
		return PATH+"cart";
	}
	
/**
 * 결제가 완료됐다고 알려주는 페이지
 * @return 확인 페이지의 경로 반환
 */
	@GetMapping("/confirm")
	public String confirm() {
		return PATH+"confirm";
	}
}
