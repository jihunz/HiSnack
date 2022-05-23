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
import org.springframework.web.bind.annotation.RestController;

import kr.ac.hisnack.model.Member;
import kr.ac.hisnack.model.MemberTag;
import kr.ac.hisnack.service.MemberTagService;

/**
 * 회원이 선택한 태그를 CRUD 할 수 있는 RestController
 * @author 오종택
 *
 */
@RestController
@RequestMapping("/rest/member/tag")
public class MemberTagRestController {
	@Autowired
	MemberTagService service;
	
/**
 * 입력한 회원이 선택한 태그를 반환하는 메서드
 * @param item : 회원의 id가 입력되어 있어야 한다
 * @return 회원이 선택한 태그들 반환
 */
	@GetMapping
	public Map<String, Object> list(Member item){
		String id = item.getId();
		List<MemberTag> list = service.list(id);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		
		if(list == null)
			map.put("msg", String.format("member %s tag list : list is null", id));
		else 
			map.put("msg", String.format("member %s tag list : ok", id));
		
		return map; 
	}
	
/**
 * id의 회원이 선택한 태그들을 DB에 저장하는 메서드
 * @param item : 회원이 선택한 태그, id, tcode, recom이 입력되어 있어야 한다
 * @return 입력한 태그 리스트를 반환
 */
	@PostMapping
	public Map<String, Object> add(MemberTag item){
		String id = item.getId();
		
		service.add(item);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("item", item);
		map.put("msg", String.format("member %s tag add : ok", id));
		
		return map;
	}
	
/**
 * 상품으로 태그를 저장한다 
 * @param code : 상품의 기본키
 * @param item : id와 recom이 입력되어 있어야 한다
 * @return 메세지와 입력한 상품의 기본키 반환한다
 */
	@PostMapping("/{code}")
	public Map<String, Object> add(@PathVariable int code, MemberTag item){
		service.add(item.getId(), code, item.getRecom());
		
		Map<String, Object> map = new HashMap<>();
		
		map.put("code", code);
		map.put("msg", String.format("product %s tag add : ok", code));
		
		return map;
	}
	
/**
 * 입력한 회원이 선택한 태그를 삭제
 * @param code : 회원이 선택한 태그의 기본키, MemberTag의 기본키
 * @return code를 다시 반환
 */
	@DeleteMapping("/{code}")
	public Map<String, Object> delete(@PathVariable int code) {
		service.delete(code);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("code", code);
		map.put("msg", String.format("member tag %d delete : ok", code));
		
		return map;
	}
	
/**
 * 회원이 선택한 태그 다 삭제하는 메서드
 * @param item : 회원, id가 입력되어 있어야 한다
 * @return id를 다시 반환
 */
	@DeleteMapping
	public Map<String, Object> delete(Member item) {
		String id = item.getId();
		service.delete(id);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", id);
		map.put("msg", String.format("member %s tags delete : ok", id));
		
		return map;
	}
}
