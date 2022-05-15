package kr.ac.hisnack.scheduler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import kr.ac.hisnack.model.Member;
import kr.ac.hisnack.model.Orders;
import kr.ac.hisnack.service.MemberService;
import kr.ac.hisnack.service.OrdersService;
import kr.ac.hisnack.service.ProductService;
import kr.ac.hisnack.util.Pager;

@Component
public class SubscribeScheduler {
	@Autowired
	MemberService ms;
	@Autowired
	OrdersService os;
	@Autowired
	ProductService ps;
	
//	초 분 시 일 월 요일
//	현재 매월 1일 오전 6시 마다 실행 
	@Scheduled(cron = "0 0 6 1 * *")
	public void subscribeUpdate() {
//		회원들을 전부 가져온다
		Pager pager = new Pager();
		pager.setTotal(ms.total(pager));
		pager.setPerPage((int)pager.getTotal());
		List<Member> members = ms.list(pager);
//		회원들의 가장 마지막에 한 구독을 가져온다
		for(Member member : members) {
			Orders item = os.latestSubscribe(member.getId());
//			만약 회원이 구독 중이라면 다시 구독을 신청한다
			if(item != null && item.getSubscribe() == 'y') {
				os.subscribe(item, member, "HiSnack!의 구독을 연장했습니다!", "안녕하세요. HiSnack!입니다",
																		"구독이 연장되었습니다");
			}
		}
	}
}
