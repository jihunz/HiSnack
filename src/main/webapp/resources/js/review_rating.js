$(function () {
	// 리뷰 리스트에서 사용
	// 평점(별점)을 표시해야하는 요소를 찾는다
	const rating = $('.review-item .rating');
	// 찾아서 data-rating 만큼 별을 표시한다
	for (r of rating) {
		const ratingValue = $(r).data('rating');
		initRatingWrapper($(r), ratingValue, false);
	}

	// 리뷰 상세에서 사용
	const reviewDetailRating = $('.review-form .rating');
	const itemRating = reviewDetailRating.data('rating')

	initRatingWrapper(reviewDetailRating, itemRating, true);
});

function initRatingWrapper(wrapper, ratingValue, big){
	const floor = Math.floor(ratingValue);
	const ceil = Math.ceil(ratingValue);
	for (let i = 1; i <= floor; i++) {
		const elem = createStar('star', big);
		wrapper.append(elem);
	}
	// 0.5는 반개 표시한다
	if(ratingValue - floor !== 0){
		wrapper.append(createStar('half', big));
	}

	for(let i = ceil; i < 5; i++){
		wrapper.append(createStar('empty', big));
	}
}

function createStar(type, big) {
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

	if(big){
		elem.addClass('big');
	}

	return elem;
}