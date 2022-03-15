package kr.ac.hisnack.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.ac.hisnack.model.Image;

@Repository
public class ReviewImageDaoImpl implements ReviewImageDao {
	@Autowired
	SqlSession sql;
	
	@Override
	public List<Image> list(int code) {
		return sql.selectList("review_image.list", code);
	}

	@Override
	public void delete(int code) {
		sql.delete("review_image.delete", code);
	}

	@Override
	public void add(Image image) {
		sql.insert("review_image.add", image);
	}

}
