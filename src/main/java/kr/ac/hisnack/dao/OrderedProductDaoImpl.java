package kr.ac.hisnack.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.ac.hisnack.model.OrderedProduct;
import kr.ac.hisnack.util.Pager;

@Repository
public class OrderedProductDaoImpl implements OrderedProductDao{
	@Autowired
	SqlSession sql;
	
	@Override
	public void add(OrderedProduct item) {
		sql.insert("ordered_product.add", item);
	}

	@Override
	public void delete(int code) {
		sql.delete("ordered_product.delete", code);
	}

	@Override
	public OrderedProduct item(int code) {
		return sql.selectOne("ordered_product.item", code);
	}

	@Override
	public List<OrderedProduct> list(Pager pager) {
		return sql.selectList("ordered_product.list", pager);
	}

	@Override
	public void update(OrderedProduct item) {
		sql.update("ordered_product.update", item);
	}

}
