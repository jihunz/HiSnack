$(function() {
    showId();
});

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

function showId() {
    const loginBtn = $("#loginBtn");
    
    if(user.userId != '') {
        loginBtn.removeAttr("onClick").text(`${user.userId} 님`);
    } else {
        loginBtn.attr("oncClick", "location.href='login'")
        $(".dropdown-menu").css("display", "none");
    }
}