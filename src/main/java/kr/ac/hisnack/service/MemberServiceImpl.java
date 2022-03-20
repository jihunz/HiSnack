package kr.ac.hisnack.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

	@Transactional
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

	@Override
	public Member item(String id) {
		return dao.item(id);
	}

	@Override
	public Member login(Member item) {
		return dao.login(item);
	}
	
	@Override
	public boolean confirm(String id) {
		Pager pager = new Pager();
		pager.setKeyword(id);
		pager.setSearch(1);
		int total = total(pager);
		if(total == 0) {
			return true;	
		}
		else {
			return false;
		}
	}
}
