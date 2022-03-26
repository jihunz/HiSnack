package kr.ac.hisnack.model;

public class MemberTag {
	private int code;
	private String id;
	private int tcode;
	private char recom;
	
	private String content;
	
	public char getRecom() {
		return recom;
	}
	public void setRecom(char recom) {
		this.recom = recom;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
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
	public int getTcode() {
		return tcode;
	}
	public void setTcode(int tcode) {
		this.tcode = tcode;
	}
}
