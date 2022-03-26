package kr.ac.hisnack.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

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
	@GetMapping("/{id}")
	public String mypage(@PathVariable String id) {
		return "member";
	}
}
