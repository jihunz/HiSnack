package kr.ac.hisnack.service;

import java.util.List;

import kr.ac.hisnack.model.Member;
import kr.ac.hisnack.util.Pager;

public interface MemberService {
	void add(Member item);
	void delete(String id);
	void update(Member item);
	Member item(String id);
	List<Member> list(Pager pager);
	int total(Pager pager);
	Member login(Member item);
	boolean confirm(String id);
	void keepLogin(String sessionId, String id);
	Member checkMemberWithSessionId(String sessionId);
	boolean confirmEmail(String email);
	void changePassword(String id, String pw);
}
