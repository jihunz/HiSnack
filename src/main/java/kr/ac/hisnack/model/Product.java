package kr.ac.hisnack.model;

import java.util.ArrayList;
import java.util.List;

public class Product implements Comparable<Product>{
//	제품의 일련번호
	private int code;
//	제품의 이름
	private String name;
//	제품의 가격
	private int price;
//	제품의 제조사
	private String manufacture;
//	제품의 설명
	private String info;
//	제품 이미지들
	private List<Image> images;
//	제품의 태그
	private List<ProductTag> tags;
	
	private int score;
	private int amount;
	
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	public List<ProductTag> getTags() {
		return tags;
	}
	public void setTags(List<ProductTag> tags) {
		this.tags = tags;
	}
	public void setTagsWithTcode(List<Integer> tcodes) {
		List<ProductTag> tagList = new ArrayList<ProductTag>();
		for(Integer tcode : tcodes) {
			ProductTag productTag = new ProductTag();
			productTag.setTcode(tcode);
			tagList.add(productTag);
		}
		setTags(tagList);
	}
	public String getInfo() {
		return info;
	}
	public void setInfo(String info) {
		this.info = info;
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
	public String getThumbnail() {
		return images.get(0).getFullpath();
	}
	@Override
	public int compareTo(Product product) {
		
		if(score > product.getScore()) {
			return 1;
		}
		else if(score < product.getScore()) {
			return -1;
		}
		
		return 0;
	}
}
