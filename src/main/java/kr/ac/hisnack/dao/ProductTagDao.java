package kr.ac.hisnack.dao;

import kr.ac.hisnack.model.ProductTag;

public interface ProductTagDao {

	void add(ProductTag tag);

	void update(ProductTag tag);

	void delete(int code);

}
