<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>리뷰 등록</title>
</head>
<body>
	<h1>리뷰 등록</h1>
	<form method="post" enctype="multipart/form-data">
		<input type="hidden" name="id" value="${user.id}"/>
		<div><input type="text" name="contents"/></div>
		<div><input type="number" name="rating"/></div>
		<div><input type="file" name="image"/></div>
		<div><input type="file" name="image"/></div>
		<button>확인</button>
	</form>
</body>
</html>