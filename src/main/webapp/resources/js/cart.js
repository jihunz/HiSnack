$(function(){
	empty_msg_check();

	// 선택한 상품의 수량을 늘린다
	$('.amount-plus').click(function(){
		// pcode를 찾는다
		const pcode = $(this).closest('tr').data('pcode');

		const formData = new FormData();
		formData.append('type', 'increase');

		cart_ajax(pcode, formData, 'post', function(result){
			// 수량을 변경한다
			$(this).prev('.cart-amount').val(result.amount);
		}.bind(this));
	});

	// 선택한 상품의 수량을 줄인다
	$('.amount-minus').click(function(){
		// pcode를 찾는다
		const pcode = $(this).closest('tr').data('pcode');

		const formData = new FormData();
		formData.append('type', 'decrease');

		cart_ajax(pcode, formData, 'post', function(result){
			// 수량을 변경한다
			$(this).next('.cart-amount').val(result.amount);
		}.bind(this));
	});
	// 삭제를 누르면 삭제한다
	$('.delete-btn').click(function(){
		// pcode를 찾는다
		const pcode = $(this).closest('tr').data('pcode');

		cart_ajax(pcode, null, 'delete', function(result){
			// tr을 지운다
			$(`tr[data-pcode='${pcode}']`).remove();

			empty_msg_check();
		});
	});
	// 전체 선택 체크 박스
	$('#all-check').change(function(){
		// 현재 체크 상태를 알아오고
		const check = $('#all-check').is(':checked');
		
		const formData = new FormData();
		formData.append('check', check);

		cart_ajax('check', formData, 'post', function(result){
			// 다른 체크에게 반영한다
			$('tr[data-pcode] input:checkbox').prop('checked', check);
		});
	});

	// 하나씩 체크
	$('tr[data-pcode] input:checkbox').change(function(){
		const check = $(this).is(':checked');
		const pcode = $(this).closest('tr').data('pcode');

		const formData = new FormData();
		formData.append('check', check);

		cart_ajax(`check/${pcode}`, formData, 'post', function(result){

		});
	});
})

function cart_ajax(path, data, method, success){
	// ajax를 보낸다
	$.ajax(`/rest/cart/${path}`, {
		method:method,
		data,
		cache:false,
		contentType:false,
		processData:false,
		success:function(result){
			// 메시지를 출
			console.log(result.msg);

			// 성공 콜백 함수 실행
			success(result);
			// 총 가격을 변경
			$('#total').text(result.total.toLocaleString('ko-KR')+'원');
			$('#count').text(result.count+'개');
		},
		error:function(xhr, status, err){
			console.log(`error ${xhr.status} : ${xhr.responseText}`);
		}
	});
}

function empty_msg_check(){
	// 상품이 없을 경우 보여주는 요소 표시 체크
	const _tr = $('tr[data-pcode]');
	
	if(_tr.length > 0){
		$('#empty-msg').hide();
	}
	else{
		$('#empty-msg').show();
	}
}