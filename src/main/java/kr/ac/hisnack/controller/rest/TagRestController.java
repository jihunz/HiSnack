package kr.ac.hisnack.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@GetMapping("/item")
	public Tag item(int code) {
		Tag item = service.item(code);
		return item;
	}
	
	@PostMapping
	public Tag add(@RequestBody Tag item) {
		service.add(item);
		return item;
	}
	
	@PutMapping
	public Tag update(@RequestBody Tag item) {
		service.update(item);
		return item;
	}
	
	@DeleteMapping
	public int delete(int code) {
		service.delete(code);
		return code;
	}
}
