package kr.ac.hisnack.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.ac.hisnack.dao.OrdersDao;
import kr.ac.hisnack.model.Orders;
import kr.ac.hisnack.util.Pager;

@Service
public class OrdersServiceImpl implements OrdersService {
	@Autowired
	OrdersDao dao;
	
	@Override
	public void add(Orders item) {
		dao.add(item);
	}

	@Override
	public void delete(int code) {
		dao.delete(code);
	}

	@Override
	public void update(Orders item) {
		dao.update(item);
	}

	@Override
	public Orders item(int code) {
		return dao.item(code);
	}

	@Override
	public List<Orders> list(Pager pager) {
		int total = dao.total(pager);
		pager.setTotal(total);
		return dao.list(pager);
	}

}
