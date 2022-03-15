package kr.ac.hisnack.dao;

import java.util.List;

import kr.ac.hisnack.model.Image;

public interface ReviewImageDao {

	List<Image> list(int code);

	void delete(int code);

	void add(Image image);

}
