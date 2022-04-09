<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
</head>
<body>
	<div>
		<jsp:include page="/WEB-INF/views/common/header.jsp"></jsp:include>
		<div>
			<form>
				<div>
					<label><input type="radio" name="option" value="0" ${pager.option == 0 ? 'checked' : ''}/>없음</label>
					<label><input type="radio" name="option" value="1" ${pager.option == 1 ? 'checked' : ''}/>1000원 이하</label>
					<label><input type="radio" name="option" value="2" ${pager.option == 2 ? 'checked' : ''}/>2000원 이하</label>
					<label><input type="radio" name="option" value="3" ${pager.option == 3 ? 'checked' : ''}/>3000원 이하</label>
					<label><input type="radio" name="option" value="4" ${pager.option == 4 ? 'checked' : ''}/>3000원 이상</label>
					<label><input type="radio" name="option" value="5" ${pager.option == 5 ? 'checked' : ''}/>4000원 이상</label>
				</div>
				<div>
					<input type="hidden" name="search" value="2">
					<input type="text" name="keyword" value="${pager.keyword}">
					<button>검색</button>
				</div>
				<div>
					<select name="order">
						<option value="1" ${pager.order == 1 ? 'selected' : ''}>가격낮은순</option>
						<option value="2" ${pager.order == 2 ? 'selected' : ''}>가격높은순</option>
					</select>
				</div>
			</form>
		</div>
		<c:forEach items="${list}" var="item">
			<div>
				<p>번호 : ${item.code}</p>
				<p>이름 : ${item.name}</p>
				<p>가격 : ${item.price}</p>
				<p>제조사 : ${item.manufacture}</p>
				
				<c:forEach items="${item.images}" var="image">
					<div>
						<a href="${item.code}"><img src="${image.fullpath}" alt="${image.filename}" /></a>
					</div>
				</c:forEach>
			</div>
		</c:forEach>	
	<jsp:include page="/WEB-INF/views/common/footer.jsp"></jsp:include>
	</div>
</body>
</html>