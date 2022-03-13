package kr.ac.hisnack.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.ac.hisnack.dao.MemberDao;
import kr.ac.hisnack.model.Member;
import kr.ac.hisnack.util.Pager;

@Service
public class MemberServiceImpl implements MemberService {
	@Autowired
	MemberDao dao;
	
	@Override
	public void add(Member item) {
		dao.add(item);
	}

	@Override
	public void delete(String id) {
		dao.delete(id);
	}

	@Override
	public void update(Member item) {
		dao.update(item);
	}

	@Override
	public Member item(Member item) {
		return dao.item(item);
	}

	@Override
	public List<Member> list(Pager pager) {
		int total = dao.total(pager);
		pager.setTotal(total);
		return dao.list(pager);
	}
	
	@Override
	public int total(Pager pager) {
		return dao.total(pager);
	}
}
