<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>주문 결제</title>
</head>
<body>
	<div>
		<h1>주문 결제</h1>
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
		<div>
			<form method="post">
				<input type="hidden" name="id" value="${user.id}"/>
				<div>
					<label>주소</label>
					<input type="text" name="address" value="${user.address}"/>
				</div>
				<div>
					<label>수령인</label>
					<input type="text" name="name" value="${user.name}"/>
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
	</div>
</body>
</html>