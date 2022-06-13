<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<!-- Load bootstrap css -->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
	<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
	<link rel="stylesheet" href="/re/css/common.css">
	<link rel="stylesheet" href="/re/css/member/member.css">
	<link rel="stylesheet" href="/re/css/member/modal.css">
</head>
<body>
	<jsp:include page="/WEB-INF/views/common/header.jsp"></jsp:include>
	<!-- member.js에서 React를 이용하여 아래의 div에 페이지를 render -->
	<div id="app"></div>
	<jsp:include page="/WEB-INF/views/common/footer.jsp"></jsp:include>
</body>
	<!-- Load bootstrap js -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
	<!-- React cdn -->
	<jsp:include page="/WEB-INF/views/common/react.jsp"></jsp:include>
     <!-- Daum 우편번호 서비스 CDN-->
	<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
	<!-- Daum 우편번호 서비스 함수 파일-->
    <script type="text/babel" src="/re/js/daumPostCode.js"></script>
	<!-- React components -->
    <script type="text/babel" src="/re/js/member/modal/infoModal.js"></script>
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