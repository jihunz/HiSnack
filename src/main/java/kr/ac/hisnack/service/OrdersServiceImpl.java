package kr.ac.hisnack.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.ac.hisnack.dao.OrderedProductDao;
import kr.ac.hisnack.dao.OrdersDao;
import kr.ac.hisnack.dao.ProductDao;
import kr.ac.hisnack.model.OrderedProduct;
import kr.ac.hisnack.model.Orders;
import kr.ac.hisnack.util.Pager;

@Service
public class OrdersServiceImpl implements OrdersService {
	@Autowired
	OrdersDao dao;
	@Autowired
	OrderedProductDao opd;
	@Autowired
	ProductDao pd;
	@Autowired
	ProductService ps;
	@Autowired
	MemberTagService mts;
	
/**
 * 주문 추가
 */
	@Transactional
	@Override
	public void add(Orders item) {
		List<OrderedProduct> list = item.getProducts();
		
		if(item.getSubscribe() == 'n')
			item.setTotal(ps.priceTotal(list));
		
		dao.add(item);
		
//		DB에 주문한 상품 저장
		if(list != null) {
			for(OrderedProduct p : list) {
				p.setOcode(item.getCode());
				opd.add(p);
			}	
		}
//		DB에 회원이 좋아하는 태그 저장
		if(item.getTags() != null) {
			mts.add(item.getTags(), item.getId());
		}
	}
	
/**
 * 주문 삭제
 */
	@Transactional
	@Override
	public void delete(int code) {
		opd.delete(code);
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
		List<OrderedProduct> oProducts = opd.list(pager);
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
		
		Pager p  = new Pager();
		
		for(Orders item : list) {
			p.setKeyword(item.getCode()+"");
			p.setSearch(1);
			List<OrderedProduct> oProducts = opd.list(p);
			item.setProducts(oProducts);
		}
		
		return list;
	}
	
	@Override
	public Orders latestSubscribe(String id) {
		Pager pager = new Pager();
		pager.setPerPage(1);
		pager.setOrder(1);
		pager.setSearch(2);
		pager.setKeyword(id);
		
		List<Orders> list = list(pager);
		
		return list.size() > 0 ? list.get(0) : null;
	}
}
