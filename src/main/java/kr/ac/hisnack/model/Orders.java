package kr.ac.hisnack.model;

import java.util.Date;

public class Orders {
//	주문의 일련번호
	private int code;
//	주문한 회원의 id
	private String id;
//	배달 받을 집 주소
	private String addres;
//	배달 받을 사람의 이름
	private String name;
//	배달 받을 사람의 전화번호
	private String tel;
//	주문한 날짜
	private Date orderDate;
//	주문이 구독인지 여부 (y or n)
	private char subscribe;
	
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
	public String getAddres() {
		return addres;
	}
	public void setAddres(String addres) {
		this.addres = addres;
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
