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

import kr.ac.hisnack.model.Tag;
import kr.ac.hisnack.service.TagService;
import kr.ac.hisnack.util.Pager;

/**
 * 태그를 CRUD하는 RestController
 * @author 오종택
 *
 */
@RestController
@RequestMapping("/rest/tag")
public class TagRestController {
	@Autowired
	TagService service;
	
/**
 * 태그 리스트를 얻는 메서드
 * @return 태그 리스트를 반환
 */
	@GetMapping
	public Map<String, Object> list(Pager pager){
		List<Tag> list = service.list(pager);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("pager", pager);
		
		if(list == null)
			map.put("msg", "tag list : list is null");
		else
			map.put("msg", "tag list : ok");
		
		return map;
	}
	
/**
 * 태그를 얻는 메서드
 * @param code : 태그의 기본키
 * @return 태그 정보를 반환
 */
	@GetMapping("/{code}")
	public Map<String, Object> item(@PathVariable int code) {
		Tag item = service.item(code);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("item", item);
		
		if(item == null)
			map.put("msg", String.format("tag %d item : item is null", code));
		else
			map.put("msg", String.format("tag %d item : ok", code));
		
		return map;
	}
	
/**
 * 태그를 등록하는 메서드
 * @param item : 태그 정보, content가 입력되 있어야 된다
 * @return 입력한 태그가 반환
 */
	@PostMapping
	public Map<String, Object> add(Tag item) {
		service.add(item);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("item", item);
		map.put("msg", String.format("tag add : ok"));
		
		return map;
	}
	
/**
 * 태그를 수정하는 메서드
 * @param code : 수정하는 태그 기본키
 * @param item : 태그의 정보
 * @return 입력한 태그가 반환
 */
	@PostMapping("/{code}")
	public Map<String, Object> update(@PathVariable int code, Tag item) {
		item.setCode(code);
		service.update(item);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("item", item);
		map.put("msg", String.format("tag %d update : ok", code));
		
		return map;
	}
	
/**
 * 태그를 삭제하는 메서드
 * @param code : 삭제하고 싶은 태그의 기본키
 * @return 입력한 기본키를 다시 반환
 */
	@DeleteMapping("/{code}")
	public Map<String, Object> delete(@PathVariable int code) {
		service.delete(code);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("code", code);
		map.put("msg", String.format("tag %d delete : ok", code));
		
		return map;
	}
}
