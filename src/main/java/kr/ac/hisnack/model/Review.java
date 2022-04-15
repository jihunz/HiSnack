package kr.ac.hisnack.model;

import java.util.Date;
import java.util.List;

public class Review {
//	리뷰의 일련번호
	private int code;
//	리뷰를 쓴 회원의 id
	private String id;
//	리뷰 내용
	private String contents;
//	리뷰를 쓴 날짜
	private Date regDate;
//	별점 (1 ~ 5)
	private float rating;
//	리뷰 안에 있는 이미지들
	private List<Image> images;
//	리뷰를 쓴 회원의 이름
	private String name;
//	리뷰한 구독의 가격
	private int price;
	
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public float getRating() {
		return rating;
	}
	public void setRating(float rating) {
		this.rating = rating;
	}
	public String getMaskname() {
		if(name == null) {
			return "name is null";
		}
		String result = "";
		String first = name.substring(0, 1);
		String mask = "";
		for(int i = 0; i < name.length() - 1; i++) {
			mask += "*";
		}
		result = first + mask;
		return result;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<Image> getImages() {
		return images;
	}
	public void setImages(List<Image> images) {
		this.images = images;
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
	public String getContents() {
		return contents;
	}
	public void setContents(String contents) {
		this.contents = contents;
	}
	public Date getRegDate() {
		return regDate;
	}
	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}
	public String getThumbnail() {
		if(images == null) return "";
		else if(images.size() < 1) return "";
		return images.get(0).getFullpath();
	}
}
