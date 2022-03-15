<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>제품 수정</title>
</head>
<body>
	<form method="post" enctype="multipart/form-data">
		<input type="hidden" name="code" value="${item.code}"/>
		
		<c:forEach items="${item.images}" var="image">
			<div><img src="/upload/${image.fullfilename}" alt="" /></div>
		</c:forEach>
		
		<div><input type="text" name="name" value="${item.name}"/></div>
		<div><input type="number" name="price" value="${item.price}"/></div>
		<div><input type="text" name="manufacture" value="${item.manufacture}"/></div>
		<div><input type="file" name="image"/></div>
		<div><input type="file" name="image"/></div>
		<button>보내기</button>
	</form>
</body>
</html>