<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<!-- Swiper CSS -->
<link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css"/>
<!-- Swiper JS -->
<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
<!-- bootstrap css -->
<!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"> -->
<!-- bootstrap js -->
<!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script> -->
<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
</head>

<body>
	
	<div class="container">
	<jsp:include page="/WEB-INF/views/common/header.jsp"></jsp:include>
	
		<div class= "boxmaincolor flex justify-center">
			<div class="boxsize flex items-center">
				<div class = "flex justify-between" style ="width: 100%">
					<div class = "org40 flex justify-center column">
						<div class = "margin-bottom20"><h3 class = "maintext">달콤한 구독 사이트<br>하이스낵</h3></div>
						<div class = "margin-bottom20">
							<p class = "contentfont">알고리즘이 찾아주는 간식 조합
							<br>알고리즘이 찾아주는 간식 조합
							<br>알고리즘이 찾아주는 간식 조합</p>
						</div>
						<div class = "margin-top20">
							<a class = "mainBtn" href="sub/detail">구독 시작하기</a>
						</div>
					</div>
						<div class = "org60 flex items-center justify-center">
							<div class = "imgsize img-border"><img src="/re/img/box.png" alt="sub-img"></div>
						</div>
				</div>
			</div>
		</div>

		<div class="boxcolor flex justify-center">
			<div class="boxsize flex items-center justify-between">
				<div class = "flex justify-between" style ="width: 100%">
					<div class = "org60 flex">
						<div class = "imgsize img-border"><img src="/re/img/calendar.png" alt="sub-desc-img"></div>
					</div>
					<div class = "text-right org40 flex justify-center column"">
						<div class = "margin-bottom20"><h3 class = "maintext">1달에 한 번<br>선물 받는 느낌</h3></div>
						<div>
							<p class = "contentfont">알고리즘이 찾아주는 간식 조합
							<br>알고리즘이 찾아주는 간식 조합
							<br>알고리즘이 찾아주는 간식 조합</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class= "boxcolor flex justify-center">
			<div class="boxsize flex items-center">
				<div class = "flex justify-between" style ="width: 100%">
					<div class = "org40 flex justify-center column">
						<div class = "margin-bottom20"><h3 class = "maintext">달콤한 쇼핑 사이트<br>쇼핑몰</h3></div>
						<div class = "margin-bottom20">
							<p class = "contentfont">알고리즘이 찾아주는 간식 조합
							<br>알고리즘이 찾아주는 간식 조합
							<br>알고리즘이 찾아주는 간식 조합</p>
						</div>
						<div class = "margin-top20">
							<a class = "mainBtn" href="sub/detail">쇼핑 시작하기</a>
						</div>
					</div>
					<div class = "org60 flex items-center justify-center">
						<div class = "imgsize img-border"><img src="/re/img/box.png" alt="sub-img"></div>
					</div>
				</div>
			</div>
		</div>
		
		<div id="">
			<h3>소소하지만 달콤한 행복</h3>
			<h3>편리 간단하게 구독</h3>
		</div>

		<div class="review wrapper">
			<h2>리뷰</h2>
			<a href="review/list">더보기</a>
			<!-- Swiper -->
			<div class="swiper mySwiper">
				<div class="swiper-wrapper">
					<div class="swiper-slide">Slide 1</div>
					<!-- list.reg_date -->
					<div class="swiper-slide">Slide 2</div>
					<div class="swiper-slide">Slide 3</div>
					<div class="swiper-slide">Slide 4</div>
				</div>
				<div class="swiper-button-next"></div>
				<div class="swiper-button-prev"></div>
				<div class="swiper-pagination"></div>
			</div>
			<p>2022-10-10</p>
			<span> <img src="" alt="rating">
				<p>5.0</p>
			</span>
			<p>나한테 맞는 과자만 추천해주니까 너무 좋아요!</p>
			<hr>
			<h4>회원 이름</h4>

		</div>
		<jsp:include page="/WEB-INF/views/common/footer.jsp"></jsp:include>
	</div>

	

</body>
</html>
