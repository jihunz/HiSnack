package kr.ac.hisnack.controller.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.ac.hisnack.model.OrderedProduct;
import kr.ac.hisnack.model.Orders;
import kr.ac.hisnack.model.Tag;
import kr.ac.hisnack.service.MemberTagService;
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
	@Autowired
	MemberTagService mts;
	
/**
 * 구독 리스트를 얻는 메서드
 * @param pager : perPage로 몇개 가져오는지 정하고, page로 몇 페이지째 인지를 정한다
 * @return 구독 리스트
 */
	@GetMapping
	public Map<String, Object> list(Pager pager){
		pager.setKeyword2("y");
		
		List<Orders> list = service.list(pager);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("list", list);
		map.put("pager", pager);
		
		if(list == null)
			map.put("msg", String.format("subscribe list : list is null"));
		else
			map.put("msg", String.format("subscribe list : ok"));
		
		return map;
	}
	
/**
 * 특정 구독을 가져오는 메서드
 * @param code : 구독의 기본키
 * @return 키본키에 해당하는 주문
 */
	@GetMapping("/{code}")
	public Map<String, Object> item(@PathVariable int code) {
		Orders item = service.item(code);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("item", item);
		
		if(item == null)
			map.put("msg", String.format("subscribe %d item : item is null", code));
		else {
			map.put("msg", String.format("subscribe %d item : ok", code));
		}
		
		return map;
	}

/**
 * 구독을 DB에 저장하는 메서드
 * @param item : 아이디, 주소, 이름, 전화번호를 입력된 구독 정보
 * @param tcodes : tcode가 여러개 있으면 된다, 태그의 기본키
 * @return 입력한 구독 정보를 다시 반환한다
 */
	@PostMapping
	public Map<String, Object> add(Orders item, @RequestParam("tcode") List<Integer> tcodes) {
		try {
			item.setSubscribe('y');
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		List<Tag> tags = tcodes.stream().map(t -> {
			Tag tag = new Tag();
			tag.setCode(t);
			return tag;
		}).collect(Collectors.toList());
		 
		item.setTags(tags);
		
		List<OrderedProduct> list = pService.recommend(item.getId(), 30, item.getTotal(), (int)(item.getTotal() * 0.2));
		item.setProducts(list);
		
		service.add(item);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("item", item);
		map.put("msg", String.format("subscribe add : ok"));
		
		return map;
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
	public Map<String, Object> update(@PathVariable int code, Orders item) {
		item.setCode(code);
		item.setSubscribe('y');
		
		service.update(item);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("item", item);
		map.put("msg", String.format("subscribe %d update : ok", code));
		
		return map;
	}
	
/**
 * 구독을 삭제하는 메서드
 * @param code : 삭제하려고 하는 구독의 기본키
 * @return 입력한 기본키를 반환
 */
	@DeleteMapping("/{code}")
	public Map<String, Object> delete(@PathVariable int code) {
		service.delete(code);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("code", code);
		map.put("msg", String.format("subscribe %d delete : ok", code));
		
		return map;
	}
	
	@GetMapping("/detail")
	public Map<String, Object> detail(String id){
		Orders item = service.latestSubscribe(id);
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("item", item);
		map.put("msg", String.format("%s's latest subscribe : ok", id));
		
		return map;
	}
}
