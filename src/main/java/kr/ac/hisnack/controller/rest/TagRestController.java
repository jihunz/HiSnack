package kr.ac.hisnack.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.ac.hisnack.model.Tag;
import kr.ac.hisnack.service.TagService;

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
	public List<Tag> list(){
		List<Tag> list = service.list();
		return list;
	}
	
/**
 * 태그를 얻는 메서드
 * @param code : 태그의 기본키
 * @return 태그 정보를 반환
 */
	@GetMapping("/{code}")
	public Tag item(@PathVariable int code) {
		Tag item = service.item(code);
		return item;
	}
	
/**
 * 태그를 등록하는 메서드
 * @param item : 태그 정보, content가 입력되 있어야 된다
 * @return 입력한 태그가 반환
 */
	@PostMapping
	public Tag add(Tag item) {
		service.add(item);
		return item;
	}
	
/**
 * 태그를 수정하는 메서드
 * @param code : 수정하는 태그 기본키
 * @param item : 태그의 정보
 * @return 입력한 태그가 반환
 */
	@PostMapping("/{code}")
	public Tag update(@PathVariable int code, Tag item) {
		item.setCode(code);
		service.update(item);
		return item;
	}
	
/**
 * 태그를 삭제하는 메서드
 * @param code : 삭제하고 싶은 태그의 기본키
 * @return 입력한 기본키를 다시 반환
 */
	@DeleteMapping("/{code}")
	public int delete(@PathVariable int code) {
		service.delete(code);
		return code;
	}
}
