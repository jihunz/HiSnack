package kr.ac.hisnack.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.ac.hisnack.dao.MemberDao;
import kr.ac.hisnack.model.Member;
import kr.ac.hisnack.util.Pager;

/**
 * 회원 dao에게 일을 시키는 service
 * @author 오종택
 *
 */
@Service
public class MemberServiceImpl implements MemberService {
	@Autowired
	MemberDao dao;
	@Autowired
	MemberTagService mts;
	
/**
 * 회원 추가
 */
	@Override
	public void add(Member item) {
		dao.add(item);
	}

/**
 * 회원 삭제
 */
	@Override
	public void delete(String id) {
		dao.delete(id);
	}

/**
 * 회원 수정
 */
	@Override
	public void update(Member item) {
		dao.update(item);
	}

/**
 * 회원 리스트 얻기
 */
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
	
/**
 * 회원 수 얻기
 */
	@Override
	public int total(Pager pager) {
		return dao.total(pager);
	}

/**
 * 회원 정보 얻기
 */
	@Transactional
	@Override
	public Member item(String id) {
		Member item = dao.item(id);
		item.setTags(mts.list(item.getId()));
		return item;
	}

/**
 * 회원 로그인
 */
	@Override
	public Member login(Member item) {
		return dao.login(item);
	}

/**
 * 회원 id 확인
 */
	@Override
	public boolean confirm(String id) {
		Pager pager = new Pager();
		pager.setKeyword(id);
		pager.setSearch(2);
		int total = total(pager);
		if(total == 0) {
			return true;	
		}
		else {
			return false;
		}
	}

	@Override
	public void keepLogin(String sessionId, String id) {
		dao.keepLogin(sessionId, id);
	}
	
	@Transactional
	@Override
	public Member checkMemberWithSessionId(String sessionId) {
		List<Member> list = dao.checkMemberWithSessionId(sessionId);
		
		if(list == null) return null;
		
//		session_id가 같은 회원이 있을 경우
		if(list.size() == 1) {
//			한명이면 정상이고 반환한다
			return list.get(0);
		}
		else {
//			여러명이면 비정상이고 회원들의 session_id를 다 null로 수정 
			for(Member member : list) {
				keepLogin(null, member.getId());	
			}
//			회원 1명만 session_id를 가지게 함
			keepLogin(sessionId, list.get(0).getId());
			return list.get(0);
		}
	}
}
