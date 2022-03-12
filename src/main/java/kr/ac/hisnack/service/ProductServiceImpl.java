package kr.ac.hisnack.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.ac.hisnack.dao.ProductDao;
import kr.ac.hisnack.model.Product;
import kr.ac.hisnack.util.Pager;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	ProductDao dao;
	
	@Override
	public void add(Product item) {
		dao.add(item);
	}

	@Override
	public void delete(int code) {
		dao.delete(code);
	}

	@Override
	public void update(Product item) {
		dao.update(item);
	}

	@Override
	public Product item(int code) {
		return dao.item(code);
	}

	@Override
	public List<Product> list(Pager pager) {
		int total = dao.total(pager);
		pager.setTotal(total);
		return dao.list(pager);
	}

}
