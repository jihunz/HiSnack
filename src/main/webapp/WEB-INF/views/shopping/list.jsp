<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
	<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
	<link rel="stylesheet" href="/re/css/shopping.css" />
	<script>
		const path = '/shopping';
	</script>
	<script src="/re/js/block_link.js"></script>
</head>
<body>
	<div>
		<jsp:include page="/WEB-INF/views/common/header.jsp"></jsp:include>
		<div class="shopping-list-visual"></div>
		<div class="shopping-container">
			<form>
				<div class="py-25">
					<ul class="input-radio-wrapper">
						<li>가격대</li>
						<li>
							<label><input type="radio" name="option" value="0" 
							${pager.option == 0 ? 'checked' : ''}/> 전부</label>
						</li>
						<li>
							<label><input type="radio" name="option" value="1" 
							${pager.option == 1 ? 'checked' : ''}/> 1,000원 이하</label>
						</li>
						<li>
							<label><input type="radio" name="option" value="2" 
							${pager.option == 2 ? 'checked' : ''}/> 2,000원 이하</label>
						</li>
						<li>
							<label><input type="radio" name="option" value="3" 
							${pager.option == 3 ? 'checked' : ''}/> 3,000원 이하</label>
						</li>
						<li>
							<label><input type="radio" name="option" value="4" 
							${pager.option == 4 ? 'checked' : ''}/> 3,000원 이상</label>
						</li>
						<li>
							<label><input type="radio" name="option" value="5" 
							${pager.option == 5 ? 'checked' : ''}/> 4,000원 이상</label>
						</li>
					</ul>
				</div>
				<div class="py-25 flex justify-between item-center">
					<div class="flex item-center">
						<input type="hidden" name="search" value="2">
						<input class="input-search mr-20" type="text" name="keyword" placeholder="검색어를 입력해주세요" value="${pager.keyword}">
						<button class="search-btn"></button>
					</div>
					<select class="input-select" name="order">
						<option value="1" ${pager.order == 1 ? 'selected' : ''}>가격낮은순</option>
						<option value="2" ${pager.order == 2 ? 'selected' : ''}>가격높은순</option>
					</select>
				</div>
			</form>
			<div class="flex wrap">
				<c:forEach items="${list}" var="item">
					<div class="shopping-item mb-60 block-link" data-code="${item.code}">
						<div class="shopping-img-border">
							<img src="${item.thumbnail}" alt="${image.thumbnail}" />
						</div>
						<div class="info">
							<p class="manufacture py-5 px-5">${item.manufacture}</p>
							<div class="flex justify-between px-5">
								<span class="name">${item.name}</span>
								<span class="price"><fmt:formatNumber value="${item.price}" pattern="###,###,###원"/></span>
							</div>
						</div>
					</div>
				</c:forEach>
			</div>
			<ul class="flex justify-center pb-30 pt-20">
				<c:if test="${pager.page != 1}">
					<li><a class="px-10" href="?page=${pager.prev}&${pager.query}">이전</a></li>
				</c:if>
				<c:forEach items="${pager.list}" var="page">
					<li>
						<a class="block p-10 ${pager.page == page ? 'curr-page' : ''}" 
						href="?page=${page}&${pager.query}">${page}</a>
					</li>
				</c:forEach>
				<c:if test="${pager.page != pager.end}">
					<li><a class="px-10" href="?page=${pager.next}&${pager.query}">다음</a></li>
				</c:if>
			</ul>
		</div>
	<jsp:include page="/WEB-INF/views/common/footer.jsp"></jsp:include>
	</div>
</body>
</html>