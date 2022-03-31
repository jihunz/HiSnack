package kr.ac.hisnack.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.ac.hisnack.model.Product;
import kr.ac.hisnack.util.Pager;

@Repository
public class ProductDaoImpl implements ProductDao {
	@Autowired
	SqlSession sql;
	
	@Override
	public void add(Product item) {
		sql.insert("product.add", item);
	}

	@Override
	public void delete(int code) {
		sql.delete("product.delete", code);
	}

	@Override
	public void update(Product item) {
		sql.update("product.update", item);
	}

	@Override
	public Product item(int code) {
		return sql.selectOne("product.item", code);
	}

	@Override
	public int total(Pager pager) {
		return sql.selectOne("product.total", pager);
	}

	@Override
	public List<Product> list(Pager pager) {
		return sql.selectList("product.list", pager);
	}

	@Override
	public List<Product> subscribeList(String id) {
		return sql.selectList("product.sub_list", id);
	}
}
