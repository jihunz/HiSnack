$(function(){
	$('#cart-btn').click(function(){
		const code = $('#item').data('code');
		const amount = $('#item input[type="number"]').val();

		const formData = new FormData();
		formData.append('pcode', code);
		formData.append('amount', amount);

		$.ajax("/rest/cart", {
			method:'post',
			data:formData,
			cache:false,
			contentType:false,
			processData:false,
			success:function(result){
				console.log(result);
			},
			error:function(xhr, status, err){
				console.log(`error ${xhr.status} : ${xhr.responseText}`);
			}
		});
	});
});