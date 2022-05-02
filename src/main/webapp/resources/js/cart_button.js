$(function(){
	$('#cart-btn').click(() => {
		cart_ajax(function(){
			alert('상품을 장바구니에 담았습니다');
		});
	});

	$("#order-btn").click(() => {
		cart_ajax(function(){
			location.href = "/orders/cart";
		});
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