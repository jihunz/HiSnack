package kr.ac.hisnack.util;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.SimpleEmail;
import org.springframework.stereotype.Component;

@Component
public class EmailSender {
	public void sendSimpleEmail(String form, String to, String subject, String content) throws EmailException {
		Email email = new SimpleEmail();
		email.setHostName("smtp.googlemail.com");
		email.setSmtpPort(465);
		
		List<String> list = new ArrayList<>();
		list.add("ciin");
		list.add("ourc");
		list.add("vyrm");
		list.add("mnjo");
		
		email.setAuthenticator(new DefaultAuthenticator("hisnack2022@gmail.com", list.get(3)+list.get(1)+list.get(2)+list.get(0)));
		email.setSSLOnConnect(true);
		email.setFrom(form);
		email.setSubject(subject);
		email.setMsg(content);
		email.addTo(to);
		email.send();
	}
}
