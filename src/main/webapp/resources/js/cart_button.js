$(function(){
	$('#cart-btn').click(() => {
		
		// 회원이 로그인한 경우에는 장바구니에 담는다
		if(user.userId){
			cart_ajax(function(){
				showMsg("#cartMsg");
			});	
		}
		else{
			// 로그인 하지 않은 경우에는 주의 메세지를 보여준다
			alert('로그인이 필요합니다.');
		}
	});

	$("#order-btn").click(() => {
		const pcode = $('#item').data('code');
		const amount = $('#amount').val();
		
		location.href = `/orders/payment?pcode=${pcode}&amount=${amount}`;
	});
});

function cart_ajax(callback) {
	const code = $('#item').data('code');
	const amount = $('#item #amount').val();

	const formData = new FormData();
	formData.append('pcode', code);
	formData.append('amount', amount);

	$.ajax("/rest/cart", {
		method:'post',
		data: formData,
		cache:false,
		contentType:false,
		processData:false,
		success:function(result){
			console.log(result.msg);
			
			callback();
		},
		error:function(xhr, status, err){
			console.log(`error ${xhr.status} : ${xhr.responseText}`);
		}
	});
}

function showMsg(target) {
	$(target).fadeIn(300);
		setTimeout(() => {
			$(target).fadeOut(300);
		}, 2800)
}