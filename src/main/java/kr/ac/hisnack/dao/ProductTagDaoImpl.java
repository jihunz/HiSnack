package kr.ac.hisnack.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.ac.hisnack.model.ProductTag;

@Repository
public class ProductTagDaoImpl implements ProductTagDao {
	@Autowired
	SqlSession sql;
	
	@Override
	public void add(ProductTag tag) {
		sql.insert("product_tag.add", tag);
	}

	@Override
	public void update(ProductTag tag) {
		sql.update("product_tag.update", tag);
	}

	@Override
	public void delete(int code) {
		sql.delete("product_tag.delete", code);
	}

}
