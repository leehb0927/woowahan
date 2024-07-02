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

    window.onscroll = function() {
        var winScrollTop = window.pageYOffset;

        if(winScrollTop > 100) {
            header.classList.add('scroll')
        }else {
            header.classList.remove('scroll')
        }
    }

    //무한 롤링
/*     let roller = document.querySelector('.rolling-wrap');
    roller.id = 'roller1';

    let clone = roller.cloneNode(true);
    clone.id = 'roller2';
    document.querySelector('.roller').appendChild(clone);

    document.querySelector('#roller1').style.left = '0px';
    document.querySelector('#roller2').style.left = document.querySelector('.rolling-wrap ul').offsetWidth + 'px';

    roller.classList.add('original');
    clone.classList.add('clone'); */
//재사용이 안되는 코드라 재사용 가능한 코드로 수정해 보자


    // let rollers = document.querySelectorAll('.rolling-wrap');
    // rollers.id = 'roller1'
    /* rollers는 querySelectorAll 메서드를 사용하여 선택한 요소들의 NodeList를 반환합니다. NodeList는 배열과 유사한 객체로, 각 요소에 직접 접근할 수는 있지만, NodeList 자체에 속성을 설정할 수는 없습니다. 따라서 rollers.id를 설정하는 것은 불가능합니다. */


    let rollers = document.querySelectorAll('.rolling-wrap');

    rollers.forEach((roller) => {
        roller.id = 'roller1';

        let clone = roller.cloneNode(true);
        // 복제된 요소에도 고유한 ID를 부여합니다.
        clone.id = 'roller2';

        // 부모 요소에 복제된 요소를 추가합니다.
        roller.parentNode.appendChild(clone);

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
}
