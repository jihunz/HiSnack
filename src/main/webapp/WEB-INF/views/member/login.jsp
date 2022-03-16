<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Hi Snack!</title>
</head>
<body>
	<h4>LOGIN</h4>
    <hr>
    <form method="GET" action="/rest/member" class="loginForm">
        <div>
            <input type="text" name="id" id="userId" placeholder="ID">
        </div>
        <div>
            <input type="password" name="password" id="password" placeholder="Password">
        </div>
        <button>로그인</button>
    </form>
    <div>
        <a href="/member/signup">회원가입</a>
        <a href="../">아이디 찾기</a>
        <a href="../">비밀번호 찾기</a>
    </div>
    <div class="socialBtn">Google 계정으로 로그인하기</div>
</body>
</html>