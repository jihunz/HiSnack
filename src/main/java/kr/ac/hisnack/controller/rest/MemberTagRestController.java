package kr.ac.hisnack.controller.rest;

import java.util.List;

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
	public List<MemberTag> list(@PathVariable String id){
		return service.list(id);
	}
	
/**
 * id의 회원이 선택한 태그들을 DB에 저장하는 메서드
 * @param id : 회원의 id
 * @param list : 회원이 선택한 태그, tcode, recom이 입력되어 있어야 한다
 * @return 입력한 태그 리스트를 반환
 */
	@PostMapping("/{id}")
	public List<MemberTag> add(@PathVariable String id, @RequestBody List<MemberTag> list){
		for(MemberTag tag : list) {
			tag.setId(id);
		}
		service.add(list);
		return list;
	}
	
/**
 * 입력한 회원이 선택한 태그를 삭제
 * @param code : 회원이 선택한 태그의 기본키
 * @return code를 다시 반환
 */
	@DeleteMapping
	public int delete(int code) {
		service.delete(code);
		return code;
	}
	
/**
 * 회원이 선택한 태그 다 삭제하는 메서드
 * @param id : 삭제하고 싶은 태그를 가진 회원의 id
 * @return id를 다시 반환
 */
	@DeleteMapping("/{id}")
	public String delete(@PathVariable String id) {
		service.delete(id);
		return id;
	}
}
