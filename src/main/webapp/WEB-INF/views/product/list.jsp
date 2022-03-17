<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>제품 목록</title>
</head>
<body>
	<c:forEach items="${list}" var="item">
		<div>
			<p>번호 : ${item.code}</p>
			<p>이름 : ${item.name}</p>
			<p>가격 : ${item.price}</p>
			<p>제조사 : ${item.manufacture}</p>
			<p>
				<c:forEach items="${item.tags}" var="tag">
					${tag.content}, 
				</c:forEach>
			</p>
			
			<c:forEach items="${item.images}" var="image">
				<div>
					<img src="/upload/${image.fullfilename}" alt="${image.filename}" />
				</div>
			</c:forEach>
			<p>
				<a href="update?code=${item.code}">수정</a>
				<a href="delete?code=${item.code}">삭제</a>
			</p>
		</div>
	</c:forEach>
	
	<div>
		<a href="add">등록</a>
	</div>
</body>
</html>