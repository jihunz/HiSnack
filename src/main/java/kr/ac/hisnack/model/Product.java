package kr.ac.hisnack.model;

import java.util.List;

public class Product {
//	제품의 일련번호
	private int code;
//	제품의 이름
	private String name;
//	제품의 가격
	private int price;
//	제품의 제조사
	private String manufacture;
//	제품 이미지들
	private List<Image> images;
	
	
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public String getManufacture() {
		return manufacture;
	}
	public void setManufacture(String manufacture) {
		this.manufacture = manufacture;
	}
}
