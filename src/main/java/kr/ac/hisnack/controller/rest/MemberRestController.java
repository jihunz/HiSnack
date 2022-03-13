package kr.ac.hisnack.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	
	@GetMapping("/item")
	public Member item(Member item) {
		return service.item(item);
	}
	
	@PostMapping
	public Member add(Member item) {
		service.add(item);
		return item;
	}
	
	@PutMapping
	public Member update(Member item) {
		service.update(item);
		return item;
	}
	
	@DeleteMapping
	public Member delete(Member item) {
		service.delete(item.getId());
		return item;
	}
}
