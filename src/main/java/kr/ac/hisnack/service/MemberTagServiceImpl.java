package kr.ac.hisnack.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.ac.hisnack.dao.MemberTagDao;
import kr.ac.hisnack.model.MemberTag;
import kr.ac.hisnack.model.Product;
import kr.ac.hisnack.model.ProductTag;
import kr.ac.hisnack.model.Tag;

@Service
public class MemberTagServiceImpl implements MemberTagService{
	@Autowired
	MemberTagDao dao;
	@Autowired
	ProductService ps;
	
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
 * 회원이 선택한 태그들 추가, ?가 Tag, ProductTag일 경우만 사용 가능
 */
	@Transactional
	@Override
	public void add(List<?> tagList, String id) {
		if(tagList.get(0) instanceof Tag) {
			for(Object tag : tagList) {
				Tag t = (Tag) tag;
				MemberTag item = new MemberTag();
				item.setTcode(t.getCode());
				item.setId(id);
				item.setRecom('y');
				dao.add(item);
			}
		}
		else if(tagList.get(0) instanceof ProductTag) {
			for(Object tag : tagList) {
				ProductTag t = (ProductTag) tag;
				MemberTag item = new MemberTag();
				item.setTcode(t.getTcode());
				item.setId(id);
				item.setRecom('y');
				dao.add(item);
			}
		}
	}
/**
 * 회원이 선택한 상품을 recom의 값에 따라 호불호를 설정한다
 * */
	@Transactional
	@Override
	public void add(String id, int code, char recom) {
		Product product = ps.item(code);
		
		for(ProductTag pt : product.getTags()) {
			MemberTag mt = new MemberTag();
			mt.setId(id);
			mt.setTcode(pt.getTcode());
			mt.setRecom(recom);
			dao.add(mt);
		}
	}
}
