package kr.ac.hisnack.util;

import java.io.UnsupportedEncodingException;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import kr.ac.hisnack.model.MailHtmlTemplate;

@Component
public class EmailSender {
	@Autowired
	MailSender sender;
	@Autowired
	JavaMailSender jmSender;
	
	public void sendSimpleEmail(String to, String subject, String content) {
		Thread t = new Thread(new Runnable() {
			
			@Override
			public void run() {
				SimpleMailMessage message = new SimpleMailMessage();
				message.setTo(to);
				message.setSubject(subject);
				message.setText(content);
				sender.send(message);		
			}
		});
		
		t.start();
	}
	
	public void sendHtmlEmail(String to, String name, String subject, String htmlStr){
			Thread t = new Thread(new Runnable() {
			
			@Override
			public void run() {
				MimeMessage message = jmSender.createMimeMessage();
			    try {
			    	MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
			    	helper.setSubject(subject);
					
			        //내용설정 
			        helper.setText(htmlStr, true);

			        //TO 설정 
			        helper.setTo(new InternetAddress(to, name+"님", "utf-8"));

			        jmSender.send(message);
			    } catch (MessagingException e) {
			        e.printStackTrace();
			    } catch (UnsupportedEncodingException e) {
			        e.printStackTrace();
			    }	
			}
		});
		
		t.start();
	}
	
	public void sendHtmlWithImageEmail(String to, String name, String subject, MailHtmlTemplate html) {
			Thread t = new Thread(new Runnable() {
			
			@Override
			public void run() {
				MimeMessage message = jmSender.createMimeMessage();
			    try {
			    	MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
			    	helper.setSubject(subject);

			        //TO 설정 
			        helper.setTo(new InternetAddress(to, name+"님", "utf-8"));
			        
//			        html에 설정
			        helper.setText(html.getHtml(), true);
			        
//			        이미지 넣기
			        Map<String, Resource> map = html.getImageResourceMap();
			        
			        for(String key : map.keySet()) {
			        	helper.addInline(key, map.get(key));
			        }
			        
//			        메일 보내기
			        jmSender.send(message);
			    } catch (MessagingException e) {
			        e.printStackTrace();
			    } catch (UnsupportedEncodingException e) {
			        e.printStackTrace();
			    }	
			}
		});
		
		t.start();
	}
}
