$(function(){
	// 선택한 값에 따라 이미지를 변환
	$('#total').change(function(){
		const total = $('#total').val();
		const wrapper = $('#sub-box-img-wrapper');
		
		if(total <= 30000){
			// 소
			wrapper.css({
				transform:'translate(0px, 0px)'
			});
		}
		else if(total <= 60000){
			// 중
			wrapper.css({
				transform:'translate(-600px, 0px)'
			});
		}
		else{
			// 대
			wrapper.css({
				transform:'translate(-1200px, 0px)'
			});
		}
	});
});