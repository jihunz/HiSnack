package kr.ac.hisnack.util.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.FlashMap;
import org.springframework.web.servlet.FlashMapManager;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.servlet.support.RequestContextUtils;

public class SubscribeInterceptor extends HandlerInterceptorAdapter {
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
//		sub 가 없으면 detail로 이동시킨다
//		sub는 정상적으로 /sub/detail를 post로 접근하면 생긴다
		if(request.getSession().getAttribute("sub") == null) {
			response.sendRedirect("/sub/detail");
//			메시지를 저장
			FlashMap flashMap = new FlashMap();
			flashMap.put("err_msg", "에러가 발생했습니다. 다시 입력해주세요.");
			FlashMapManager manager = RequestContextUtils.getFlashMapManager(request);
			manager.saveOutputFlashMap(flashMap, request, response);
			return false;
		}
		
		return super.preHandle(request, response, handler);
	}
}
