package kr.ac.hisnack.service;

import java.util.List;

import kr.ac.hisnack.model.Review;
import kr.ac.hisnack.util.Pager;

public interface ReviewService {
	void add(Review item);
	void delete(int code);
	void update(Review item);
	Review item(int code);
	List<Review> list(Pager pager);
}
