<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
<link rel="stylesheet" href="/re/css/signup.css">
</head>
<body>
<jsp:include page="/WEB-INF/views/common/header.jsp"></jsp:include>
	<div class = "wrapper mb-120">
		<div class = "flex justify-center">
			<div class = "signupbox text-center mt-120">
			
				<div>
					<h4 class = "signupfont mt-60">Sign up</h4>
				    <div class ="yellowline flex justify-center"></div>
			    </div>
			    
			    <form method="post" action="signup" class="signupForm">
			        <div class = "mt-30">
			            <label for="userId">아이디</label>
			            <input type="text" name="id" id="userId" placeholder="ID" maxlength="32" class = "inputsize">
			        </div>
			        <div>
			            <label for="pwd">비밀번호</label>
			            <input type="password" name="password" id="password" placeholder="Password" maxlength="15" class = "inputsize">
			        </div>
			        <div>
			            <label for="pwdConfirm">비밀번호 확인</label>
			            <input type="password" name="pwdConfirm" id="pwdConfirm" placeholder="Confirm Password" maxlength="15" class = "inputsize">
			        </div>
			        <div>
			            <label for="name">이름</label>
			            <input type="text" name="name" id="userName" placeholder="Name" maxlength="8" class = "inputsize">
			        </div>
			        <div>
			            <label for="addr">주소</label>
			            <div class="flex item-center">
			            	<input type="text" name="address" id="address" placeholder="Address" maxlength="64" class = "addressinput">
			            	<button type="button" onclick="execDaumPostcode()" class = "addressbtn text-center">주소 찾기</button>
			            </div>
			            
			        </div>
			        <div>
			            <label for="tel">전화번호</label>
			            <input type="text" name="tel" id="tel" placeholder="Tel" maxlength="16" class = "inputsize">
			        </div>
			        <div>
			            <label for="email">이메일</label>
			            <input type="email" name="email" id="email" placeholder="Email" maxlength="32" class = "inputsize">
			        </div>
			        <button id="signupBtn" class = "signupbtn mt-30 mb-60">회원가입</button>
			    </form>
			    
			    <!-- Daum 우편번호 서비스 CDN-->
			    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
			    <!-- Daum 우편번호 서비스 함수 파일-->
			    <script src="/re/js/daumPostCode.js" type="text/javascript"></script>
			    <script src="/re/js/signup.js" type="text/javascript"></script>
		    </div>
	    </div>
	</div>
	<jsp:include page="/WEB-INF/views/common/footer.jsp"></jsp:include>
    </body>
</html>