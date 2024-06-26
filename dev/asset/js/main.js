window.onload = function() {
    //Swiper slider
    var swiper = new Swiper(".main-visual .swiper", {
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    }
    );


    //header scroll
    var header = document.querySelector('.header');
    window.onscroll = function() {
        var winScrollTop = window.pageYOffset;

        if(winScrollTop > 100) {
            header.classList.add('scroll')
        }else {
            header.classList.remove('scroll')
        }
    }
}
