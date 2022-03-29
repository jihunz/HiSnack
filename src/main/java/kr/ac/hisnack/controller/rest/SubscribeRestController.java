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
import kr.ac.hisnack.service.ProductService;
import kr.ac.hisnack.util.Pager;

/**
 * ajax로 orders 테이블에서 구독을 CRUD를 하기 위한 RestController
 * @author 오종택
 *
 */
@RestController
@RequestMapping("/rest/sub")
public class SubscribeRestController {
	@Autowired
	OrdersService service;
	@Autowired
	ProductService pService;
	
/**
 * 구독 리스트를 얻는 메서드
 * @param pager : perPage로 몇개 가져오는지 정하고, page로 몇 페이지째 인지를 정한다
 * @return 구독 리스트
 */
	@GetMapping
	public List<Orders> list(Pager pager){
		pager.setKeyword("y");
		return service.list(pager);
	}
	
/**
 * 특정 구독을 가져오는 메서드
 * @param code : 구독의 기본키
 * @return 키본키에 해당하는 주문
 */
	@GetMapping("/{code}")
	public Orders item(@PathVariable int code) {
		return service.item(code);
	}

/**
 * 구독을 DB에 저장하는 메서드
 * @param item : 아이디, 주소, 이름, 전화번호를 입력된 구독 정보
 * @param pcodes : 구독하는 상품의 기본키 리스트
 * @param amounts : 구독한 상품의 수량 리스트 pcodes와 길이가 같아야 한다
 * @return 입력한 구독 정보를 다시 반환한다
 */
	@PostMapping
	public Orders add(Orders item, @RequestParam("pcode") List<Integer> pcodes, 
			@RequestParam("amount") List<Integer> amounts) {
		try {
			item.setSubscribe('y');
			item.setProducts(pcodes, amounts);
		} catch (Exception e) {
			e.printStackTrace();
		}
		service.add(item);
		return item;
	}
	
/**
 * 주문 정보를 수정하는 메서드
 * @param code : 수정하려고 하는 구독의 기본키
 * @param item : 수정하려고 하는 구독 정보, 주소, 이름, 전화번호가 입력되어 있어야한다
 * @param pcodes : 다시 입력하려고 하는 상품의 기본키
 * @param amounts : 다시 입력하려고 하는 상품의 수량, pcodes 리스트의 길이가 같아야 한다
 * @return 입력했던 구독 정보를 다시 반환한다
 */
	@PostMapping("/{code}")
	public Orders update(@PathVariable int code, Orders item, @RequestParam("pcode") List<Integer> pcodes,
			@RequestParam("amount") List<Integer> amounts) {
		item.setCode(code);
		item.setSubscribe('y');
		
		try {
			item.setProducts(pcodes, amounts);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		service.update(item);
		return item;
	}
	
/**
 * 구독을 삭제하는 메서드
 * @param code : 삭제하려고 하는 구독의 기본키
 * @return 입력한 기본키를 반환
 */
	@DeleteMapping("/{code}")
	public int delete(@PathVariable int code) {
		service.delete(code);
		return code;
	}
}