package kr.ac.hisnack.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.ac.hisnack.dao.TagDao;
import kr.ac.hisnack.model.Tag;
import kr.ac.hisnack.util.Pager;

@Service
public class TagServiceImpl implements TagService {
	@Autowired
	TagDao dao;
	
	@Override
	public List<Tag> list(Pager pager) {
		int total = dao.total(pager);
		pager.setTotal(total);
		return dao.list(pager);
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
