$(function(){
	// 상품 수량이 바뀌면 
	$('#item #amount').change(function(){
		boundAmount();
	});
	
	// 플러스 버튼이 눌리면
	$('.amount-plus').click(function(){
		// 수량을 추가
		changeAmount('+');
	});
	
	// 마이너스 버튼이 눌리면
	$('.amount-minus').click(function(){
		// 수량 감소
		changeAmount('-');
	});
});

function changeAmount(type){
	const amount = parseInt($('#item #amount').val());
	if(type === '+'){
		$('#item #amount').val(amount+1);
	}
	else if(type === '-'){
		$('#item #amount').val(amount-1);
	}
	
	boundAmount();
}

function boundAmount(){
	const amount = parseInt($('#item #amount').val());
	// 수량이 음수가 되는 걸 막음
	if(amount < 1){
		$('#item #amount').val(1);
		return;
	}
	// 수량에 따라 가격을 변동함
	const price = parseInt($('#item').data('price'));
	$('#item #price').text((amount * price).toLocaleString('ko-KR')+'원');
}