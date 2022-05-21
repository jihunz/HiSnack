package kr.ac.hisnack.service;

import java.util.List;

import kr.ac.hisnack.model.MemberTag;

public interface MemberTagService {

	List<MemberTag> list(String id);

	void add(List<MemberTag> list);

	void delete(int code);

	void delete(String id);

	void add(List<?> tagList, String id);

	void add(String id, int code, char recom);

	void add(MemberTag item);
}
