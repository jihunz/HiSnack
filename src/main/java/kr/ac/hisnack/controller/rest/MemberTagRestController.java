package kr.ac.hisnack.controller.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
 * @param id : 회원의 id
 * @return 회원이 선택한 태그들 반환
 */
	@GetMapping("/{id}")
	public Map<String, Object> list(@PathVariable String id){
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
 * @param id : 회원의 id
 * @param list : 회원이 선택한 태그, tcode, recom이 입력되어 있어야 한다
 * @return 입력한 태그 리스트를 반환
 */
	@PostMapping("/{id}")
	public Map<String, Object> add(@PathVariable String id, @RequestBody List<MemberTag> list){
		for(MemberTag tag : list) {
			tag.setId(id);
		}
		service.add(list);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("msg", String.format("member %s tag add : ok", id));
		
		return map;
	}
	
/**
 * 상품으로 태그를 저장한다 
 * @param code : 상품의 기본키
 * @param recom : 호불호 y 또는 n이 들어간다
 * @return 메세지와 입력한 상품의 기본키 반환한다
 */
	@PostMapping("/{id}/{code}")
	public Map<String, Object> add(@PathVariable String id, @PathVariable int code, @RequestBody MemberTag recom){
		service.add(id, code, recom.getRecom());
		
		Map<String, Object> map = new HashMap<>();
		
		map.put("code", code);
		map.put("msg", String.format("product %s tag add : ok", code));
		
		return map;
	}
	
/**
 * 입력한 회원이 선택한 태그를 삭제
 * @param code : 회원이 선택한 태그의 기본키
 * @return code를 다시 반환
 */
	@DeleteMapping
	public Map<String, Object> delete(int code) {
		service.delete(code);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("code", code);
		map.put("msg", String.format("member tag %d delete : ok", code));
		
		return map;
	}
	
/**
 * 회원이 선택한 태그 다 삭제하는 메서드
 * @param id : 삭제하고 싶은 태그를 가진 회원의 id
 * @return id를 다시 반환
 */
	@DeleteMapping("/{id}")
	public Map<String, Object> delete(@PathVariable String id) {
		service.delete(id);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", id);
		map.put("msg", String.format("member %s tags delete : ok", id));
		
		return map;
	}
}
