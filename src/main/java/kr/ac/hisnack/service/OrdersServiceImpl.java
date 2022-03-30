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
	
/**
 * 주문 추가
 */
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
	
/**
 * 주문 삭제
 */
	@Transactional
	@Override
	public void delete(int code) {
		productDao.delete(code);
		dao.delete(code);
	}

/**
 * 주문 수정
 */
	@Transactional
	@Override
	public void update(Orders item) {
		dao.update(item);
	}

/**
 * 주문 얻기
 */
	@Override
	public Orders item(int code) {
		Orders item = dao.item(code);
		Pager pager = new Pager();
		pager.setKeyword(item.getCode()+"");
		pager.setSearch(1);
		List<OrderedProduct> oProducts = productDao.list(pager);
		item.setProducts(oProducts);
		return item;
	}

/**
 * 주문 리스트 얻기
 */
	@Transactional
	@Override
	public List<Orders> list(Pager pager) {
		int total = dao.total(pager);
		pager.setTotal(total);
		
		List<Orders> list = dao.list(pager);
		
		for(Orders item : list) {
			pager.setKeyword(item.getCode()+"");
			pager.setSearch(1);
			List<OrderedProduct> oProducts = productDao.list(pager);
			item.setProducts(oProducts);
		}
		
		return list;
	}

}
