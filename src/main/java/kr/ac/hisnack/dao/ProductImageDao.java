package kr.ac.hisnack.dao;

import kr.ac.hisnack.model.Image;

public interface ProductImageDao {

	void add(Image image);

	void delete(int code);

}
