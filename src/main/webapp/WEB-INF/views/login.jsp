<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
<link rel="stylesheet" href="/re/css/login.css">
<script src="re/js/google_login.js"></script>

</head>
<body>
	
	<jsp:include page="/WEB-INF/views/common/header.jsp"></jsp:include>
	<div class = "wrapper mb-120">
		<div class = "flex justify-center">
			<div class = "loginbox text-center mt-120">
				
				<div>
					<h4 class = "loginfont mt-60">LOGIN</h4>
				    <div class ="yellowline flex justify-center"></div>
				</div>
			    <form method="post" action="login" class="loginForm">
			        <div class = "mt-30">
			            <input type="text" name="id" id="userId" placeholder="ID" class = "inputsize">
			        </div>
			        <div>
			            <input type="password" name="password" id="password" placeholder="Password" class = "inputsize mt-10">
			        </div>
			        
			        <button class = "loginbtn mt-30">로그인</button>
			        <div>
			        	<label><input type="checkbox" name="autoLogin" class = "mt-20 mr-10">자동 로그인</label>
			        </div>
			    </form>
			    <div class = "flex justify-center column items-center ">
				    <div class = "idbox flex justify-center items-center">
				        <a href="signup">회원가입</a>
				        <div class = "hiline "></div>
				        <a href="../">아이디 찾기</a>
				         <div class = "hiline"></div>
				        <a href="../">비밀번호 찾기</a>
				    </div>
				    
				    <div id="googleBtn" class = "mt-10 mb-60 glogin flex items-center">
				    	<div class = "flex mx-15 googlebox">
				    		<img src="/re/img/google.png">
				    	</div>
				    	<div class = "gline"></div>
				    	<div class = "ml-60">
				    		<p>Google 계정으로 로그인하기</p>
				    	</div>
				    </div>
				</div>
		    </div>
	    </div>
    </div>
    <jsp:include page="/WEB-INF/views/common/footer.jsp"></jsp:include>
</body>