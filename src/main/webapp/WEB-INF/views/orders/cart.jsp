<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>장바구니</title>
</head>
<body>
	<div>
		<div>
			<h1>장바구니</h1>
		</div>
		<div>
			<table>
				<thead>
					<tr>
						<th><input type="checkbox" /></th>
						<th>이미지</th>
						<th>상품명</th>
						<th>가격</th>
						<th>개수</th>
						<th>총 가격</th>
					</tr>
				</thead>
				<tbody>
					<c:forEach items="${list}" var="item">
						<tr>
							<td><input type="checkbox" /></td>
							<td><img src="${item.thumbnail}" alt="${item.images.get(0).filename}" /></td>
							<td>${item.name}</td>
							<td>${item.price}</td>
							<td>${item.amount}</td>
							<td>${item.price * item.amount}</td>
						</tr>
					</c:forEach>
				</tbody>
				<tfoot>
					<tr>
						<td colspan="6">총 가격 : ${total}</td>
					</tr>
				</tfoot>
			</table>
		</div>
		<div><a href="/orders/payment">결제하기</a></div>
	</div>
</body>
</html>