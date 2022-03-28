package kr.ac.hisnack.service;

import java.util.List;

import kr.ac.hisnack.model.MemberTag;
import kr.ac.hisnack.model.Tag;

public interface MemberTagService {

	List<MemberTag> list(String id);

	void add(List<MemberTag> list);

	void delete(int code);

	void delete(String id);

	void add(List<Tag> tagList, String id);

}
