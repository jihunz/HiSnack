package kr.ac.hisnack.service;

import java.util.List;

import kr.ac.hisnack.model.OrderedProduct;
import kr.ac.hisnack.model.Product;
import kr.ac.hisnack.util.Pager;

public interface ProductService {
	void add(Product item);
	void delete(int code);
	void update(Product item);
	Product item(int code);
	List<Product> list(Pager pager);
	int priceTotal(List<OrderedProduct> products);
	List<Product> list(List<OrderedProduct> products);
}
