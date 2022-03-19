package kr.ac.hisnack.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ac.hisnack.model.Tag;
import kr.ac.hisnack.service.TagService;

// 구독과 연관된 일을 하는 컨트롤러 
@Controller
@RequestMapping("/sub")
public class SubscribeController {
	@Autowired
	TagService ts;
	
//	구독 상세 페이지로 유도
	@GetMapping("/detail")
	public String deltail() {
		return "detail";
	}
	
//	구독 시 선호 태그를 선택하는 페이지로 유도
	@GetMapping("/tag")
	public String tag(Model model) {
		List<Tag> list = ts.list();
		model.addAttribute("list", list);
		return "tag";
	}
	
//	선택한 태그를 세션에 저장하고 결제 페이지로 유도
	@PostMapping("/tag")
	public String tag(List<Tag> list, HttpSession session) {
		session.removeAttribute("tags");
		session.setAttribute("tags", list);
		return "redirect:/orders/payment";
	}
}
