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
            <input type="text" name="id" id="userId" placeholder="ID" maxlength="32">
        </div>
        <div>
            <label for="pwd">비밀번호</label>
            <input type="password" name="password" id="password" placeholder="Password" maxlength="15">
        </div>
        <div>
            <label for="pwdConfirm">비밀번호 확인</label>
            <input type="password" name="pwdConfirm" id="pwdConfirm" placeholder="Confirm Password" maxlength="15">
        </div>
        <div>
            <label for="name">이름</label>
            <input type="text" name="name" id="userName" placeholder="Name" maxlength="8">
        </div>
        <div>
            <label for="addr">주소</label>
            <input type="text" name="address" id="address" placeholder="Address" maxlength="64">
        </div>
        <div>
            <label for="tel">전화번호</label>
            <input type="text" name="tel" id="tel" placeholder="Tel" maxlength="16">
        </div>
        <div>
            <label for="email">이메일</label>
            <input type="email" name="email" id="email" placeholder="Email" maxlength="32">
        </div>
        <button id="signupBtn">회원가입</button>
    </form>
    
    <!-- jQuery -->
    <script src="re/js/jquery.js" type="text/javascript"></script>
    
    <script src="re/js/signup.js" type="text/javascript"></script>
    </body>
</html>