<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
<head>
<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
<!-- Swiper CSS -->
<link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css"/>
<!-- Swiper JS -->
<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
<!-- bootstrap css -->
<!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"> -->
<!-- bootstrap js -->
<!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script> -->
<link rel="stylesheet" href="/re/css/review.css">

<script> const path = '/review';</script>
<script src="/re/js/block_link.js"></script>

<script src="/re/js/index.js"></script>
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
		
		<div class = "middle-box img-border middle-img flex">
			<div class = "flex items-center text-center ">
				<h3 class = "reviewfont-size">소소하지만 달콤한 행복<br>편리 간단하게 구독</h3>
			</div>
		</div>

		<div class="review wrapper">
			<div class = "flex items-center justify-center">
				<div class = "review-box flex items-center justify-center column mt-120">
					<div class = "img-border loudspeakersize margin-bottom20">
						<img alt="" src="/re/img/loudspeaker.png">
					</div>
					<div class = "">
						<p class = "reviewcontent-size">"고객님들의 달콤한 후기"</p>
					</div>
					<div class = "">
						<h2 class = "reviewfont-size">달콤한 후기</h2>
					</div>
				</div>
			</div>
			<div class = "flex justify-center">
				<div class = "flex plussize plusflex font-size-laguler font-weight-medium items-center">
					<a class= "lightcolor" href="review/list">더보기</a>
				</div>
			</div>
			<!-- Swiper -->
			<%-- <div class="review-size swiper">

					<div class="flex pb-55 wrap px-10 swiper-wrapper">
					<c:forEach items="${list}" var="item">
					<div class="swiper-slide">
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
						</div>
					</c:forEach>
					</div>
					
				
				<div class="swiper-button-next"></div>
				<div class="swiper-button-prev"></div>
				<div class="swiper-pagination"></div>
			</div> --%>
			<div class = "mb-120">
				<div class = "review-div">
					<div class = "swiper mySwiper review-size flex">
						<c:forEach items="${list}" var="item" varStatus="status" begin="0" end="8">
							<div class = "swiper-wrapper flex">
								<div class = "swiper-slide">
									<div class="review-item block-link" data-code="${item.code}">
										<div class="review-img-border">
											<img src="${item.thumbnail}" alt="${item.images.get(0).filename}" />
										</div>
										<div class="p-5">
											<div class="rating" data-rating="${item.rating}"></div>
											<p class="contents">${item.contents}</p>
											<div class="info">
												<span>${item.maskname}</span>
												<span><fmt:formatDate value="${item.regDate}" pattern="yyyy-MM-dd"/></span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</c:forEach>
						<div class="swiper-button-next"></div>
						<div class="swiper-button-prev"></div>	
						<!-- <div class = "flex items-center justify-center">
							
						</div> -->
					</div>
					
				</div>
			</div>
			<span><img src="" alt=""></span>
		
		</div>
		<jsp:include page="/WEB-INF/views/common/footer.jsp"></jsp:include>
	</div>

	

</body>
</html>
