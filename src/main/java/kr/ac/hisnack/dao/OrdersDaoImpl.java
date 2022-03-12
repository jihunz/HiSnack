package kr.ac.hisnack.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.ac.hisnack.model.Orders;
import kr.ac.hisnack.util.Pager;

@Repository
public class OrdersDaoImpl implements OrdersDao {
	@Autowired
	SqlSession sql;
	
	@Override
	public void add(Orders item) {
		sql.insert("orders.add", item);
	}

	@Override
	public void delete(int code) {
		sql.delete("orders.delete", code);
	}

	@Override
	public void update(Orders item) {
		sql.update("orders.update", item);
	}

	@Override
	public Orders item(int code) {
		return sql.selectOne("orders.item", code);
	}

	@Override
	public List<Orders> list(Pager pager) {
		return sql.selectList("orders.list", pager);
	}

	@Override
	public int total(Pager pager) {
		return sql.selectOne("orders.total", pager);
	}

}
