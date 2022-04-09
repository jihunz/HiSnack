$(function() {
	// swiper 동작 설정을 위한 객체
	var swiper = new Swiper(".mySwiper", {
		pagination: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
		keyboard: {
			enabled: true,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		}
	});
});
