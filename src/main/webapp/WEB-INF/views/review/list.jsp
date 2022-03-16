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
<%-- git branch 생성 시험중 --%>
	<c:forEach items="${list}" var="item">
		<div>
			<p>번호 : ${item.code}</p>
			<p>작성자 : ${item.id}</p>
			<p>내용 : ${item.contents}</p>
			<p>작성일 : <fmt:formatDate value="${item.regDate}" pattern="yyyy-MM-dd hh:mm:ss"/></p>
			<p>평점 : ${item.rating}</p>
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