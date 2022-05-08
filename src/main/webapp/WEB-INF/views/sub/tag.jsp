<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
	<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
	<link rel="stylesheet" href="/re/css/sub_tag_select.css" />
	
	<script src="/re/js/sub_tag_select.js"></script>
	
</head>
<body>
	<jsp:include page="/WEB-INF/views/common/header.jsp"></jsp:include>
	<div>
		<div class="flex justify-between item-center pb-30 pt-50 wrapper">
			<h1 class="font-title">태그 선택</h1>
			<div class="img-border cart-icon">
				<img src="/re/img/cart.svg"/>
			</div>
		</div>
		<div class="wrapper">
			<form method="post" id="tag_form">
				<div class="tag_wrapper">
					<c:forEach items="${list}" var="item">
						<div>
							<input id="${item.code}" type="checkbox" value="${item.code}" name="code"/>
							<label for="${item.code}">#${item.content}</label>
						</div>
					</c:forEach>
				</div>
				<div class="text-right">
					<button class="btn round black" id="next-btn">다음으로</button>
				</div>
			</form>
		</div>
	</div>
	<jsp:include page="/WEB-INF/views/common/footer.jsp"></jsp:include>
</body>
</html>