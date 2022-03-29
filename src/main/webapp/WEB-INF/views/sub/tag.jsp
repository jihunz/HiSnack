<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>태그 선택</title>
</head>
<body>
	<div>
		<h1>태그 선택</h1>
		<div>
			<form method="post">
				<c:forEach items="${list}" var="item">
					<label><input type="checkbox" value="${item.code}" name="code"/>${item.content}</label>
				</c:forEach>
				<button>다음</button>
			</form>
		</div>
	</div>
</body>
</html>