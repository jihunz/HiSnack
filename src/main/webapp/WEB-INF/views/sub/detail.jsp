<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>

<link rel="stylesheet" href="/re/css/detail.css">

<script src="/re/js/sub_detail.js"></script>
<script src="/re/js/sub_detail_slider.js"></script>

<title>구독 상세</title>
</head>
<body>
	<jsp:include page="/WEB-INF/views/common/header.jsp"></jsp:include>
	<div class = "container">
		<div class = "wrapper flex mt-60 justify-between item-center">
			<div class ="flex items-center subbox">
				<div id="sub-box-img-wrapper">
					<div>
						<img alt="" src="/re/img/subbox_1.png">
					</div>
					<div>
						<img alt="" src="/re/img/subbox_2.png">
					</div>
					<div>
						<img alt="" src="/re/img/subbox_3.png">
					</div>
				</div>
				
			</div>
			
			<div class = "subtextbox">
				<div>
					<h1 class = "subfont my-40">사용자 추천 과자 구독박스</h1>
					<p class = "textfont">사용자의 입맛대로 저희 알고리즘이 추천해주시는 과자를 랜덤으로 보내주는 서비스 입니다 구독하고 서비스를 이용해주시길 바랍니다.사용자의 입맛대로 저희 알고리즘이 추천해주시는 과자를 랜덤으로 보내주는 서비스 입니다 구독하고 서비스를 이용해주시길 바랍니다.사용자의 입맛대로 저희 알고리즘이 추천해주시는 과자를 랜덤으로 보내주는 서비스 입니다 구독하고 서비스를 이용해주시길 바랍니다.</p>
				</div>
				
				<hr class = "hrstyle mt-20">
				
				<form method="post">
					<div class = "flex flex-end m-20">
						<p class = "subpricetext mr-20">구독 가격</p>
						<select name="total" id="total" class = "selectbox">
							<option value="10000">10,000원</option>
							<option value="20000">20,000원</option>
							<option value="30000">30,000원</option>
							<option value="40000">40,000원</option>
							<option value="50000">50,000원</option>
							<option value="60000">60,000원</option>								
							<option value="70000">70,000원</option>
							<option value="80000">80,000원</option>
							<option value="90000">90,000원</option>	
						</select>
					</div>
					
					<hr class = "hrstyle ">
					
					<div class = "flex justify-between m-10 item-center">
						<p class = "subprice">결제금액</p>
						<p class = "pricefont font-weight-bold" id="price">50,000원</p>
					</div>
					
					<button class = "subbtn my-30">구독 하기</button>
				</form>
				
			</div>
			
		</div>
		<div class = "wrapper mt-120">
			<hr class = "hrop">
			<div class = "flex justify-center column items-center mb-250">
				<p class = "mt-15 subpricetext">구독 정보</p>
				<div class = "subtextline mb-20"></div>
				<div><img alt="" src="/re/img/subcontent.png"></div>
			</div>
		</div>
	</div>
	<jsp:include page="/WEB-INF/views/common/footer.jsp"></jsp:include>
</body>
</html>