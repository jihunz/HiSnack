package kr.ac.hisnack.controller.rest;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.ac.hisnack.model.OrderedProduct;
import kr.ac.hisnack.util.ObjectConverter;

/**
 * 장바구니에 관련된 일을 하는 RestController
 * @author 오종택
 *
 */
@RestController
@RequestMapping("/rest/cart")
public class CartRestController {
	
	/**
	 * 장바구니에 추가하고 싶은 상품의 기본키(pcode)와 수량(amount)를 입력하면 장바구니에 추가한다
	 * @param item : 장바구니에 추가하고 싶은 상품, pcode와 amount가 입력 되있어야 한다
	 * @param session : 장바구니를 저장하는 Session
	 * @param converter : Object 변수를 List로 변환하는 클래스
	 * @return 입력했던 상품을 반환한다
	 */
	@PostMapping
	public OrderedProduct add(OrderedProduct item, HttpSession session, ObjectConverter<OrderedProduct> converter) {
		Object cart = session.getAttribute("cart");
		
		List<OrderedProduct> list = converter.list(cart, OrderedProduct.class);
		
		if(list == null) {
			list = new ArrayList<OrderedProduct>();
		}
		
		list.add(item);
		
		session.setAttribute("cart", list);
		
		return item;
	}
	
	/**
	 * 현재 장바구니에 있는 상품을 반환하는 메서드
	 * @param session : 장바구니를 꺼내는데 사용
	 * @param converter : Object 변수를 List로 변환하는 클래스
	 * @return Session에 저장되있는 상품을 반환
	 */
	@GetMapping
	public List<OrderedProduct> list(HttpSession session, ObjectConverter<OrderedProduct> converter){		
		Object cart = session.getAttribute("cart");
		List<OrderedProduct> list = converter.list(cart, OrderedProduct.class);
		return list;
	}
}