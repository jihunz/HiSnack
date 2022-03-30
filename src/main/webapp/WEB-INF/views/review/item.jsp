<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>리뷰 상세</title>
</head>
<body>
	<div>
		<h1>리뷰</h1>
		<p><fmt:formatDate value="${item.regDate}" pattern="yyyy년 mm월 dd일"/></p>
		<p>${item.maskname}</p>
		<div>
			<c:forEach items="${item.images}" var="image">
				<img src="${image.fullpath}" alt="${image.filename}" />
			</c:forEach>
		</div>
		<h3>${item.contents}</h3>
		<p>별점 : ${item.rating}</p>
	</div>
</body>
</html>