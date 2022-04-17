<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Hi Snack!</title>
<!-- Load bootstrap css -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<link rel="stylesheet" href="/re/css/common.css">
<link rel="stylesheet" href="/re/css/admin/admin.css">
<link rel="stylesheet" href="/re/css/admin/modal.css">
</head>
<body>
	<!-- admin.js에서 React를 이용하여 아래의 div에 페이지를 render -->
    <div id="app"></div>

    <!-- Load React, React-dom -->
    <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
	<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <!-- Load Babel -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <!-- Load bootstrap js -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <!-- React components -->
    <script type="text/babel" src="/re/js/admin/modals/infoModal.js"></script>
    <script type="text/babel" src="/re/js/admin/modals/addModal.js"></script>
    <script type="text/babel" src="/re/js/admin/modals/updateModal.js"></script>
    <script type="text/babel" src="/re/js/admin/section/pagenation.js"></script>
    <script type="text/babel" src="/re/js/admin/section/thead.js"></script>
    <script type="text/babel" src="/re/js/admin/section/tbody.js"></script>
    <script type="text/babel" src="/re/js/admin/section/table.js"></script>
    <script type="text/babel" src="/re/js/admin/section/section.js"></script>
    <script type="text/babel" src="/re/js/admin/sidebar/sidebar.js"></script>
    <script type="text/babel" src="/re/js/admin/dashboard.js"></script>
</body>
</html>