<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="re/css/admin.css">
<title>Hi Snack!</title>
</head>
<body>
	<!-- admin.js에서 React를 이용하여 아래의 div에 페이지를 render -->
    <div id="app"></div>

    <!-- Load React, React-dom -->
    <script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
    <!-- Load Babel -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="text/babel" src="re/js/admin.js"></script>
</body>
</html>