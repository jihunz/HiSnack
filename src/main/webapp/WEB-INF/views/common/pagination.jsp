<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<ul class="flex justify-center pb-30 pt-20">
	<c:if test="${pager.page != 1}">
		<li><a class="px-10" href="?page=${pager.prev}&${pager.query}">이전</a></li>
	</c:if>
	<c:forEach items="${pager.list}" var="page">
		<li><a
			class="block p-10 ${pager.page == page ? 'curr-page' : ''}"
			href="?page=${page}&${pager.query}">${page}</a></li>
	</c:forEach>
	<c:if test="${pager.page != pager.end}">
		<li><a class="px-10" href="?page=${pager.next}&${pager.query}">다음</a></li>
	</c:if>
</ul>