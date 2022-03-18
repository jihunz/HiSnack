package kr.ac.hisnack.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ac.hisnack.model.Member;
import kr.ac.hisnack.service.MemberService;

@Controller
public class RootController {
	@Autowired
	MemberService ms;
	
	@RequestMapping("/")
	public String index() {
		return "index";
	}
	
	@GetMapping("/login")
	public String login() {
		return "login";
	}
	
	@PostMapping("/login")
	public String login(Member item, HttpSession session) {
		Member user = ms.login(item);
		
		if(user == null) {
			return "redirect:login";
		}
		
		session.setAttribute("user", user);
		return "redirect:/";
	}
	
	@GetMapping("/signup")
	public String signup() {
		return "signup";
	}
	
	@PostMapping("/signup")
	public String signup(Member item) {
		ms.add(item);
		return "redirect:/";
	}
}
