package kr.ac.hisnack.util.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

// 구독을 진행 중 다른 페이지로 이동하면 구독 sub를 삭제함
public class SubInitInterceptor extends HandlerInterceptorAdapter {
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		request.getSession().removeAttribute("sub");
		
		return true;
	}
}
