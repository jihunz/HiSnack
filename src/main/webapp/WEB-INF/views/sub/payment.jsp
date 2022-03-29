<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>구독 결제</title>
</head>
<body>
	<div>
		<h1>구독 결제</h1>
		<p>총 가격 : ${sub.total}원</p>
		<form method="post">
			<input type="hidden" name="id" value="${user.id}"/>
			<div>
				<label>수령인</label>
				<input type="text" name="name" value="${user.name}"/>
			</div>
			<div>
				<label>주소</label>
				<input type="text" name="address" value="${user.address}"/>
			</div>
			<div>
				<label>전화번호</label>
				<input type="tel" name="tel" value="${user.tel}"/>
			</div>
			<div>
				<button>확인</button>
			</div>
		</form>
	</div>
</body>
</html>