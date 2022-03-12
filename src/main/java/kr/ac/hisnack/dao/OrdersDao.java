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

}
