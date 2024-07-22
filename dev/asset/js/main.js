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

    //footer related-sites 열었다 닫혔다
    var sitesListButton = document.querySelector('footer .related-sites button');
    var sitesList = document.querySelector('footer .related-sites .sites');

    sitesListButton.addEventListener('click', function() {
        sitesListButton.classList.toggle('open');
        sitesList.classList.toggle('open');
        console.log('click');
    })

    //header scroll
    var header = document.querySelector('.header');
    var headerListItems = document.querySelectorAll('.header .gnb li');
    var headerSub = document.querySelector('.header .gnb .sub-menu');

    window.onscroll = function() {
        var winScrollTop = window.pageYOffset;

        if(winScrollTop > 100) {
            header.classList.add('scroll')
        }else {
            header.classList.remove('scroll')
        }
    }

    //모바일 gnb
    // var mobilSubGnbOpen = document.querySelectorAll('.sub-gnb-btn');

    // mobilSubGnbOpen.forEach(function(btn) {
    //     btn.addEventListener('click', function() {
    //         var mobileSubGnb = btn.closest('li');
    //         /* 
    //         .closet '가장 가까운 상위 요소를 찾는다'
    //         */

    //         mobileSubGnb.classList.toggle('active')
    //     })
    // })

    //모바일 gnb 열기 / 닫기
    var body = document.querySelector('body');
    var mobileMenu =  document.querySelector('.mobile-gnb-wrap');
    var mobileMenuName = document.querySelector('.mobile-gnb li');
    var mobileSubMenu = document.querySelector('.mobile-gnb-wrap .sub-gnb');

    $('.mobile-gnb-btn').click(function(e) {
        e.preventDefault();

        mobileMenu.classList.add('gnb-open');
        body.classList.add('overflow-h');
    })

    $('.mobile-gnb-wrap .gnb-close-btn').click(function(e) {
        e.preventDefault();

        mobileMenu.classList.remove('gnb-open');
        body.classList.remove('overflow-h');
        mobileMenuName.classList.remove('active');
        mobileSubMenu.style.display = 'none';
    })

    $('.sub-gnb-btn').click(function(e) {
        e.preventDefault();

        var $li = $(this).closest('li');
        var $subGnb = $li.find('.sub-gnb');

        // $li.toggleClass('active');

        if($subGnb.css('display') == 'block') {
            $li.removeClass('active');

            $subGnb.stop(true, true).slideUp(400);
        }else {
            $li.addClass('active');

            $subGnb.stop(true, true).slideDown(200);
        }
    })


    // function handleScroll() {
    //     var winScrollTop = window.pageYOffset;
    
    //     if (winScrollTop > 100) {
    //         header.classList.add('scroll');
    //     } else {
    //         header.classList.remove('scroll');
    //     }
    // }
    // function checkMediaQuery() {
    //     var mediaQuery = window.matchMedia('(min-width: 980px)');
    //     if (mediaQuery.matches) {
    //         window.addEventListener('scroll', handleScroll);
    //         handleScroll();
    //     } else {

    //         window.removeEventListener('scroll', handleScroll);
    //         header.classList.remove('scroll');
    //     }
    // }
    // checkMediaQuery();
    // window.addEventListener('resize', checkMediaQuery);



    //header mouseover
    header.addEventListener('mouseover', function() {
        //서브메뉴 나타남
        header.classList.add('header-hover');
        headerSub.style.opacity = '1';
    });

    //header mouseout
    header.addEventListener('mouseout', function(event) {
        if (!header.contains(event.relatedTarget)) {
            headerSub.style.opacity = '0';


            hoverTimeout = setTimeout(function() {
                header.classList.remove('header-hover');
            }, 300)
        }
    });
    /* 
    header.contains(event.relatedTarget) _ 목표 요소가 'header'요소 내부에 있는지 확인 마우스가 목표 요소 내부에 있는지 확인하는 거 같음
    _ 앞에 !는 header요소 내부에 없을 경우 true반환하여 함수 실행
    */



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