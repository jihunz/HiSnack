package kr.ac.hisnack.util.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.FlashMap;
import org.springframework.web.servlet.FlashMapManager;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.servlet.support.RequestContextUtils;

import kr.ac.hisnack.model.Member;

// 로그인하면 접근을 제한하는 인터셉터
public class LoginBlockInterceptor extends HandlerInterceptorAdapter {
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		Member user = (Member)request.getSession().getAttribute("user");
		
//		로그인을 하면 제한
		if(user != null) {
//			메인 페이지로 이동한다
			response.sendRedirect("/");
//			메시지를 저장
			FlashMap flashMap = new FlashMap();
			flashMap.put("err_msg", "로그아웃을 해주세요");
			FlashMapManager manager = RequestContextUtils.getFlashMapManager(request);
			manager.saveOutputFlashMap(flashMap, request, response);
			return false;
		}
		
//		로그인을 안하면 통과
		return true;
	}
}
