package kr.ac.hisnack.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.ac.hisnack.model.MemberTag;

@Repository
public class MemberTagDaoImpl implements MemberTagDao {
	@Autowired
	SqlSession sql;
	
	@Override
	public List<MemberTag> list(String id) {
		return sql.selectList("member_tag.list", id);
	}

	@Override
	public void add(MemberTag item) {
		sql.insert("member_tag.add", item);
	}

	@Override
	public void delete(int code) {
		sql.delete("member_tag.delete", code);
	}

	@Override
	public void delete(String id) {
		sql.delete("member_tag.delete_with_id", id);
	}

}
