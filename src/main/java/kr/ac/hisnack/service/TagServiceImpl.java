package kr.ac.hisnack.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.ac.hisnack.dao.TagDao;
import kr.ac.hisnack.model.Tag;

@Service
public class TagServiceImpl implements TagService {
	@Autowired
	TagDao dao;
	
	@Override
	public List<Tag> list() {
		return dao.list();
	}

	@Override
	public Tag item(int code) {
		return dao.item(code);
	}

	@Override
	public void add(Tag item) {
		dao.add(item);
	}

	@Override
	public void update(Tag item) {
		dao.update(item);
	}

	@Override
	public void delete(int code) {
		dao.delete(code);
	}

}
