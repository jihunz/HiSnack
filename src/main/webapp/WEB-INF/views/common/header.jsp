<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div class="headerstart ">
	<div class = "headercontent">
			<div>
           		<img alt="" src="/re/img/logo.svg" id ="logoimgsize">
            </div>
            <div>
	            <a href="sub/detail">구독</a>
	            <a href="shopping/list">쇼핑몰</a>
	            <a href="orders/cart">장바구니</a>
	            <a href="review/list">리뷰 목록</a>            
	            <a href="cs">고객센터</a>
            </div>
          		<div class="dropdown">
                	<button class="btn btn-warning" id="loginBtn" onclick="location.href='login'" data-bs-toggle="dropdown" aria-expanded="false">로그인</button>
                	<ul class="dropdown-menu dropdown-menu-end" id="dropdown" aria-labelledby="dropdownMenuButton1">
					    <li><a class="dropdown-item" href="member/${sessionScope.user.id}">마이페이지</a></li>
					    <c:if test="${sessionScope.user.grade == 1}">
					    	<li><a class="dropdown-item" href="admin">관리자</a></li>
					    </c:if>
					    <li><a class="dropdown-item" href="logout">로그아웃</a></li>
				  	</ul>
				</div>
	</div>
</div>