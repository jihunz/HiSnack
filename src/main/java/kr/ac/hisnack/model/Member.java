package kr.ac.hisnack.model;

import java.util.List;

public class Member {
//	회원의 id
	private String id;
//	회원의 비밀번호
	private String password;
//	회원의 집 주소
	private String address;
//	회원의 이름
	private String name;
//	회원의 전화번호
	private String tel;
//	회원 관리 레벨
	private int grade;
//	멤버가 선택한 태그들
	private List<MemberTag> tags;
	
	public List<MemberTag> getTags() {
		return tags;
	}
	public void setTags(List<MemberTag> tags) {
		this.tags = tags;
	}
	public int getGrade() {
		return grade;
	}
	public void setGrade(int grade) {
		this.grade = grade;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
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
}
