<%@ page language="java" contentType="text/html; charset=UTF-8" 
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
	<!-- Link Swiper's CSS -->
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css"/>
    <!-- index 페이지 css Link -->
    <link rel="stylesheet" href="re/css/index.css">    
    <title>Hi Snack!</title>
</head>
<body>
	<div class="container">

        <div class="header wrapper">
            <object data="re/img/logo.svg" type="image/svg+xml" id="hLogo"></object>
            <a href="sub/detail">구독</a>
            <a href="shopping/list">쇼핑몰</a>
            <a href="orders/cart">장바구니</a>
            <c:if test="${sessionScope.user != null}">
            	<a href=`member/${userId}`>마이페이지</a>
            </c:if>
            <a href="review/list">리뷰 목록</a>
            <c:if test="${sessionScope.user.grade == 1}">
            	<a href="admin">관리자 페이지</a>
            </c:if>
            <a href="cs">고객센터</a>
            <div id="loginBtn">
                <a href="login">로그인</a>
            </div>
        </div>

        <div class="sub wrapper">
            <h3>달콤한 구독 사이트<br>하이스낵</h3>
            <p>알고리즘이 찾아주는 간식 조합<br>알고리즘이 찾아주는 간식 조합<br>알고리즘이 찾아주는 간식 조합</p>
            <div id="subBtn">
                <a href="sub/detail">구독 시작하기</a>
            </div>
            <img src="" alt="sub-img">
        </div>

        <div class="sub-desc wrapper">
            <h3>1달에 한 번<br>선물 받는 느낌</h3>
            <p>알고리즘이 찾아주는 간식 조합<br>알고리즘이 찾아주는 간식 조합<br>알고리즘이 찾아주는 간식 조합</p>
            <img src="" alt="sub-desc-img">
        </div>

        <div class="shopping wrapper">
            <h3>달콤한 구독 사이트<br>쇼핑몰</h3>
            <p>알고리즘이 찾아주는 간식 조합<br>알고리즘이 찾아주는 간식 조합<br>알고리즘이 찾아주는 간식 조합</p>
            <div id="shopping-btn">
                <a href="shopping/list">쇼핑하러 가기</a>
            </div>
            <img src="" alt="shopping-img">
        </div>

        <div id="">
            <h3>소소하지만 달콤한 행복</h3>
            <h3>편리 간단하게 구독</h3>
        </div>

        <!-- 스와이퍼 내부에 사용자 별 날짜, 별점, 리뷰 내용, 닉네임 들어가야함 -->
        <div class="review wrapper">
            <h2>리뷰</h2>
            <a href="review/list">더보기</a>
            <!-- Swiper -->
            <div class="swiper mySwiper">
                <div class="swiper-wrapper">
                <div class="swiper-slide">Slide 1</div>  
                <!-- ${list.reg_date} -->
                <div class="swiper-slide">Slide 2</div>
                <div class="swiper-slide">Slide 3</div>
                <div class="swiper-slide">Slide 4</div>
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-pagination"></div>
            </div>
            <p>2022-10-10</p>
            <!-- ${list.reg_date} -->
            <span>
                <img src="" alt="rating">
                <p>5.0</p>
                <!-- ${list.rating} -->
            </span>
            <p>나한테 맞는 과자만 추천해주니까 너무 좋아요!</p>
            <!-- ${list.contents} -->
            <hr>
            <h4>회원 이름</h4>
            <!-- ${list.maskName} -->

        </div>
        <footer class="wrapper">
            <object data="re/img/logo2.svg" type="image/svg+xml" id="fLogo"></object>
            <h4>Team Members</h4>
            <p>장지훈 : jjh351@naver.com</p>
            <p>오종택 : tivmzk5@gmail.com</p>
            <p>이준제 : leejunje1002@gmail.com</p>
            <h4>Project</h4>
            <p>Demonstration Video</p>
            <img src="" alt="demoVidQr">
            <h4>Team Members Github</h4>
            <a href="https://github.com/jihunz" target="_blank"><img src="#" alt="github-jjh"><p>Jihun Jang</p></a>
            <a href="https://github.com/tivmzk" target="_blank"><img src="#" alt="github-ojt"><p>O Jong Taek</p></a>
            <a href="https://github.com/JJ001002" target="_blank"><img src="#" alt="github-ljj"><p>LeeJunJe</p></a>
            <div>
            	<p>COPYRIGHT 2022 BY HI SNACK TEAM. ALL RIGHTS RESERVED.</p>
            </div>
        </footer>
    </div>

    <!-- Swiper JS -->
    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
    <!-- index 페이지 js src -->
    <script src="re/js/index.js"></script>
</body>
</html>
