<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>제품 수정</title>
	<script src="/re/js/jquery.js"></script>
	<script>
		if(!String.format){
			String.prototype.format = function() {
			    var formatted = this;
			    for( var arg in arguments ) {
			        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
			    }
			    return formatted;
			};	
		}
	
		let tags = [];
		$(function(){
			$('#add-tag-btn').click(function(e){
				e.preventDefault();
				
				const sel = $("<select name='tcode'>");
				for(tag of tags){
					sel.append('<option value="{0}">{1}</option>'.format(tag.code, tag.content));	
				}
				$('#tag-container').append(sel);
			});
			$.ajax('/rest/tag', {
				success:function(result){
					tags = result;
				},
				error:function(xhr, status, err){
					console.log(err);
				}
			});
		});
	</script>
</head>
<body>
	<form method="post" enctype="multipart/form-data">
		<input type="hidden" name="code" value="${item.code}"/>
		
		<c:forEach items="${item.images}" var="image">
			<div><img src="/upload/${image.fullfilename}" alt="" /></div>
		</c:forEach>
		
		<div><input type="text" name="name" value="${item.name}"/></div>
		<div><input type="number" name="price" value="${item.price}"/></div>
		<div><input type="text" name="manufacture" value="${item.manufacture}"/></div>
		<div><input type="file" name="image"/></div>
		<div><input type="file" name="image"/></div>
		<button id="add-tag-btn" type="button">태그 추가</button>
		<div id="tag-container">
			<c:forEach items="${item.tags}" var="tag">
				<select name="tcode">
					<c:forEach items="${tagList}" var="tagItem">
						<option value="${tagItem.code}" ${tag.tcode==tagItem.code ? 'selected' : ''}>${tagItem.content}</option>
					</c:forEach>
				</select>
			</c:forEach>
		</div>
		<button>보내기</button>
	</form>
</body>
</html>