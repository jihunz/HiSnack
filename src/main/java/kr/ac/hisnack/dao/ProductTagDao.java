package kr.ac.hisnack.dao;

import java.util.List;

import kr.ac.hisnack.model.ProductTag;

public interface ProductTagDao {

	void add(ProductTag tag);

	void update(ProductTag tag);

	void delete(int code);
	
	List<ProductTag> list(int pcode);
}
