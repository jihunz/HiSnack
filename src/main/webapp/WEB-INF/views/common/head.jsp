<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<link rel="stylesheet" href="/re/css/common.css">
  <!-- header 페이지 css Link -->
<link rel="stylesheet" href="/re/css/header.css">
<!-- footer 페이지 css Link -->
<link rel="stylesheet" href="/re/css/footer.css">

<!-- sessionScope를 저장하기 위한 script 태그 -->
<script>
const user = {
	userId: `${sessionScope.user.id}`,
	grade: `${sessionScope.user.grade}`,
	name: `${sessionScope.user.name}`
};
</script>
<!-- jQuery -->
<script src="/re/js/jquery.js"></script>

<!-- index 페이지 js src -->
<script src="/re/js/header.js"></script>
<title>Hi Snack!</title>

<!-- 벡엔드에서 보내는 메시지를 받는 코드 -->
<script>
	window.onload = function(){
		const msg = `${err_msg}`;
		if(msg){
			alert(msg);
		}
	};
</script>