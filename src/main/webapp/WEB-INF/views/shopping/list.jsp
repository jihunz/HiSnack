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
	<div>
		<h1>쇼핑</h1>
		<c:forEach items="${list}" var="item">
			<div>
				<p>번호 : ${item.code}</p>
				<p>이름 : ${item.name}</p>
				<p>가격 : ${item.price}</p>
				<p>제조사 : ${item.manufacture}</p>
				
				<c:forEach items="${item.images}" var="image">
					<div>
						<a href="${item.code}"><img src="${image.fullpath}" alt="${image.filename}" /></a>
					</div>
				</c:forEach>
			</div>
		</c:forEach>	
	</div>
</body>
</html>