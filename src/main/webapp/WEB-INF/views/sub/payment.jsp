<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html>
<head>
	<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
	<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
	<script src="/re/js/daumPostCode.js" type="text/javascript"></script>
	<script src="/re/js/payment.js"></script>
	
	<script>
		$(function(){
			$('#address-btn').click(function(){
				execDaumPostcode();
			});
		});
	</script>
	
	<link rel="stylesheet" href="/re/css/payment.css" />
</head>
<body>
	<jsp:include page="/WEB-INF/views/common/header.jsp"></jsp:include>
	<div>
		<div class="flex justify-between item-center pb-30 pt-50 wrapper">
			<h1 class="font-title">상품 결제</h1>
			<div class="img-border cart-icon">
				<img src="/re/img/cart.svg"/>
			</div>
		</div>
	</div>
	<div id="payment-wrapper" class="py-60">
		<div class="wrapper flex justify-between">
			<article>
				<section class="mb-20">
					<h2 class="pb-20">주문 상품</h2>
					<div class="sub-info">
						<div class="img-border sub-thumbnail">
							<c:choose>
								<c:when test="${sub.total <= 30000}">
									<img src="/re/img/subbox_1.png"/>
								</c:when>
								<c:when test="${sub.total <= 60000}">
									<img src="/re/img/subbox_2.png"/>
								</c:when>
								<c:otherwise>
									<img src="/re/img/subbox_3.png"/>
								</c:otherwise>
							</c:choose>
						</div>
						<div>
							<h2>사용자 추천 과자 구독박스</h2>
						</div>	
					</div>
				</section>
				
			</article>
			<article>
				<section>
					<h2 class="pb-20">배송지 정보</h2>
					<form method="post" class="payment-form">
						<input type="hidden" name="id" value="${user.id}"/>
						<div>
							<label>수령인</label>
							<input type="text" name="name"
							placeholder="이름을 입력 해주세요" value="${user.name}"/>
						</div>
						<div>
							<label>주소</label>
							<input type="text" class="address" id="address" name="address" value="${user.address}"/>
								<button id="address-btn" type="button">주소 찾기</button>
						</div>
						<div>
							<label>연락처</label>
							<input type="tel" name="tel" id="tel"
							placeholder="'-' 제외하고 입력해주세요" value="${user.tel}"/>
						</div>
						<div>
							<label>요청사항</label>
							<select id="request-select">
								<option value="0">
									직접입력
								</option>
								<option value="1" selected>
									배송 전에 연락 부탁드립니다.
								</option>
								<option value="2">
									경비실에 맡겨 주세요.
								</option>
								<option value="3">
									깨지기 쉬우니 조심히 다뤄주세요.
								</option>
							</select>
						</div>
						<div class="text-right">
							<input class="mb-20" id="request" type="hidden" name="request"/>
						</div>
						<div class="flex justify-between item-center py-10">
							<section class="flex justify-center text-center item-center ml-30">
								<div class="px-50">
									<span class="font-gray">상품 개수</span>
									<h2>1개</h2>
								</div>
								<div class="px-50">
									<span class="font-gray">상품금액</span>
									<h2><fmt:formatNumber value="${sub.total}" pattern="###,###,###원"/></h2>
								</div>
							</section>
							<button class="btn round black py-10 px-60 font-size-large">구매하기</button>
						</div>
					</form>
				</section>
			</article>
		</div>
	</div>
	<jsp:include page="/WEB-INF/views/common/footer.jsp"></jsp:include>
</body>
</html>