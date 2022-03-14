<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>제품 등록</title>
</head>
<body>
	<form method="post" enctype="multipart/form-data">
		<div><input type="text" name="name"/></div>
		<div><input type="number" name="price"/></div>
		<div><input type="text" name="manufacture"/></div>
		<div><input type="file" name="image"/></div>
		<div><input type="file" name="image"/></div>
		<button>보내기</button>
	</form>
</body>
</html>