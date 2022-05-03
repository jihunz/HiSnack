$(function(){
	boundHeight('min');
	
	$('#request-select').change(function(){
		const value = $(this).val();
		const request = $('#request');
		
		// 직접 입력이 아니면 input을 보여주지 않는다
		if(value !== '0') {
			request.attr('type', 'hidden');
			boundHeight('min');
		}
		else {
			request.attr('type', 'text');
			boundHeight('max');
		}
		
		// value에 따라 들어가는 값이 달라진다
		switch(value){
			case '0':
				request.val('');
				request.attr('value', '');
				request.focus();
			break;
			case '1':
				request.val('배송 전에 연락 부탁드립니다.');
			break;
			case '2':
				request.val('경비실에 맡겨 주세요.');
			break;
			case '3':
				request.val('깨지기 쉬우니 조심히 다뤄주세요.');
			break;
		}
		
		
	});
});

function boundHeight(type){
	//　두 section의 크기를 같게 한다
	const sections = $('#payment-wrapper article > section');
	let h = 0;
	
	sections.css('height', '');
	
	if(type === 'min'){
		if(sections[0].offsetHeight < sections[1].offsetHeight){
			h = sections[0].offsetHeight;
		}
		else{
			h = sections[1].offsetHeight;
		}
	}
	else if(type === 'max'){
		if(sections[0].offsetHeight > sections[1].offsetHeight){
			h = sections[0].offsetHeight;
		}
		else{
			h = sections[1].offsetHeight;
		}
	}
	
	$('#payment-wrapper .orders-list').css('height', `${h-90}px`);
	sections.css({'height':`${h}px`});
}