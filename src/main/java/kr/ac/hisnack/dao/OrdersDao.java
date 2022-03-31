package kr.ac.hisnack.dao;

import java.util.List;

import kr.ac.hisnack.model.Orders;
import kr.ac.hisnack.util.Pager;

public interface OrdersDao {

	void add(Orders item);

	void delete(int code);

	void update(Orders item);

	Orders item(int code);

	List<Orders> list(Pager pager);

	int total(Pager pager);
/**
 * 회원의 구독 정보 중 가장 최신 정보를 가져옴
 * @param id : 회원의 아이디
 * @return 회원의 구독 정보들 중 가장 최신만 반환
 */
	Orders latestSubscribe(String id);

}
