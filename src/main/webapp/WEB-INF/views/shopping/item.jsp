<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>

<link rel="stylesheet" href="/re/css/item.css">

<title>제품 상세</title>
<script src="/re/js/jquery.js"></script>
<script src="/re/js/cart_button.js"></script>
</head>
<body>
<div class = "container">
	<jsp:include page="/WEB-INF/views/common/header.jsp"></jsp:include>
	<div class = "wrapper mb-60">
		<div class = "flex column" id="item" data-code="${item.code}">
			<div class = "my-50"><h1 class = "productfont">제품 상세</h1></div>
			<div class = "flex justify-between">
				<div class = "">
					<div >
						<c:forEach items="${item.images}" var="image">
							<div class = "subbox img-border">
								<img src="${image.fullpath}" alt="${image.filename}" />
							</div>
						</c:forEach>
					</div>
				</div>
				<div class = "flex items-center">
					<div class = "subtextbox">
						<div class = "mb-30">
							<p class = "mftfont">${item.manufacture}</p>
							<p class = "namefont">${item.name}</p>
						</div>
						<div>
							<p class = "textfont">${item.info}</p>
						</div>
						
						<hr class = "hrstyle mt-20">
						
						<div class = "flex mt-20 flex-end">
							<p class = "subpricetext mr-20">개수</p>
							<input type="number" />
						</div>
						
						<hr class = "hrstyle mt-20">
						<div class = "flex justify-between m-10 item-center">
							<p class = "subprice">결제 금액</p>
							<p class = "pricefont font-weight-bold">${item.price}</p>
						</div>
						
						<div class = "my-30 flex justify-between">
							<button id="cart-btn" class = "cartbtn">장바구니</button>
							<div><a href="/orders/cart" class = "paybtn">주문하기</a></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="/WEB-INF/views/common/footer.jsp"></jsp:include>
</div>
</body>
</html>