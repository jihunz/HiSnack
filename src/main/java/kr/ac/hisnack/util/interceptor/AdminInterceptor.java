package kr.ac.hisnack.util.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.FlashMap;
import org.springframework.web.servlet.FlashMapManager;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.servlet.support.RequestContextUtils;

import kr.ac.hisnack.model.Member;

// 관리자 페이지에 들어가는 회원을 차단하는 인터셉터
public class AdminInterceptor extends HandlerInterceptorAdapter {
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		Member user = (Member)request.getSession().getAttribute("user");
		
//		회원의 관리자 레벨이 1 미만(0) 이면 차단
		if(user.getGrade() < 1) {
//			로그인 페이지로 이동한다
			response.sendRedirect("/");
//			로그인이 필요한 페이지라고 메시지를 보낸다
			FlashMap flashMap = new FlashMap();
			flashMap.put("err_msg", "관리자 계정이 아닙니다");
			FlashMapManager manager = RequestContextUtils.getFlashMapManager(request);
			manager.saveOutputFlashMap(flashMap, request, response);
			
			return false;
		}
		
//		회원의 관리자 레벨이 1 이상이면 통과
		return true;
	}
}
