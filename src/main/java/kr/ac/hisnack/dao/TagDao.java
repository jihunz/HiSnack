package kr.ac.hisnack.dao;

import java.util.List;

import kr.ac.hisnack.model.Tag;
import kr.ac.hisnack.util.Pager;

public interface TagDao {

	int total(Pager pager);

	List<Tag> list(Pager pager);

	Tag item(int code);

	void add(Tag item);

	void update(Tag item);

	void delete(int code);

}
