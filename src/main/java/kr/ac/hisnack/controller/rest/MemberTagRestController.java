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

@RestController
@RequestMapping("/rest/member/tag")
public class MemberTagRestController {
	@Autowired
	MemberTagService service;
	
//	입력한 회원이 좋아하는 태그를 반환
	@GetMapping("/{id}")
	public List<MemberTag> list(@PathVariable String id){
		return service.list(id);
	}
	
//	입력한 태그들이 회원이 좋아하는 태그가 됨
	@PostMapping("/{id}")
	public List<MemberTag> add(@PathVariable String id, @RequestBody List<MemberTag> list){
		for(MemberTag tag : list) {
			tag.setId(id);
		}
		service.add(list);
		return list;
	}
	
//	지정한 회원이 좋아하는 태그를 삭제
	@DeleteMapping
	public int delete(int code) {
		service.delete(code);
		return code;
	}
	
//	회원이 좋아하는 태그를 전부 삭제
	@DeleteMapping("/{id}")
	public String delete(@PathVariable String id) {
		service.delete(id);
		return id;
	}
}
