package kr.ac.hisnack.dao;

import java.util.List;

import kr.ac.hisnack.model.Image;

public interface ProductImageDao {

	void add(Image image);

	void delete(int code);

	List<Image> list(int code);

}
