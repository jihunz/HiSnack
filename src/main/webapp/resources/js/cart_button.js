$(function(){
	$('#cart-btn').click(() => {
		cart_ajax(function(){
			showMsg("#cartMsg");
		});
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