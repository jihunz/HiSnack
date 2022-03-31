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
	
	/**
	 * 회원이 구독하고 받은 모든 상품 리스트를 반환
	 * @param id : 회원의 id
	 * @return 회원이 구독하고 받은 상품 리스트
	 */
	List<Product> subscribeList(String id);

}
