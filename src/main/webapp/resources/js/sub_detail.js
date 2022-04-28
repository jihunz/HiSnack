$(function(){
	changePrice();

	// total이 바뀔 때 마다 price에 값을 넣어줌
	$('#total').change(function(){
		changePrice();
	});
})

function changePrice(){
	// total에 있는 값을 가져옴
	let total = parseInt($('#total').val());
	// price에 값을 넣어줌
	$('#price').text(total.toLocaleString('ko-KR')+'원');
}