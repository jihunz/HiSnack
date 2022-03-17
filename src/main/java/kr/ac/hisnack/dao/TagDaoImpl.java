package kr.ac.hisnack.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.ac.hisnack.model.Tag;
import kr.ac.hisnack.util.Pager;

@Repository
public class TagDaoImpl implements TagDao {
	@Autowired
	SqlSession sql;
	
	@Override
	public int total(Pager pager) {
		return sql.selectOne("tag.total", pager);
	}

	@Override
	public List<Tag> list(Pager pager) {
		return sql.selectList("tag.list", pager);
	}

	@Override
	public Tag item(int code) {
		return sql.selectOne("tag.item", code);
	}

	@Override
	public void add(Tag item) {
		sql.insert("tag.add", item);
	}

	@Override
	public void update(Tag item) {
		sql.update("tag.update", item);
	}

	@Override
	public void delete(int code) {
		sql.delete("tag.delete", code);
	}

}
