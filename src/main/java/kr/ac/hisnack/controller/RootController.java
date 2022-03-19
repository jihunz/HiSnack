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
	
//	메인 페이지로 유도
	@RequestMapping("/")
	public String index() {
		return "index";
	}
	
//	로그인 페이지로 유도
	@GetMapping("/login")
	public String login() {
		return "login";
	}
	
//	로그인 페이지에서 회원의 정보을 받아 DB에 저장되어있는지 확인하고
//	확인이 되어 로그인에 성공면 메인페이지로 유도하고 실패하면 로그인 페이지로 다시 유도
	@PostMapping("/login")
	public String login(Member item, HttpSession session) {
		Member user = ms.login(item);
		
		if(user == null) {
			return "redirect:login";
		}
		
		session.setAttribute("user", user);
		return "redirect:/";
	}
	
//	회원가입 페이지로 유도
	@GetMapping("/signup")
	public String signup() {
		return "signup";
	}
	
//	회원의 정보를 DB에 저장하고 메인페이지로 유도
	@PostMapping("/signup")
	public String signup(Member item) {
		ms.add(item);
		return "redirect:/";
	}
	
//	고객센터 페이지로 유도
	@GetMapping("/cs")
	public String customerService() {
		return "cs";
	}
	
//	관리자 페이지로 유도
	@GetMapping("/admin")
	public String admin() {
		return "admin";
	}
	
}
