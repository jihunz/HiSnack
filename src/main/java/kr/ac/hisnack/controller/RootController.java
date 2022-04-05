package kr.ac.hisnack.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.mail.EmailException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.util.WebUtils;

import com.fasterxml.jackson.core.JsonProcessingException;

import kr.ac.hisnack.model.Member;
import kr.ac.hisnack.model.Review;
import kr.ac.hisnack.service.MemberService;
import kr.ac.hisnack.service.ReviewService;
import kr.ac.hisnack.util.EmailSender;
import kr.ac.hisnack.util.Pager;
import kr.ac.hisnack.util.SiteLoginer;

/**
 * 로그인, 회원가입, 고객센터, 관리자 페이지로 이동시키는 일을 하는 Controller 
 * @author 오종택
 */
@Controller
public class RootController {
	@Autowired
	MemberService ms;
	@Autowired
	ReviewService rs;
	@Autowired
	EmailSender mailSender;
	
/**
 * 메인 페이지
 * @param model
 * @return
 */
	@RequestMapping("/")
	public String index(Model model) {
		Pager pager = new Pager();
		pager.setPerPage(8);
		List<Review> list = rs.list(pager);
		model.addAttribute("list", list);
		return "index";
	}
	
/**
 * 로그인 페이지로 유도
 */
	@GetMapping("/login")
	public String login() {
		return "login";
	}
/**
 * 로그인 페이지에서 회원의 정보을 받아 DB에 저장되어있는지 확인하고,
 * 확인이 되어 로그인에 성공면 메인페이지로 유도하고 실패하면 로그인 페이지로 다시 유도
 * @param item : 검증하고 싶은 회원 정보, id, password가 입력되 있어야 됨
 * @param session : 회원 정보를 저장하는 세션
 * @return 실패시 login 페이지로 redirect, 성공시 index로 redirect
 */
	@PostMapping("/login")
	public String login(Member item, HttpSession session, HttpServletResponse response) {
		Member user = ms.login(item);
		
		if(user == null) {
			return "redirect:login";
		}
		
		session.setAttribute("user", user);
		
//		세션의 아이디를 DB에 저장
		String sessionId = session.getId();
		ms.keepLogin(sessionId, user.getId());
		
//		세션의 아이디를 쿠키에 넣고 클라이언트에게 보내기
		Cookie cookie = new Cookie("loginCookie", sessionId);
		cookie.setPath("/");
//		7주일 유지
		cookie.setMaxAge(60 * 60 * 24 * 7);
		response.addCookie(cookie);
		
		
		return "redirect:/";
	}
	
/**
 * 회원가입 페이지로 유도
 */
	@GetMapping("/signup")
	public String signup() {
		return "signup";
	}
	
/**
 * 회원가입 페이지, 
 * 회원의 정보를 DB에 저장하고 로그인페이지로 유도
 * @param item : id, password, address, name, tel이 입력되 있어야 된다
 * @return login 페이지로 redirect
 */
	@PostMapping("/signup")
	public String signup(Member item) {
		ms.add(item);
		try {
			String subject = "HiSnack! 가입을 환영합니다";
			String content = "HiSnack! 가입을 환영합니다! 알고리즘으로 추천된 여러가지 과자를 만나보세요!";
			mailSender.sendSimpleEmail("hisnack2022@gmail.com", item.getEmail(), subject, content);
		} catch (EmailException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "redirect:login";
	}
	
/**
 * 고객센터 페이지로 유도
 */
	@GetMapping("/cs")
	public String customerService() {
		return "cs";
	}
	
/**
 * 관리자 페이지로 유도
 */
	@GetMapping("/admin")
	public String admin() {
		return "admin";
	}
	
/**
 * 로그아웃
 */
	@GetMapping("/logout")
	public String logout(HttpSession session, HttpServletResponse response, HttpServletRequest request) {
		Cookie cookie = WebUtils.getCookie(request, "loginCookie");
		
		if(cookie != null) {
			cookie.setMaxAge(0);
			response.addCookie(cookie);
			Member user = (Member) session.getAttribute("user");
			ms.keepLogin(null, user.getId());
		}
		
		session.invalidate();
		return "redirect:/";
	}
	
/**
 * 소셜 로그인 로그인하기 위한 주소, 소셜 로그인을 위한 URL ->
 * https://accounts.google.com/o/oauth2/v2/auth?client_id=154631232160-ms9nmt9aggc9dgl6625fb0dij3sdhsb2.apps.googleusercontent.com&redirect_uri=http://localhost:9080/login/google&response_type=code&scope=email%20profile%20openid&access_type=offline
 * 
 * 구글에서 보내주는 구글 회원정보를 DB에 저장하거나 Session 저장한다
 * @param authCode : 구글에서 보내주는 정보
 * @param session : 회원 정보를 저장하는 세션
 * @return index 페이지로 redirect
 * @throws JsonProcessingException : 구글에서 보낸 정보를 추출하다 실패하면 나오는 예외
 */
//	
	@GetMapping("/login/google")
	public String google(@RequestParam(value = "code") String authCode, HttpSession session, HttpServletResponse response) throws JsonProcessingException{
		Map<String, String> map = SiteLoginer.google(authCode);
		
		Member user = new Member();
		user.setId(map.get("email"));
		user.setName(map.get("name"));
		user.setEmail(map.get("email"));
		user.setPassword(map.get("email"));

		if(ms.confirm(user.getId())) {
			ms.add(user);
		}
		
		login(user, session, response);
		
		return "redirect:/";
	}
}
