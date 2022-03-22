<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="google-signin-client_id" content="154631232160-ms9nmt9aggc9dgl6625fb0dij3sdhsb2.apps.googleusercontent.com">
<!-- jQuery -->
<script src="re/js/jquery.js"></script>
<!-- Google Platform 라이브러리 -->
<script src="https://apis.google.com/js/platform.js" async defer></script>
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
    </form>
    <div>
        <a href="signup">회원가입</a>
        <a href="../">아이디 찾기</a>
        <a href="../">비밀번호 찾기</a>
    </div>
    <div id="googleBtn" class="g-signin2" ></div>
</body>