package kr.ac.hisnack.util.interceptor;

import java.net.URL;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.FlashMap;
import org.springframework.web.servlet.FlashMapManager;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.servlet.support.RequestContextUtils;

import kr.ac.hisnack.model.Member;

// 특정 페이지를 로그인한 회원만 접근하도록 하는 인터셉터
public class UserInterceptor extends HandlerInterceptorAdapter {
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
//		로그인해야만 들어갈 수 있는 경우
//		구독 페이지
//		장바구니 페이지
//		주문 페이지
//		리뷰 작성
		
		HttpSession session = request.getSession();
		Member user = (Member) session.getAttribute("user");
//		현재 로그인을 상태가 아니면
		if(user == null) {
//			로그인 페이지로 이동한다
			response.sendRedirect("/login");
//			로그인이 필요한 페이지라고 메시지를 보낸다
			FlashMap flashMap = new FlashMap();
			flashMap.put("err_msg", "로그인이 필요합니다");
			FlashMapManager manager = RequestContextUtils.getFlashMapManager(request);
			manager.saveOutputFlashMap(flashMap, request, response);
			
//			원래 가려고 했던 곳을 저장한다
			URL url = new URL(request.getRequestURL().toString()+"?"+request.getQueryString());
			
			String query = "?"+url.getQuery();
			String target = url.getPath() + (query != null ? query : "");
			
			session.setAttribute("dest_path", target);
			
			return false;
		}
		
		return true;
	}
}
