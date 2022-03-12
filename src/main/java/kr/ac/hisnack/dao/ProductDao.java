package kr.ac.hisnack.dao;

import java.util.List;

import kr.ac.hisnack.model.Product;
import kr.ac.hisnack.util.Pager;

public interface ProductDao {

	void add(Product item);

	void delete(int code);

	void update(Product item);

	Product item(int code);

	int total(Pager pager);

	List<Product> list(Pager pager);

}
