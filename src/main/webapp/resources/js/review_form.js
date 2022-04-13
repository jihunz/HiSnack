$(function(){
	// rating select를 가림
	$('.rating-select').hide();
	$('.rating span').css({cursor:'pointer'});
	// 별을 마우스 클릭하면 select의 값을 변경
	$('.rating span').click(function(e){
		const index = $(this).index() + 1;
		// 별들을 초기화
		$(`.rating span`).attr('class', 'star-empty big');
		const dist = e.pageX - (this.getBoundingClientRect().left + this.clientWidth/2);
		if(dist < 0){
			// 마우스의 위치가 별의 위치보다 왼쪽이면 0.5
			// $(`.rating span:nth-child(-n+${index-1})`).attr('class', 'star big');
			// $(this).attr('class', 'star-half big');
			changeStar(index-1+0.5);
			changeRating(index-1+0.5);
		}
		else{
			// 마우스의 위치가 별의 위치보다 오른쪽이면 1로 인식
			// $(`.rating span:nth-child(-n+${index})`).attr('class', 'star big');
			changeStar(index);
			changeRating(index);
		}
	});
	
	
	$('#review-submit').click(function(e){
		// e.preventDefault();
	
		if(!$('[name="image"]').val()){
			// 이미지가 없으면 경고
			alert('사진을 등록해 주세요.');
			return false;
		}
		else if(!$('[name="contents"]').val()){
			// 내용이 없으면 경고
			alert('리뷰 내용을 작성해 주세요.');
			return false;
		}
	
		// this.submit();
	});

	// 만약 select에 rating 값이 있으면 그걸로 설정함
	const rating = $('.rating-select').data('rating');

	if(rating){
		changeStar(parseFloat(rating));
		changeRating(parseFloat(rating));
	}
});

// 숫자를 입력하면 select의 값이 바뀌는 함수
function changeRating(value){
	const select = $('.rating .rating-select');
	select.val(value).prop('selected', true);
}
// 숫자를 입력하면 별이 바뀌는 함수
function changeStar(value){
	if(value % 1 != 0){
		// 실수일 경우
		const num = Math.floor(value);
		$(`.rating span:nth-child(-n+${num})`).attr('class', 'star big');
		$(`.rating span:nth-child(${num+1})`).attr('class', 'star-half big');
	}
	else{
		// 정수일 경우
		$(`.rating span:nth-child(-n+${value})`).attr('class', 'star big');
	}
}