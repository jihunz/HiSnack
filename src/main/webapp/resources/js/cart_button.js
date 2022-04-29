$(function(){
	$('#cart-btn').click(() => {
		cart_ajax("cart");
	});

	$("a[href='/orders/cart'").click(() => {
		cart_ajax();
	});
});

function cart_ajax(type) {
	const code = $('#item').data('code');
	const amount = $('#item input[type="number"]').val();

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
			
			if(type == "cart") alert("상품이 추가 되었습니다");
		},
		error:function(xhr, status, err){
			console.log(`error ${xhr.status} : ${xhr.responseText}`);
		}
	});
}