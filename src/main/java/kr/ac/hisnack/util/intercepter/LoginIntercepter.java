package kr.ac.hisnack.util.intercepter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.util.WebUtils;

import kr.ac.hisnack.model.Member;
import kr.ac.hisnack.service.MemberService;

public class LoginIntercepter extends HandlerInterceptorAdapter {
	@Autowired
	MemberService ms;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
//		쿠키를 꺼내온다
		Cookie cookie = WebUtils.getCookie(request, "loginCookie");
//		loginCookie가 있는지 확인한다
		if(cookie != null) {
//		쿠키의 값인 sessionId가 DB에 있는지 확인하고 회원의 정보를 가져온다
			Member user = ms.checkMemberWithSessionId(cookie.getValue());
			if(user != null) {
//				session에 저장해서 로그인 한다
				HttpSession session = request.getSession();
				session.setAttribute("user", user);
//				쿠키의 수명을 늘린다
				cookie.setValue(session.getId());
				cookie.setPath("/");
				cookie.setMaxAge(60 * 60 * 24 * 7);
				response.addCookie(cookie);
//				sessionId 수정
				ms.keepLogin(session.getId(), user.getId());
			}
		}
		
		return true;
	}
}
