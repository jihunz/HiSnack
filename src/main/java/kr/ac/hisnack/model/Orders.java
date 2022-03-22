package kr.ac.hisnack.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Orders {
//	주문의 일련번호
	private int code;
//	주문한 회원의 id
	private String id;
//	배달 받을 집 주소
	private String address;
//	배달 받을 사람의 이름
	private String name;
//	배달 받을 사람의 전화번호
	private String tel;
//	주문한 날짜
	private Date orderDate;
//	주문이 구독인지 여부 (y or n)
	private char subscribe;
//	주문의 총 가격
	private int total;
//	주문된 제품들
	private List<OrderedProduct> products;
	
	
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
	public void setProducts(List<Integer> pcodes, List<Integer> amounts) throws Exception{
		if(pcodes.size() != amounts.size()) {
			throw new Exception("제품과 수량이 맞지 않습니다.");
		}
		
		List<OrderedProduct> list = new ArrayList<OrderedProduct>();
		
		for(int i = 0; i < pcodes.size(); i++) {
			OrderedProduct item = new OrderedProduct();
			item.setPcode(pcodes.get(i));
			item.setAmount(amounts.get(i));
			list.add(item);
		}
		
		products = list;
	}
	public List<OrderedProduct> getProducts() {
		return products;
	}
	public void setProducts(List<OrderedProduct> products) {
		this.products = products;
	}
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public Date getOrderDate() {
		return orderDate;
	}
	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}
	public char getSubscribe() {
		return subscribe;
	}
	public void setSubscribe(char subscribe) {
		this.subscribe = subscribe;
	}
}
