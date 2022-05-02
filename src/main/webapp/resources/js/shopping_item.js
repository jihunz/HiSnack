$(function(){
	$('#item #amount').change(function(){
		const amount = parseInt($(this).val());
		
		if(amount < 1){
			$(this).val(1);
			return;
		}
		
		const price = parseInt($('#item').data('price'));
		$('#item #price').text((amount * price).toLocaleString('ko-KR')+'원');
	});
});