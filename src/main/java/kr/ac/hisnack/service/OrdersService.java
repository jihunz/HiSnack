package kr.ac.hisnack.service;

import java.util.List;

import kr.ac.hisnack.model.Orders;
import kr.ac.hisnack.util.Pager;

public interface OrdersService {
	void add(Orders item);
	void delete(int code);
	void update(Orders item);
	Orders item(int code);
	List<Orders> list(Pager pager);
	Orders latestSubscribe(String id);
}
