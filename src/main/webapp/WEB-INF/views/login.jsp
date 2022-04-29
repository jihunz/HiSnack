<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
<script src="re/js/google_login.js"></script>

<c:if test="${failMsg != null}">
	<script type="text/javascript">
		alert("${failMsg}")
	</script>
</c:if>

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
        <div>
        	<input type="checkbox" name="autoLogin">자동 로그인
        </div>
    </form>
    <div>
        <a href="signup">회원가입</a>
        <a href="../">아이디 찾기</a>
        <a href="../">비밀번호 찾기</a>
    </div>
    <div id="googleBtn"><img src="#">Google 계정으로 로그인하기</div>
</body>