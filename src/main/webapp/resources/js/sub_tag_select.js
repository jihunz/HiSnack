$(function(){
	$('#next-btn').click(function(e){
		e.preventDefault();
		
		if($('input:checked').length){
			$('#tag_form')[0].submit();
		}
		else{
			alert('태그를 선택해주세요.');
		}
	});
});