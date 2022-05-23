<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div class="headerstart ">
	<div class = "headercontent">
			<a href = "/"><div class = "logosize">
           		<img alt="" src="/re/img/logo.svg" id ="logoimgsize logoimg">
            </div></a>
            <div class = "menefont">
	            <a href="/sub/detail" class = "menupadding">구독</a>
	            <a href="/shopping/list" class = "menupadding">쇼핑몰</a>
	            <a href="/orders/cart" class = "menupadding">장바구니</a>
	            <a href="/review/list" class = "menupadding">리뷰</a>            
            </div>
          		<div id="user-menu" class= "menefont">
          			<c:choose>
          				<c:when test="${sessionScope.user == null}">
          					<a class= "btn" href = "/login">로그인</a>
          				</c:when>
          				<c:otherwise>
          					<span id="user-btn">${sessionScope.user.name} 님</span>
          				</c:otherwise>
          			</c:choose>
          			
                	<c:if test="${sessionScope.user != null}">
	                	<ul id="user-dropdown">
						    <li><a class="" href="/member">마이페이지</a></li>
						    <c:if test="${sessionScope.user.grade == 1}">
						    	<li><a class="" href="/admin">관리자</a></li>
						    </c:if>
						    <li><a class="" href="/logout">로그아웃</a></li>
					  	</ul>
                	</c:if>
                	
				</div>
	</div>
</div>