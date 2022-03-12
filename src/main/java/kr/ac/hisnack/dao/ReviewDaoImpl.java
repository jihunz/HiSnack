package kr.ac.hisnack.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.ac.hisnack.model.Review;
import kr.ac.hisnack.util.Pager;

@Repository
public class ReviewDaoImpl implements ReviewDao {
	@Autowired
	SqlSession sql;
	
	@Override
	public void add(Review item) {
		sql.insert("review.add", item);
	}

	@Override
	public void delete(int code) {
		sql.delete("review.delete", code);
	}

	@Override
	public void update(Review item) {
		sql.update("review.update", item);
	}

	@Override
	public Review item(int code) {
		return sql.selectOne("review.item", code);
	}

	@Override
	public int total(Pager pager) {
		return sql.selectOne("review.total", pager);
	}

	@Override
	public List<Review> list(Pager pager) {
		return sql.selectList("review.list", pager);
	}

}
