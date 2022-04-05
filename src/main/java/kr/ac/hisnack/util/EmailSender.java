package kr.ac.hisnack.util;

import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.SimpleEmail;
import org.springframework.stereotype.Component;

/*
 * 테스트로 만든 구글 계정
 * email : hisnack2022@gmail.com
 * password : hisnack!2022!
 * 앱 비밀번호 : mnjoourcvyrmciin
 */

@Component
public class EmailSender {
	public void sendSimpleEmail(String form, String to, String subject, String content) throws EmailException {
		Email email = new SimpleEmail();
		email.setHostName("smtp.googlemail.com");
		email.setSmtpPort(465);
		email.setAuthenticator(new DefaultAuthenticator("hisnack2022@gmail.com", "mnjoourcvyrmciin"));
		email.setSSLOnConnect(true);
		email.setFrom(form);
		email.setSubject(subject);
		email.setMsg(content);
		email.addTo(to);
		email.send();
	}
}
