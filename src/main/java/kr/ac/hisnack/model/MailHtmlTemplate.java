package kr.ac.hisnack.model;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;

import kr.ac.hisnack.util.FileUploader;

// 이메일을 보낼 때 html을 좀 쉽게 만들기 위해 만듬
// image를 넣으면 그걸 cid로 자동으로 넣어줌
// 넣을 수 있는 것은 메일 내용, 메일에 넣을 이미지 리스트
// img/hisnack_logo.png를 사용한다
public class MailHtmlTemplate {
	private String[] contents;
	private List<OrderedProduct> products;
	private String[] template;
	private final String regx = "point";
	
	public MailHtmlTemplate(String templatePath) {
//		html을 다 작성하는건 귀찮으니까 html 파일을 읽어서 사용 
		ClassPathResource resource = new ClassPathResource(templatePath);
		try {
//			파일을 읽어서 입력한 내용을 넣을 수 있게 2등분함
		    Path path = Paths.get(resource.getURI());
		    List<String> content = Files.readAllLines(path);
		    String temp = "";
		    
		    for(String c : content) {
		    	temp += c;
		    }
		    
		    template = temp.split(regx);
		    
		    if(template.length != 2) {
		    	System.out.println("template length : " + template.length);
		    	System.out.println("html이 제대로 나눠지지 않았습니다.");
		    }
		} catch (IOException e) {
		    System.out.println(e.getMessage());
		}
	}
	
	public void setContents(String ... contents) {
//		들어갈 메일 내용 저장
		this.contents = contents;
	}
	
	public void setOrderedProduct(List<OrderedProduct> products) {
//		사진과 이름이 들어갈 상품 저장
		this.products = products;
	}
	
//	MimeMessageHelper가 setText할 때 사용
	public String getHtml() {
		String html = template[0];
//		입력한 내용을 p태그로 감싸서 적음
		for(String content : contents) {
			html += String.format("<p>%s</p>", content);
		}
		html += "<div style=\"display:flex;flex-wrap:wrap;width:1000px;\">";
//		이미지 파일을 적음
		for(OrderedProduct product : products) {
//			div로 포장해서 이미지와 이름을 적음
			String containerCSS = "display:flex;flex-direction:column;align-items:center;";
			String imgBorderCSS = "width:150px;height:150px;overflow:hidden;display:flex;align-items:center;justify-content:center;";
			String imgCSS = "width:100%;height:100%;object-fit:cover;";
			html += String.format("<div style=\"%s\">", containerCSS);
			html += String.format("<div style=\"%s\"><img style=\"%s\" src=\"cid:%s\"></div>", imgBorderCSS, imgCSS, "p"+product.getPcode());
			html += String.format("<p>%s</p>", product.getName());
			html += "</div>";
		}
		html += "</div>";
		html += template[1];
		return html;
	}
	
//	MimeMessageHelper가 addInline할 때 쓸 Resource와 cid를 반환
	public Map<String, Resource> getImageResourceMap(){
		Map<String, Resource> map = new HashMap<String, Resource>();
		
		ClassPathResource cpr = new ClassPathResource("img/hisnack_logo.png");
		map.put("logo", cpr);
		
		for(OrderedProduct product : products) {
			if(product.getImages() == null || product.getImages().size() < 1) continue;
			
			String img = product.getImages().get(0).getFullfilename();
			FileSystemResource re = new FileSystemResource(new File(FileUploader.UPLOAD_PATH+img));
			map.put("p"+product.getPcode(), re);
		}
		
		return map;
	}
}
