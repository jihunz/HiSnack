<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
</head>
<body>
	<div class="container">
		<jsp:include page="/WEB-INF/views/common/header.jsp"></jsp:include>
		<!-- member.js에서 React를 이용하여 아래의 div에 페이지를 render -->
		<div id="app"></div>
		<jsp:include page="/WEB-INF/views/common/footer.jsp"></jsp:include>
	</div>
</body>
<jsp:include page="/WEB-INF/views/common/react.jsp"></jsp:include>
</html>