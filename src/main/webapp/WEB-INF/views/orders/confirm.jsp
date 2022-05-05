<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
	
	<link rel="stylesheet" href="/re/css/orders_confirm.css" />
</head>
<body>
	<jsp:include page="/WEB-INF/views/common/header.jsp"></jsp:include>
	<div>
		<div class="flex justify-between item-center pb-30 pt-50 wrapper">
			<h1 class="font-title">결제 확인</h1>
			<div class="img-border cart-icon">
				<img src="/re/img/cart.svg"/>
			</div>
		</div>
	</div>
	<div class="confirm-wrapper">
		<div class="confirm-form">
			<p class="pt-60 pb-30 text-center">결제가 정상적으로 완료되었습니다</p>
			<div class="text-right">
				<a class="btn gray" href="/">돌아가기</a>
			</div>
		</div>
	</div>
	<jsp:include page="/WEB-INF/views/common/footer.jsp"></jsp:include>
</body>
</html>