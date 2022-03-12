package kr.ac.hisnack.dao;

import java.util.List;

import kr.ac.hisnack.model.Review;
import kr.ac.hisnack.util.Pager;

public interface ReviewDao {

	void add(Review item);

	void delete(int code);

	void update(Review item);

	Review item(int code);

	int total(Pager pager);

	List<Review> list(Pager pager);

}
