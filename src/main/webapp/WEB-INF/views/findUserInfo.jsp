<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
<link rel="stylesheet" href="/re/css/findUserInfo.css">
</head>
<body>
<jsp:include page="/WEB-INF/views/common/header.jsp"></jsp:include>
	<div class = "wrapper mb-120">
		<div class = "flex justify-center">
			<div class = "signupbox text-center mt-120">
				<div>
					<h4 class = "signupfont mt-60">아이디 찾기</h4>
				    <div class ="yellowline flex justify-center"></div>
			    </div>
			    <form class="signupForm">
			        <div>
			            <label for="email">이메일</label>
			            <div class="flex item-center">
			            	<input type="email" name="email" id="email-id" placeholder="Email" maxlength="32" class = "addressinput">
			            </div>
			        </div>
			        <button id="idBtn" class = "signupbtn mt-30 mb-60" type="button">아이디 찾기</button>

			<div class = "signupbox text-center mt-120">
				<div>
					<h4 class = "signupfont mt-60">비밀번호 찾기</h4>
				    <div class ="yellowline flex justify-center"></div>
			    </div>
			    <form method="post" action="signup" class="signupForm">
			        <div>
						<div class="flex item-center">
							<label for="userId">아이디</label>
			            	<input type="text" name="id" id="userId" placeholder="ID" maxlength="32" class = "addressinput">
			            	<button type="button" id="id-confirm-btn" class = "addressbtn text-center">아이디 확인</button>
			            </div>
			        </div>
					<div class="email-wrapper">
						<div>
							<label for="email">이메일로 인증</label>
							<div class="flex item-center">
								<input type="email" name="email" id="email" placeholder="Email" maxlength="32" class = "addressinput" readonly>
								<button type="button" id="email-btn" class = "addressbtn text-center">보내기</button>
							</div>
						</div>
						<div>
							<label for="email-confirm">확인 번호</label>
							<div class="flex item-center">
								<div id="email-confirm-wrapper">
									<input type="text" id="email-confirm" placeholder="Email Confirm" maxlength="32" class = "addressinput" readonly/>
									<span></span>
								</div>
								<button type="button" id="email-confirm-btn" class = "addressbtn text-center">확인</button>
							</div>
						</div>
					</div>
			        <button id="pwdBtn" class = "signupbtn mt-30 mb-60" type="button">비밀번호 찾기</button>
			    </form>
			    
			    <input type="hidden" id="email-confirm-hidden"/>
			    
			    <!-- Daum 우편번호 서비스 CDN-->
			    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
			    <!-- Daum 우편번호 서비스 함수 파일-->
			    <script src="/re/js/findUserInfo.js" type="text/javascript"></script>
			    <script src="/re/js/email_confirm.js"></script>
		    </div>
	    </div>
	</div>
	<jsp:include page="/WEB-INF/views/common/footer.jsp"></jsp:include>
    </body>
</html>