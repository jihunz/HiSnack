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
	@Autowired
	MemberTagService mts;
	
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
		
		List<Member> list = dao.list(pager); 
		
		for(Member item : list) {
			item.setTags(mts.list(item.getId()));
		}
		
		return list;
	}
	
	@Override
	public int total(Pager pager) {
		return dao.total(pager);
	}

	@Transactional
	@Override
	public Member item(String id) {
		Member item = dao.item(id);
		item.setTags(mts.list(id));
		return item;
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
