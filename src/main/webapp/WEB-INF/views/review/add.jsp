<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>리뷰 등록</title>
</head>
<body>
	<form method="post" enctype="multipart/form-data">
		<div><input type="text" name="id"/></div>
		<div><input type="text" name="contents"/></div>
		<div><input type="number" name="rating"/></div>
		<div><input type="file" name="image"/></div>
		<div><input type="file" name="image"/></div>
		<button>보내기</button>
	</form>
</body>
</html>