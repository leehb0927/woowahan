window.onload = function() {
    //Swiper slider
    var swiper = new Swiper(".main-visual .swiper", {
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 5000,
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
    var headerListItems = document.querySelectorAll('.header .gnb li');

    window.onscroll = function() {
        var winScrollTop = window.pageYOffset;

        if(winScrollTop > 100) {
            header.classList.add('scroll')
        }else {
            header.classList.remove('scroll')
        }
    }

    headerListItems.forEach(function(item) {
        item.addEventListener('mouseover', function() {
            header.classList.add('header-hover')
        })
        item.addEventListener('mouseout', function() {
            header.classList.remove('header-hover')
        })
    })




    let rollers = document.querySelectorAll('.rolling-wrap');

    rollers.forEach((roller) => {
        roller.id = 'roller1';

        let clone = roller.cloneNode(true);
        // 복제된 요소에도 고유한 ID를 부여합니다.
        clone.id = 'roller2';

        // 부모 요소에 복제된 요소를 추가합니다.
        roller.parentNode.appendChild(clone);
        
        document.querySelector('#roller1').style.left = '0px';
        document.querySelector('#roller2').style.left = document.querySelector('.rolling-wrap ul').offsetWidth + 'px';

        roller.classList.add('original');
        clone.classList.add('clone');
    })


        //section.main-video 동영상 멈춤/재생
    let video = document.querySelector('.video-wrap video');
    let videoBtn = document.querySelector('.video-wrap .video-btn');

    videoBtn.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            videoBtn.style.backgroundImage = "url(asset/img/main/icon_video_stop.svg)"
        } else {
            video.pause();
            videoBtn.style.backgroundImage = "url(asset/img/main/icon_video_play.svg)"
        }
    })



    //section.main-card 무한 롤링 hover 멈춤
    let timeout;

    const handleMouseOver = function() {
        timeout = setTimeout(function() {
            roller.classList.add('paused');
            clone.classList.add('paused');
        }, 3000);
    };

    const handleMouseOut = function() {
        clearTimeout(timeout); // 타이머 취소
        roller.classList.remove('paused');
        clone.classList.remove('paused');
    };

    roller.addEventListener('mouseover', handleMouseOver);
    roller.addEventListener('mouseout', handleMouseOut);
    clone.addEventListener('mouseover', handleMouseOver);
    clone.addEventListener('mouseout', handleMouseOut);


}
