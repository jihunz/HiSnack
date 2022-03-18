package kr.ac.hisnack.dao;

import java.util.List;

import kr.ac.hisnack.model.OrderedProduct;
import kr.ac.hisnack.util.Pager;

public interface OrderedProductDao {

	void add(OrderedProduct item);

	void delete(int code);
	
	OrderedProduct item(int code);
	
	List<OrderedProduct> list(Pager pager);
	
	void update(OrderedProduct item);
}
