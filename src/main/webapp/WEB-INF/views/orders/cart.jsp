<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html>
<head>
	<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
	<link rel="stylesheet" href="/re/css/cart.css" />
	<script src="/re/js/cart.js"></script>
</head>
<body class="back-light-gray">
	<jsp:include page="/WEB-INF/views/common/header.jsp"></jsp:include>
	<div class="back-white">
		<div class="flex justify-between item-center pb-30 pt-50 wrapper">
			<h1 class="font-title">장바구니</h1>
			<div class="img-border cart-icon">
				<img src="/re/img/cart.svg"/>
			</div>
		</div>
	</div>
	<div class="cart-wrapper">
		<table class="wrapper cart-table">
			<thead>
				<tr>
					<th class="cart-cell"><input id="all-check" type="checkbox" /></th>
					<th class="cart-cell font-gray">전체선택</th>
					<th colspan="4"></th>
				</tr>
			</thead>
			<tbody>
				<tr id="empty-msg">
					<td class="py-15 text-center font-gray font-size-small" colspan="6">장바구니가 비어있습니다.</td>
				</tr>
				<c:forEach items="${list}" var="item">
					<tr class="px-40" data-pcode="${item.code}">
						<td class="cart-cell"><input type="checkbox" ${item.checked ? 'checked' : ''}/></td>
						<td class="cart-cell px-20">
							<div class="img-border cart-img">
								<img src="${item.thumbnail}" />
							</div>
						</td>
						<td class="px-60 cart-name">${item.name}</td>
						<td class="text-center">
							<div class="flex justify-center item-center">
								<button class="cart-btn amount-minus"></button>
								<input class="text-center cart-amount mx-10" type="number" min="0" max="99" value="${item.amount}"/>
								<button class="cart-btn amount-plus"></button>
							</div>
						</td>
						<td class="cart-price px-50">
							<fmt:formatNumber value="${item.price}" pattern="###,###,###원"/>
						</td>
						<td class="cart-cell relative"><button class="pos-center delete-btn"></button></td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
		<div class="flex justify-right py-40 wrapper">
			<div class="cart-info">
				<div>
					<span class="font-size-xsmall font-gray">상품 개수</span>
					<span id="count" class="font-size-large font-weight-normal">${count}개</span>
				</div>
				<div>
					<span class="font-size-xsmall font-gray">상품 금액</span>
					<span id="total" class="font-size-large font-weight-normal">
						<fmt:formatNumber value="${total}" pattern="###,###,###원"/>
					</span>
				</div>
				<div>
					<a class="btn black large round font-size-large font-weight-laguler py-10 px-60" href="/orders/payment">구매하기</a>
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="/WEB-INF/views/common/footer.jsp"></jsp:include>
</body>
</html>