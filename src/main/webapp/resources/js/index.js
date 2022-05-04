$(function() {
	// swiper 동작 설정을 위한 객체
	var swiper = new Swiper(".mySwiper", {
		slidesPerView: '4',
		spaceBetween: 0,
		slidesPerGroup: 1,
		
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},

	});

	var mainSwiper = new Swiper(".mainSwiper", {
		slidesPerView: '1',
		spaceBetween: 0,
		slidesPerGroup: 1,

		autoplay: {
			delay: 6000,
			disableOnInteraction: false,
		},
		
		

	});
	$('.btn-wrapper .start').on('click', function() {
		mainSwiper.autoplay.start();
		return false;
	});
	$('.stop').on('click', function() {
		mainSwiper.autoplay.stop();
		return false;
	});

	$('.prev').click(e => {
		mainSwiper.slidePrev(500, true);
	});
	$('.next').click(e => {
		mainSwiper.slideNext(500, true);
	});
});


