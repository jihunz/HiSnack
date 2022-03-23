<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<!-- jQuery -->
<script src="re/js/jquery.js"></script>
<script src="re/js/google_login.js"></script>
<title>Hi Snack!</title>
</head>
<body>
	<h4>LOGIN</h4>
    <hr>
    <form method="post" action="login" class="loginForm">
        <div>
            <input type="text" name="id" id="userId" placeholder="ID">
        </div>
        <div>
            <input type="password" name="password" id="password" placeholder="Password">
        </div>
        <button>로그인</button>
        <!-- 추후 자동 로그인 구현 시 사용
        <div>
        	<input type="checkbox" name="autoLogin">자동 로그인
        </div> -->
    </form>
    <div>
        <a href="signup">회원가입</a>
        <a href="../">아이디 찾기</a>
        <a href="../">비밀번호 찾기</a>
    </div>
    <div id="googleBtn"><img src="#">Google 계정으로 로그인하기</div>
</body>