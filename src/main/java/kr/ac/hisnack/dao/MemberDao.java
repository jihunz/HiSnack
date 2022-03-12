package kr.ac.hisnack.dao;

import java.util.List;

import kr.ac.hisnack.model.Member;
import kr.ac.hisnack.util.Pager;

public interface MemberDao {

	void add(Member item);

	void delete(String id);

	void update(Member item);

	Member item(Member item);

	List<Member> list(Pager pager);

	int total(Pager pager);

}
