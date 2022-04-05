<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>


<!-- index 페이지 css Link -->
<link rel="stylesheet" href="/re/css/index.css">  
  <!-- header 페이지 css Link -->
<link rel="stylesheet" href="/re/css/header.css">

<!-- sessionScope를 저장하기 위한 script 태그 -->
<script>
const user = {
	userId: `${sessionScope.user.id}`,
	grade: `${sessionScope.user.grade}`
};
</script>
<!-- jQuery -->
<script src="/re/js/jquery.js"></script>




<!-- index 페이지 js src -->
<script src="/re/js/index.js"></script>
<title>Hi Snack!</title>