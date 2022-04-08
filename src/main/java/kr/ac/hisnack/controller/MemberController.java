package kr.ac.hisnack.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ac.hisnack.model.Member;

/**
 * 마이 페이지 컨틀로러 
 * @author 오종택
 *
 */
@Controller
@RequestMapping("/member")
public class MemberController {
/**
 * 회원의 마이페이지로 이동시키는 메소드
 * @param id : 회원의 id
 */
	@GetMapping
	public String mypage(HttpSession session, Model model) {
		Member user = (Member) session.getAttribute("user");
		
		model.addAttribute("item", user);
		
		return "member";
	}
}
