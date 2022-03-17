package kr.ac.hisnack.service;

import java.util.List;

import kr.ac.hisnack.model.Tag;

public interface TagService {
	List<Tag> list();
	Tag item(int code);
	void add(Tag item);
	void update(Tag item);
	void delete(int code);
}
