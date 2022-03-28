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
	
/**
 * 태그 리스트 검색
 */
	@Override
	public List<Tag> list() {
		return dao.list();
	}

/**
 * 태그 한개 검색
 */
	@Override
	public Tag item(int code) {
		return dao.item(code);
	}

/**
 * 태그 추가
 */
	@Override
	public void add(Tag item) {
		dao.add(item);
	}

/**
 * 태그 수정
 */
	@Override
	public void update(Tag item) {
		dao.update(item);
	}

/**
 * 태그 삭제
 */
	@Override
	public void delete(int code) {
		dao.delete(code);
	}

}
