<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>제품 상세</title>
<script src="/re/js/jquery.js"></script>
<script src="/re/js/cart_button.js"></script>
</head>
<body>
	<div id="item" data-code="${item.code}">
		<c:forEach items="${item.images}" var="image">
			<div>
				<img src="${image.fullfilename}" alt="${image.filename}" />
			</div>
		</c:forEach>
		<p>번호 : ${item.code}</p>
		<p>이름 : ${item.name}</p>
		<p>가격 : ${item.price}</p>
		<p>제조사 : ${item.manufacture}</p>
		<div>
			<input type="number" />
			<button id="cart-btn">장바구니에 추가</button>
		</div>
		<div>
			<a href="/orders/cart">주문하기</a>
		</div>
	</div>
</body>
</html>