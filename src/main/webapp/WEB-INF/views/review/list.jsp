<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>리뷰 목록</title>
</head>
<body>
	<div>
		<h1>리뷰 목록</h1>
		<c:forEach items="${list}" var="item">
			<div>
				<p>작성자 : ${item.maskname}</p>
				<p>내용 : ${item.contents}</p>
				<p>작성일 : <fmt:formatDate value="${item.regDate}" pattern="yyyy-MM-dd hh:mm:ss"/></p>
				<p>평점 : ${item.rating}</p>
				<div>
					<a href="${item.code}">
						<img src="${item.thumbnail}" alt="${item.images.get(0).filename}" />
					</a>
				</div>
				<p>
					<a href="update/${item.code}">수정</a>
					<a href="delete/${item.code}">삭제</a>
				</p>
			</div>
		</c:forEach>
		
		<div>
			<a href="add">등록</a>
		</div>	
	</div>
</body>
</html>