package kr.ac.hisnack.controller.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import kr.ac.hisnack.service.ProductService;
import kr.ac.hisnack.util.Pager;

/**
 * ajax로 orders 테이블에서 주문을 CRUD를 하기 위한 RestController
 * @author 오종택
 *
 */
@RestController
@RequestMapping("/rest/orders")
public class OrdersRestController {
	@Autowired
	OrdersService service;
	@Autowired
	ProductService pService;
/**
 * 주문 리스트를 얻는 메서드
 * @param pager : perPage로 몇개 가져오는지 정하고, page로 몇 페이지째 인지를 정한다
 * @return 주문 리스트
 */
	@GetMapping
	public Map<String, Object> list(Pager pager){
		pager.setKeyword("n");
		List<Orders> list = service.list(pager);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("pager", pager);
		map.put("msg", String.format("member list : ok"));
		return map;
	}
	
/**
 * 특정 주문을 가져오는 메서드
 * @param code : 주문의 기본키
 * @return 키본키에 해당하는 주문
 */
	@GetMapping("/{code}")
	public Map<String, Object> item(@PathVariable int code) {
		Orders item = service.item(code);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("item", item);
		map.put("msg", String.format("member %d : item ok", code));
		return map;
	}

/**
 * 주문을 DB에 저장하는 메서드
 * @param item : 아이디, 주소, 이름, 전화번호를 입력된 주문 정보
 * @param pcodes : 주문하는 상품의 기본키 리스트
 * @param amounts : 주문한 상품의 수량 리스트 pcodes와 길이가 같아야 한다
 * @return 입력한 주문 정보를 다시 반환한다
 */
	@PostMapping
	public Map<String, Object> add(Orders item, @RequestParam("pcode") List<Integer> pcodes, 
			@RequestParam("amount") List<Integer> amounts) {
		try {
			item.setSubscribe('n');
			item.setProducts(pcodes, amounts);
			item.setTotal(pService.priceTotal(item.getProducts()));
		} catch (Exception e) {
			e.printStackTrace();
		}
		service.add(item);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("item", item);
		map.put("msg", String.format("member add : ok"));
		
		return map;
	}
	
/**
 * 주문 정보를 수정하는 메서드
 * @param code : 수정하려고 하는 주문의 기본키
 * @param item : 수정하려고 하는 주문 정보, 주소, 이름, 전화번호가 입력되어 있어야한다
 * @param pcodes : 다시 입력하려고 하는 상품의 기본키
 * @param amounts : 다시 입력하려고 하는 상품의 수량, pcodes 리스트의 길이가 같아야 한다
 * @return 입력했던 주문 정보를 다시 반환한다
 */
	@PostMapping("/{code}")
	public Map<String, Object> update(@PathVariable int code, Orders item, @RequestParam("pcode") List<Integer> pcodes,
			@RequestParam("amount") List<Integer> amounts) {
		item.setCode(code);
		item.setSubscribe('n');
		
		try {
			item.setProducts(pcodes, amounts);
			item.setTotal(pService.priceTotal(item.getProducts()));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		service.update(item);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("item", item);
		map.put("msg", String.format("member %d update : ok", code));
		
		return map;
	}
	
/**
 * 주문을 삭제하는 메서드
 * @param code : 삭제하려고 하는 주문의 기본키
 * @return 입력한 기본키를 반환
 */
	@DeleteMapping("/{code}")
	public Map<String, Object> delete(@PathVariable int code) {
		service.delete(code);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("code", code);
		map.put("msg", String.format("member %d delete : ok", code));
		
		return map;
	}
}
