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

	showId();
});



// 로그인을 하지 않았을 경우 dropdown 숨김,
// 로그인 완료 시 loginBtn의 text를 id로 교체
function showId() {
	const loginBtn = $("#loginBtn");
	if (user.userId != '') {
		loginBtn.removeAttr("onClick").text(`${user.userId} 님`);
	} else {
		loginBtn.attr("onClick", "location.href='login'").removeAttr("data-bs-toggle");
	}
}