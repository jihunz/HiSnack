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
	<link rel="stylesheet" href="https://unpkg.com/swiper@8/swiper-bundle.min.css"/>
	<script src="https://unpkg.com/swiper@8/swiper-bundle.min.js"></script>
	<script>
		$(function(){
			const swiper = new Swiper('.swiper', {
			  // Optional parameters
				slidesPerView: 1,
				// If we need pagination
				pagination: {
				  el: '.swiper-pagination',
				},
				
				// Navigation arrows
				navigation: {
				  nextEl: '.swiper-button-next',
				  prevEl: '.swiper-button-prev',
				},
			});
		});
	</script>
</head>
<body>
	<jsp:include page="/WEB-INF/views/common/header.jsp"></jsp:include>
	<div class="review-form">
		<span class="date"><fmt:formatDate value="${item.regDate}" pattern="yyyy-MM-dd"/></span>
		<h1 class="text-center pt-20 pb-10 px-40 font-weight-bold">리뷰</h1>
		<div class="flex justify-between item-center pt-10 pb-50 px-40">
			<h2 class="font-size-large font-weight-normal">추천과자 랜덤 구독 서비스</h2>
			<span class="font-size-large font-weight-bold font-red"><fmt:formatNumber pattern="###,###,###원" value="${item.price}"/></span>
		</div>
		<!-- Slider main container -->
		<div class="swiper">
		  <!-- Additional required wrapper -->
		  <div class="swiper-wrapper">
		    <!-- Slides -->
	    	<c:forEach items="${item.images}" var="image">
	    		<div class="swiper-slide">
	    			<img class="review-item-img" src="${image.fullpath}" alt="${image.filename}" />
	    		</div>
	    	</c:forEach>
		  </div>
		  <!-- If we need pagination -->
		  <div class="swiper-pagination"></div>
		
		  <!-- If we need navigation buttons -->
		  <div class="swiper-button-prev"></div>
		  <div class="swiper-button-next"></div>
		</div>
		<div class="input-wrapper">
			<div class="flex justify-between item-center">
				<div class="flex item-center py-10">
					<p class="pr-10 font-size-medium font-weight-normal">별점</p>
					<div class="rating flex justify-center" data-rating="${item.rating}"></div>
				</div>
				<div>
					<span class="font-size-xsmall font-gray">${item.maskname}</span>
				</div>
			</div>
			<div class="py-15">
				<div class="review-item-contents">${item.contents}</div>
			</div>
			<c:choose>
				 <c:when test="${item.id == sessionScope.user.id}">
					 <div class="flex justify-between item-center">
					 	<div>
					 		<a class="btn small round green" href="update/${item.code}">수정</a>
					 		<a class="btn small round red" href="delete/${item.code}">삭제</a>
					 	</div>
						<a class="btn small round gray" href="list">돌아가기</a>
					 </div>
				 </c:when>
				 <c:otherwise>
					<div class="text-right">
						<a class="btn small round gray" href="list">돌아가기</a>
					</div>				 
				 </c:otherwise>
			</c:choose>
		</div>
	</div>
	<jsp:include page="/WEB-INF/views/common/footer.jsp"></jsp:include>
</body>
</html>