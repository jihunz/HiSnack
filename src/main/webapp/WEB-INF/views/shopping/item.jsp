<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>

<link rel="stylesheet" href="/re/css/cart.css">
<link rel="stylesheet" href="/re/css/item.css">
<script src="/re/js/cart_button.js"></script>
<script src="/re/js/shopping_item.js"></script>
<link rel="stylesheet" href="https://unpkg.com/swiper@8/swiper-bundle.min.css"/>
	<script src="https://unpkg.com/swiper@8/swiper-bundle.min.js"></script>
	<script>
		$(function(){
			const swiper = new Swiper('.swiper', {
			  // Optional parameters
				slidesPerView: 1,
			});
		});
	</script>
</head>
<body>
<div class = "container">
	<jsp:include page="/WEB-INF/views/common/header.jsp"></jsp:include>
	<div class = "wrapper mb-60">
		<div class = "flex column" id="item" data-code="${item.code}" data-price="${item.price}">
			<div class = "my-50"><h1 class = "productfont">제품 상세</h1></div>
			<div class = "flex justify-between">
				<div class = "swiper">
						<div class="swiper-wrapper">
							<c:forEach items="${item.images}" var="image">
								<div class="swiper-slide">
									<div class = "subbox img-border">
										<img src="${image.fullpath}" alt="${image.filename}" />
									</div>
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
					    <div id="cartMsg">장바구니에 상품이 담겼습니다.<a href="/orders/cart">장바구니로 가기</a></div>
						
						<div class = "flex mt-20 flex-end">
							<p class = "subpricetext mr-20">개수</p>
							<button class="cart-btn amount-minus"></button>
							<input id="amount" type="number" value="1"/>
							<button class="cart-btn amount-plus"></button>
						</div>
						
						<hr class = "hrstyle mt-20">
						<div class = "flex justify-between m-10 item-center">
							<p class = "subprice">결제 금액</p>
							<p id="price" class = "pricefont font-weight-bold"><fmt:formatNumber value="${item.price}" pattern="###,###,###원"/></p>
						</div>
						
						<div class = "my-30 flex justify-between">
							<button id="cart-btn" class = "cartbtn">장바구니</button>
							<div><button id="order-btn" class = "paybtn">바로 구매</button></div>
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