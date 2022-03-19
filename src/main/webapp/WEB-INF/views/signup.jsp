<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Hi Snack!</title>
</head>
<body>
	<h4>Sign up</h4>
    <hr>
    <form method="post" action="signup" class="signupForm">
        <div>
            <label for="userId">아이디</label>
            <input type="text" name="id" id="userId" placeholder="ID">
        </div>
        <div>
            <label for="pwd">비밀번호</label>
            <input type="password" name="password" id="password" placeholder="Password">
        </div>
        <div>
            <label for="pwdConfirm">비밀번호 확인</label>
            <input type="password" name="pwdConfirm" id="pwdConfirm" placeholder="Confirm Password">
        </div>
        <div>
            <label for="name">이름</label>
            <input type="text" name="name" id="userName" placeholder="Name">
        </div>
        <div>
            <label for="addr">주소</label>
            <input type="text" name="address" id="address" placeholder="Address">
        </div>
        <div>
            <label for="tel">전화번호</label>
            <input type="text" name="tel" id="tel" placeholder="Tel">
        </div>
        <button id="signupBtn">회원가입</button>
    </form>
    
    <!-- jQuery -->
    <script src="re/js/jquery.js" type="text/javascript"></script>
    
    <script src="re/js/signup.js" type="text/javascript"></script>
    </body>
</html>