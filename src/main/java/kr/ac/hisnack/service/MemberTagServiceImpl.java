package kr.ac.hisnack.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.ac.hisnack.dao.MemberTagDao;
import kr.ac.hisnack.model.MemberTag;

@Service
public class MemberTagServiceImpl implements MemberTagService{
	@Autowired
	MemberTagDao dao;
	
	@Override
	public List<MemberTag> list(String id) {
		return dao.list(id);
	}

	@Transactional
	@Override
	public void add(List<MemberTag> list) {
		for(MemberTag item : list) {
			dao.add(item);
		}
	}

	@Override
	public void delete(int code) {
		dao.delete(code);
	}

	@Override
	public void delete(String id) {
		dao.delete(id);
	}
}
