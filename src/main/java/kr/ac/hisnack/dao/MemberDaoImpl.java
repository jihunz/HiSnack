package kr.ac.hisnack.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.ac.hisnack.model.Member;
import kr.ac.hisnack.util.Pager;

@Repository
public class MemberDaoImpl implements MemberDao{
	@Autowired
	SqlSession sql;

	@Override
	public void add(Member item) {
		sql.insert("member.add", item);
	}

	@Override
	public void delete(String id) {
		sql.delete("member.delete", id);
	}

	@Override
	public void update(Member item) {
		sql.update("member.update", item);
	}

	@Override
	public List<Member> list(Pager pager) {
		return sql.selectList("member.list", pager);
	}

	@Override
	public int total(Pager pager) {
		return sql.selectOne("member.total", pager);
	}

	@Override
	public Member item(String id) {
		return sql.selectOne("member.item", id);
	}

	@Override
	public Member login(Member item) {
		return sql.selectOne("member.login", item);
	}

	@Override
	public void keepLogin(String sessionId, String id) {
		Map<String, String> map = new HashMap<>();
		map.put("sessionId", sessionId);
		map.put("id", id);
		sql.update("member.keep_login", map);
	}
	
	@Override
	public List<Member> checkMemberWithSessionId(String sessionId) {
		return sql.selectList("member.check", sessionId);
	}
	
	@Override
	public void changePassword(String id, String pw) {
		Map<String, Object> map = new HashMap<>();
		map.put("id", id);
		map.put("password", pw);
		sql.update("member.change_password", map);
	}
}
