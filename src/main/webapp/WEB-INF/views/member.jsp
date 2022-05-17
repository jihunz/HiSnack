<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
	<link rel="stylesheet" href="/re/css/common.css">
	<link rel="stylesheet" href="/re/css/member.css">
</head>
<body>

		<jsp:include page="/WEB-INF/views/common/header.jsp"></jsp:include>
		<!-- member.js에서 React를 이용하여 아래의 div에 페이지를 render -->
		<div id="app"></div>
		<jsp:include page="/WEB-INF/views/common/footer.jsp"></jsp:include>
</body>
	<jsp:include page="/WEB-INF/views/common/react.jsp"></jsp:include>
     <!-- Daum 우편번호 서비스 CDN-->
	<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
	<!-- Daum 우편번호 서비스 함수 파일-->
    <script type="text/babel" src="/re/js/daumPostCode.js"></script>
	<!-- React components -->
    <script type="text/babel" src="/re/js/member/section/pagenation.js"></script>
    <script type="text/babel" src="/re/js/member/section/memberForm.js"></script>
    <script type="text/babel" src="/re/js/member/section/thead.js"></script>
    <script type="text/babel" src="/re/js/member/section/tbody.js"></script>
    <script type="text/babel" src="/re/js/member/section/table.js"></script>
    <script type="text/babel" src="/re/js/member/section/subInfo.js"></script>
    <script type="text/babel" src="/re/js/member/section/section.js"></script>
    <script type="text/babel" src="/re/js/member/sidebar/sidebar.js"></script>
    <script type="text/babel" src="/re/js/member/dashboard.js"></script>
</html>