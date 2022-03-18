package kr.ac.hisnack.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.ac.hisnack.dao.OrderedProductDao;
import kr.ac.hisnack.dao.OrdersDao;
import kr.ac.hisnack.model.OrderedProduct;
import kr.ac.hisnack.model.Orders;
import kr.ac.hisnack.util.Pager;

@Service
public class OrdersServiceImpl implements OrdersService {
	@Autowired
	OrdersDao dao;
	@Autowired
	OrderedProductDao productDao;
	
	@Transactional
	@Override
	public void add(Orders item) {
		dao.add(item);
		
		List<OrderedProduct> list = item.getProducts();
		
		if(list == null) return;
		
		for(OrderedProduct p : list) {
			p.setOcode(item.getCode());
			productDao.add(p);
		}
	}
	
	@Transactional
	@Override
	public void delete(int code) {
		productDao.delete(code);
		dao.delete(code);
	}

	@Transactional
	@Override
	public void update(Orders item) {
		dao.update(item);
		
		productDao.delete(item.getCode());
		
		List<OrderedProduct> list = item.getProducts();
		
		if(list == null) return;
		
		for(OrderedProduct p : list) {
			p.setOcode(item.getCode());
			productDao.add(p);
		}
	}

	@Override
	public Orders item(int code) {
		return dao.item(code);
	}

	@Transactional
	@Override
	public List<Orders> list(Pager pager) {
		int total = dao.total(pager);
		pager.setTotal(total);
		return dao.list(pager);
	}

}
