package kr.ac.hisnack.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.ac.hisnack.dao.MemberTagDao;
import kr.ac.hisnack.model.MemberTag;
import kr.ac.hisnack.model.Tag;

@Service
public class MemberTagServiceImpl implements MemberTagService{
	@Autowired
	MemberTagDao dao;
	
/**
 * 회원이 선택한 태그 리스트
 */
	@Override
	public List<MemberTag> list(String id) {
		return dao.list(id);
	}

/**
 * 회원이 선택한 태그 추가
 */
	@Transactional
	@Override
	public void add(List<MemberTag> list) {
		for(MemberTag item : list) {
			dao.add(item);
		}
	}

/**
 * 회원이 선택한 태그 삭제
 */
	@Override
	public void delete(int code) {
		dao.delete(code);
	}

/**
 * 회원이 선택한 태그 전부 삭제
 */
	@Override
	public void delete(String id) {
		dao.delete(id);
	}
	
/**
 * 회원이 선택한 태그들 추가
 */
	@Transactional
	@Override
	public void add(List<Tag> tagList, String id) {
		for(Tag tag : tagList) {
			MemberTag item = new MemberTag();
			item.setTcode(tag.getCode());
			item.setId(id);
			item.setRecom('y');
			dao.add(item);
		}
	}
}
