package kr.ac.hisnack.model;

public class Image {
//	이미지의 일련번호
	private int code;
//	이 이미지를 사용하는 테이블의 기본기(제품, 리뷰)
	private int target;
//	이미지의 이름
	private String filename;
//	이미지를 저장할 때 사용하는 uuid
	private String uuid;
	
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public int getTarget() {
		return target;
	}
	public void setTarget(int target) {
		this.target = target;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	public String getFullfilename() {
		return uuid+"_"+filename;
	}
}
