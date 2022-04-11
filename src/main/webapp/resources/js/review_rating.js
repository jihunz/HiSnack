$(function () {
	// 평점(별점)을 표시해야하는 요소를 찾는다
	const rating = $('.review-item .rating');
	// 찾아서 data-rating 만큼 별을 표시한다
	for (r of rating) {
		const ratingValue = $(r).data('rating');
		const floor = Math.floor(ratingValue);
		const ceil = Math.ceil(ratingValue);
		for (let i = 1; i <= floor; i++) {
			const elem = createStar('star');
			$(r).append(elem);
		}
		// 0.5는 반개 표시한다
		if(ratingValue - floor !== 0){
			$(r).append(createStar('half'));
		}

		for(let i = ceil; i < 5; i++){
			$(r).append(createStar('empty'));
		}
	}

	function createStar(type) {
		const elem = $('<span>');
		switch (type) {
			case 'star':
				elem.addClass('star');
				break;
			case 'half':
				elem.addClass('star-half');
				break;
			case 'empty':
				elem.addClass('star-empty');
				break;
		}

		return elem;
	}
});