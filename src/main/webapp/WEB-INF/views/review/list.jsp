<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
	<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
	<link rel="stylesheet" href="/re/css/review.css">
	<script>
		const path = '/review';
	</script>
	<script src="/re/js/block_link.js"></script>
	<script src="/re/js/review_rating.js"></script>
</head>
<body>
	<div>
		<jsp:include page="/WEB-INF/views/common/header.jsp"></jsp:include>
		<div class="review-list-visual"></div>
		
		<div class="review-container">
			<div class="text-center">
				<p class="font-logo font-size-small">"고객님들의 달콤한 후기"</p>
				<h1 class="pb-20 pt-25">달콤한 후기</h1>
				<div>
					<a class="btn black round small" href="add" >리뷰 쓰기</a>
				</div>
			</div>
			
			<div class="flex py-55 wrap px-10">
				<c:forEach items="${list}" var="item">
					<div class="review-item block-link" data-code="${item.code}">
						<div class="review-img-border">
							<img src="${item.thumbnail}" alt="${item.images.get(0).filename}" />
						</div>
						<div class="p-5">
							<div class="rating" data-rating="${item.rating}">
								
							</div>
							<p class="contents">${item.contents}</p>
							<div class="info">
								<span>${item.maskname}</span>
								<span><fmt:formatDate value="${item.regDate}" pattern="yyyy-MM-dd"/></span>
							</div>
						</div>
					</div>
				</c:forEach>
			</div>
			
			<jsp:include page="/WEB-INF/views/common/pagination.jsp"/>
		</div>
		<jsp:include page="/WEB-INF/views/common/footer.jsp"></jsp:include>
	</div>
</body>
</html>