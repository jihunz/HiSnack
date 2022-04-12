$(function() {
	// swiper 동작 설정을 위한 객체
	var swiper = new Swiper(".mySwiper", {
		slidesPerView: '4',
		spaceBetween: -5,
		slidesPerGroup: 1,
		
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},

	});
});
