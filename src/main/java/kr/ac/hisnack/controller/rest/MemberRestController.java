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

@RestController
@RequestMapping("/rest/member")
public class MemberRestController {
	@Autowired
	MemberService service;
	
	@GetMapping
	public List<Member> list(Pager pager){
		List<Member> list = service.list(pager);
		return list;
	}
	
	@GetMapping("/{id}")
	public Member item(@PathVariable String id) {
		return service.item(id);
	}
	
	@PostMapping
	public Member add(Member item) {
		service.add(item);
		return item;
	}
	
	@PostMapping("/{id}")
	public Member update(@PathVariable String id, Member item) {
		item.setId(id);
		service.update(item);
		return item;
	}
	
	@DeleteMapping("/{id}")
	public String delete(@PathVariable String id) {
		service.delete(id);
		return id;
	}
	
	@GetMapping("/confirm")
	public String confirm(String id) {
		Pager pager = new Pager();
		pager.setKeyword(id);
		pager.setSearch(1);
		int total = service.total(pager);
		if(total == 0) {
			return "ok";	
		}
		else {
			return "no";
		}
	}
}
