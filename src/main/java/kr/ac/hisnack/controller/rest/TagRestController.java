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

@RestController
@RequestMapping("/rest/tag")
public class TagRestController {
	@Autowired
	TagService service;
	
	@GetMapping
	public List<Tag> list(){
		List<Tag> list = service.list();
		return list;
	}
	
	@GetMapping("/{code}")
	public Tag item(@PathVariable int code) {
		Tag item = service.item(code);
		return item;
	}
	
	@PostMapping
	public Tag add(Tag item) {
		service.add(item);
		return item;
	}
	
	@PostMapping("/{code}")
	public Tag update(@PathVariable int code, Tag item) {
		item.setCode(code);
		service.update(item);
		return item;
	}
	
	@DeleteMapping("/{code}")
	public int delete(@PathVariable int code) {
		service.delete(code);
		return code;
	}
}
