package kr.ac.hisnack.dao;

import java.util.List;

import kr.ac.hisnack.model.MemberTag;

public interface MemberTagDao {

	List<MemberTag> list(String id);

	void add(MemberTag item);

	void delete(int code);

	void delete(String id);

}
