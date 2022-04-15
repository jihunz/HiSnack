<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
	<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
	<link rel="stylesheet" href="/re/css/review.css" />
	<script src="/re/js/review_rating.js"></script>
</head>
<body>
	<jsp:include page="/WEB-INF/views/common/header.jsp"></jsp:include>
	<div class="review-form">
		<h1 class="text-center pt-20 pb-10 px-40 font-weight-bold">리뷰</h1>
		<div class="flex justify-between item-center pt-10 pb-50 px-40">
			<h2 class="font-size-large font-weight-normal">추천과자 랜덤 구독 서비스</h2>
			<span class="font-size-large font-weight-bold font-red"><fmt:formatNumber pattern="###,###,###원" value="${item.price}"/></span>
		</div>
		<div class="input-wrapper">
			<div class="flex item-center py-10">
				<p class="pr-10 font-size-medium font-weight-normal">별점</p>
				<div class="rating flex justify-center" data-rating="${item.rating}"></div>
			</div>
			<div class="py-15">
				<div class="review-item-contents">${item.contents}</div>
			</div>
			<div class="text-right">
				<a class="btn small round gray" href="list">돌아가기</a>
			</div>
		</div>
	</div>
	<jsp:include page="/WEB-INF/views/common/footer.jsp"></jsp:include>
</body>
</html>