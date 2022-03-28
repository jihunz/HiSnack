package kr.ac.hisnack.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.ac.hisnack.model.Member;
import kr.ac.hisnack.service.MemberService;
import kr.ac.hisnack.util.Pager;

/**
 * 회원의 CRUD를 AJAX로 할 수 있는 RestController
 * @author 오종택
 *
 */
@RestController
@RequestMapping("/rest/member")
public class MemberRestController {
	@Autowired
	MemberService service;
	
/**
 * 회원 리스트를 반환하는 메서드
 * @param pager
 * @return
 */
	@GetMapping
	public List<Member> list(Pager pager){
		List<Member> list = service.list(pager);
		return list;
	}
	
/**
 * 회원 1명의 정보를 반환하는 메서드
 * @param id
 * @return
 */
	@GetMapping("/{id}")
	public Member item(@PathVariable String id) {
		return service.item(id);
	}
	
/**
 * 회원의 정보를 DB에 추가하는 메서드
 * @param item : id, password, address, name, tel, grade가 입력된 회원 정보
 * @return 입력한 회원정보를 반환
 */
	@PostMapping
	public Member add(Member item) {
		service.add(item);
		return item;
	}
	
/**
 * 회원의 정보를 수정하는 메서드
 * @param id : 회원의 기본키가 되는 id
 * @param item : address, name, tel, grade의 정보가 들어있어야 된다
 * @return 입력한 정보를 다시 반환
 */
	@PostMapping("/{id}")
	public Member update(@PathVariable String id, Member item) {
		item.setId(id);
		service.update(item);
		return item;
	}
	
/**
 * 입력한 id로 회원을 삭제
 * @param id : 회원의 id
 * @return id를 다시 반환
 */
	@DeleteMapping("/{id}")
	public String delete(@PathVariable String id) {
		service.delete(id);
		return id;
	}
	
/**
 * 입력한 id가 DB에 있는지 확인하는 메서드
 * @param id : 확인하고 싶은 문자열
 * @return 입력한 id가 사용할 수 있으면 ok, 이미 있으면 no가 반환
 */
	@GetMapping("/confirm")
	public String confirm(String id) {
		if(service.confirm(id)) {
			return "ok";	
		}
		else {
			return "no";
		}
	}
}
