package kr.ac.hisnack.controller.rest;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.ac.hisnack.model.EmailContent;
import kr.ac.hisnack.service.MemberService;
import kr.ac.hisnack.util.EmailSender;

@RestController
@RequestMapping("/rest/email")
public class EmailController {
	@Autowired
	EmailSender sender;
	@Autowired
	MemberService ms;
	
//	받는 사람 id
	@PostMapping
	public Map<String, Object> send(@RequestBody EmailContent email){
		sender.sendSimpleEmail(email.getEmail(), email.getSubject(), email.getContent());
		
		Map<String, Object> map = new HashMap<>();
		
		map.put("msg", "email send : ok");
		map.put("email", email);
		
		return map;
	}
}
