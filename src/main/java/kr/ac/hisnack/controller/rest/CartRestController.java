package kr.ac.hisnack.controller.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.ac.hisnack.model.OrderedProduct;
import kr.ac.hisnack.service.ProductService;
import kr.ac.hisnack.util.ObjectConverter;

/**
 * 장바구니에 관련된 일을 AJAX로하는 RestController
 * @author 오종택
 *
 */
@RestController
@RequestMapping("/rest/cart")
public class CartRestController {
	@Autowired
	ObjectConverter<OrderedProduct> converter;
	@Autowired
	ProductService ps;
	@Autowired
	ObjectMapper objectMapper;
	
	/**
	 * 장바구니에 추가하고 싶은 상품의 기본키(pcode)와 수량(amount)를 입력하면 장바구니에 추가한다
	 * @param item : 장바구니에 추가하고 싶은 상품, pcode와 amount가 입력 되있어야 한다
	 * @param session : 장바구니를 저장하는 Session
	 * @param converter : Object 변수를 List로 변환하는 클래스
	 * @return 입력했던 상품을 반환한다
	 */
	@PostMapping
	public Map<String, Object> add(OrderedProduct item, HttpSession session) {
		Object cart = session.getAttribute("cart");
		
		List<OrderedProduct> list = converter.list(cart, OrderedProduct.class);
		
		if(list == null) {
			list = new ArrayList<OrderedProduct>();
		}
		
		boolean isExist = false;
		
//		중복되는 상품이 있는지 찾는다
		for(OrderedProduct p : list) {
			if(p.getPcode() == item.getPcode()) {
//				중복되는 상품이 있으면 수량만 더한다
				isExist = true;
				p.setAmount(p.getAmount() + item.getAmount());
				break;
			}
		}
		
//		중복되는 상품이 없으면 cart에 추가한다
		if(!isExist)
			list.add(item);
		
		session.setAttribute("cart", list);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("item", item);
		map.put("msg", String.format("cart add : product %d ok", item.getPcode()));
		
		return map;
	}
	
	/**
	 * 현재 장바구니에 있는 상품을 반환하는 메서드
	 * @param session : 장바구니를 꺼내는데 사용
	 * @param converter : Object 변수를 List로 변환하는 클래스
	 * @return Session에 저장되있는 상품을 반환
	 */
	@GetMapping
	public Map<String, Object> list(HttpSession session){		
		Object cart = session.getAttribute("cart");
		List<OrderedProduct> list = converter.list(cart, OrderedProduct.class);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		if(list != null)
			map.put("msg", String.format("cart list : ok"));
		else
			map.put("msg", String.format("cart list : cart is null"));
		return map;
	}
	
	/**
	 * 장바구니에 있는 상품중 기본키를 보내면 수량을 수정하고
	 * 총 가격을 반환한다
	 * @param CartItem : 변경하는 제품
	 */
	@PostMapping("/{pcode}")
	public Map<String, Object> update(@PathVariable int pcode, String type, HttpSession session){
		Object cart = session.getAttribute("cart");
		List<OrderedProduct> list = converter.list(cart, OrderedProduct.class);
		String msg = String.format("cart update %d : ok", pcode);
		int total = 0;
		int count = 0;
		OrderedProduct item = null;
		
//		카트 안에서 찾는다
		for(OrderedProduct op : list) {
			if(op.getPcode() == pcode) {
				item = op;
				switch (type) {
				case "increase":
//					수량 증가
					op.setAmount(op.getAmount()+1);
					break;
				case "decrease":
//					수량 감소
					op.setAmount(op.getAmount()-1 <= 1 ? 1 : op.getAmount()-1);
					break;
				default:
//					경고 알림
					msg = String.format("cart update %d : type error %s 타입은 없습니다.", pcode, type);
					break;
				}
			}
			
			if(op.isChecked())
				count += op.getAmount();
		}
		
		session.setAttribute("cart", list);
		
		total = ps.priceTotal(list);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", total);
		map.put("msg", msg);
		map.put("amount", item.getAmount());
		map.put("count", count);
		return map;
	}
	
	@DeleteMapping("/{pcode}")
	public Map<String, Object> delete(@PathVariable int pcode, HttpSession session){
		Object cart = session.getAttribute("cart");
		List<OrderedProduct> list = converter.list(cart, OrderedProduct.class);
		String msg = String.format("cart delete %d : ok", pcode);
		int total = 0;
		int idx = -1;
		int count = 0;
		
//		카트 안에서 찾는다
		for(int i = 0; i < list.size(); i++) {
			if(list.get(i).getPcode() == pcode) {
				idx = i;
			}
			
			if(list.get(i).isChecked())
				count += list.get(i).getAmount();
		}
//		찾을 걸 지운다
		if(idx != -1 && list.get(idx).isChecked()) {
			count -= list.get(idx).getAmount();
			list.remove(idx);
		}
		else {
//			실패하면 메세지를 남긴다
			msg = String.format("cart delete %d :  삭제 실패", pcode);
		}
//		다시 카트를 넣는다
		session.setAttribute("cart", list);
//		가격을 구한다
		total = ps.priceTotal(list);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", total);
		map.put("msg", msg);
		map.put("count", count);
		return map;
	}
	
//	카트 안에 있는 상품들 중 구매 여부를 수정한다
	@PostMapping("/check/{pcode}")
	public Map<String, Object> checked(@PathVariable int pcode, HttpSession session){
		Object cart = session.getAttribute("cart");
		List<OrderedProduct> list = converter.list(cart, OrderedProduct.class);
		String msg = String.format("cart checked %d : error 찾는 상품이 없습니다.", pcode);
		int total = 0;
		int count = 0;
		
		for(OrderedProduct op : list) {
			if(op.getPcode() == pcode) {
				op.setChecked(!op.isChecked());
				msg = String.format("cart checked %d : ok", pcode);
			}
			
			if(op.isChecked())
				count += op.getAmount();
		}
		
		total = ps.priceTotal(list);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("msg", msg);
		map.put("item", pcode);
		map.put("total", total);
		map.put("count", count);
		return map;
	}
	
//	카트 안에 있는 상품들 중 구매 여부를 전부 수정한다
	@PostMapping("/check")
	public Map<String, Object> checked(HttpSession session, boolean check){
		Object cart = session.getAttribute("cart");
		List<OrderedProduct> list = converter.list(cart, OrderedProduct.class);
		String msg = String.format("cart checked all : ok");
		int total = 0;
		int count = 0;
		
		for(OrderedProduct op : list) {
			op.setChecked(check);
			
			if(op.isChecked())
				count += op.getAmount();
		}
		
		total = ps.priceTotal(list);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("msg", msg);
		map.put("total", total);
		map.put("count", count);
		return map;
	}
}
