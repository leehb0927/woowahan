window.onload = function() {

    fetch('./asset/data/data.json')
    .then((response) => response.json())
    .then((json) => {
        items = json;

        contentHtml = '';
        items.forEach(item => {
            contentHtml += `
                <li class="swiper-slide">
                    <div class="image-wrap">
                        <img src="${item.image}" alt="">
                    </div>
                    <div class="text">
                        <h3>${item.title}</h3>
                        <div>
                            <p class="">${item.paragraph1}</p>
                            <p>
                                ${item.paragraph2.map(
                                    char => `<span>${char}</span>`
                                ).join('')}
                            </p>
                        </div>
                        <a href="">
                            <span>${item.linkText}</span>
                        </a>
                    </div>
                </li>
            `
        });
        $('.main-visual .swiper-wrapper').html(contentHtml);

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
            on: {
                slideChangeTransitionEnd: function() {
                    var currentSlide = $('.swiper-slide-active');
                    var prevSlide = $('.swiper-slide').not('.swiper-slide-active');

                    //스와이퍼 두 번째 바퀴부터 텍스트가 미리 보이는 현상 제거
                    prevSlide.find('.text p:first-of-type').removeClass('visible');
                    prevSlide.find('.text p:nth-of-type(2) span').css('opacity', 0);

                    visualTextAnimation(currentSlide);
                }
            }
        });
        visualTextAnimation($('.swiper-slide-active'));
    })

    //메인비주얼 텍스트 한 글자씩 나타나게
    /* 
    css 애니메이션도 추가하여 효과를 더욱 입체적으로 만들 수 있다.
    */
    function visualTextAnimation(slide) {
        var visualText1 = slide.find('.text p:first-of-type');
        var visualText2 = slide.find('.text p:nth-of-type(2)');
        //'.text p:nth-of-type(2) span' 으로 하면 하나 하나 제어가 어려움

        visualText1.addClass('visible');

        setTimeout(function() {
            visualText2.css('opacity', 1);

            var spans = visualText2.find('span');
            //find가 여러 요소를 선택하고 그 자체로 배열처럼 동작한다.
            
            spans.each(function(index, element) {
                setTimeout(function() {
                    $(element).css('opacity', 1);
                }, index * 150);
            });
        }, 1000);
    }

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


    //모바일 gnb 열기 / 닫기
    var body = document.querySelector('body');
    var mobileMenu =  document.querySelector('.mobile-gnb-wrap');
    var mobileMenuName = document.querySelectorAll('.mobile-gnb li');
    var mobileGnbBtn = document.querySelector('.mobile-gnb-btn');

    mobileGnbBtn.addEventListener('click', function(e) {
        e.preventDefault();

        mobileMenu.classList.add('gnb-open');
        body.classList.add('overflow-h')
    })

    $('.mobile-gnb-wrap .gnb-close-btn').click(function(e) {
        e.preventDefault();

        var $subGnb = $('.mobile-gnb-wrap .sub-gnb');

        mobileMenu.classList.remove('gnb-open');
        body.classList.remove('overflow-h');

        mobileMenuName.forEach(function(name) {
            name.classList.remove('active')
        })
        $subGnb.slideUp(500);
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


    //마우스 올리면 롤러 멈춤 스크립트
    rollers.forEach(roller => {
        let timeOutRoller;
    
        roller.addEventListener("mouseenter", function() {
            timeOutRoller = setTimeout(() => {
                // 모든 .rolling-wrap 요소에 .paused 클래스 추가
                document.querySelectorAll('.rolling-wrap').forEach(item => item.classList.add('paused'));
            }, 3000);
        });
    
        roller.addEventListener("mouseleave", function() {
            clearTimeout(timeOutRoller);  // 이전에 설정된 타임아웃 취소
            document.querySelectorAll('.rolling-wrap').forEach(item => item.classList.remove('paused'));
        });
    });
}