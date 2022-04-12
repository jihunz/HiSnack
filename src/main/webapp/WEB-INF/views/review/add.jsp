<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html>
<head>
	<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
	<link rel="stylesheet" href="/re/css/review.css" />
	 <script src="/re/js/review_add.js"></script>
</head>
<body>	
	<jsp:include page="/WEB-INF/views/common/header.jsp"></jsp:include>
	<form method="post" enctype="multipart/form-data" class="review-form">
		<input type="hidden" name="id" value="${user.id}"/>
		<h1 class="text-center pt-20 pb-10 px-40 font-weight-bold">리뷰 작성</h1>
		<div class="flex justify-between item-center pt-10 pb-50 px-40">
			<h2 class="font-size-large font-weight-normal">추천과자 랜덤 구독 서비스</h2>
			<span class="font-size-large font-weight-bold font-red"><fmt:formatNumber pattern="###,###,###원" value="${sub.total}"/></span>
		</div>
		<div class="input-wrapper">
			<div class="flex justify-between item-baseline py-10">
				<div class="rating">
					<select name="rating" class="rating-select">
						<option value="0.5" selected>0.5</option>
						<option value="1">1</option>
						<option value="1.5">1.5</option>
						<option value="2">2</option>
						<option value="2.5">2.5</option>
						<option value="3">3</option>
						<option value="3.5">3.5</option>
						<option value="4">4</option>
						<option value="4.5">4.5</option>
						<option value="5">5</option>
					</select>
					<div class="flex item-center">
						<p class="pr-10 font-size-medium font-weight-normal">별점 </p>
						<div class="flex">
							<span class="star-half big"></span>
							<span class="star-empty big"></span>
							<span class="star-empty big"></span>
							<span class="star-empty big"></span>
							<span class="star-empty big"></span>
						</div>
					</div>
				</div>
				<div class="text-right"><input type="file" name="image" id="image" multiple/><label for="image">사진 등록</label></div>
			</div>
			<div class="text-center py-15">
				<textarea class="contents" name="contents" placeholder="리뷰에 관한 이야기를 작성해주세요" required></textarea>
			</div>
			<div class="text-right">
				<button class="btn black round px-40 font-size-small" id="review-submit">리뷰 작성</button>
			</div>
		</div>
	</form>
	<jsp:include page="/WEB-INF/views/common/footer.jsp"></jsp:include>
</body>
</html>