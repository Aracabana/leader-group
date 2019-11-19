$(document).ready(function () {

    var searchIsActive = false;

    if ($('*').is('.slider-wrapper')) {
        var servicesSliderVideo = $('.slider-wrapper');
        servicesSliderVideo.on('init', function (slick) {
            var currentSlide = $(this).find('.slick-slide.slick-current');
            var video = currentSlide.find('video');
            if (video.length > 0) {
                video[0].play();
            }
            else {
                $('#slider-preview-slides, .slick-list').addClass('slider-image-mobile');
            }
        });
        servicesSliderVideo.on('beforeChange', function (event, slick, currentSlide) {
            var video = $(slick.$slides[currentSlide]).find('video');
        });
        servicesSliderVideo.on('afterChange', function (event, slick, currentSlide) {
            var video = $(slick.$slides[currentSlide]).find('video');
            if (video.length > 0) {
                $('#slider-preview-slides, .slick-list').removeClass('slider-image-mobile');
                video[0].play();
            }
            else {
                $('#slider-preview-slides, .slick-list').addClass('slider-image-mobile');
            }
        });
        servicesSliderVideo.slick({
            infinite: true,
            dots: true,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 18000,
            pauseOnHover: true,
        });
    }
    var windowW;
    $(window).resize(function () {
        windowW = $(window).width();
        if (windowW >= 1200) {
            $('#js-menu-btn').removeClass('open');
            $('#js-menu').removeAttr('style');
            $('.js-submenu-btn').removeClass('open');
            $('.js-submenu').removeAttr('style');
        }
    });
    $(window).trigger('resize');
    //welcome logo animation
    if ($('*').is('.welcome-logo')) {
        setTimeout("$('.animate').addClass('in')", 400);
    }
    //fixed mobile menu
    function fixedHeader() {
        if (windowW <= 575) {
            if ($(window).scrollTop() >= 94) {
                $('.header-menu-wrapper').addClass('scroll');
            } else {
                $('.header-menu-wrapper').removeClass('scroll');
            }
        }
    }
    fixedHeader();
    $(window).scroll(function() {
        fixedHeader();
    });
    //mobile menu
    $('#js-menu-btn').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('open');
        $('#js-menu').slideToggle();
    });
    $('.js-submenu-btn').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('open');
        $(this).next('.js-submenu').slideToggle();
    });
    //review-slider
    if ($('*').is('.js-reviews-slider')) {
        $('.js-reviews-slider').slick({
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });
    }
    $('#review-popup').on('show.bs.modal', function (e) {
        var link = $(e.relatedTarget);
        $(this).find('.modal-content-wrapper').load(link.data('url'));
    });


    $('#slider-preview-slides .slider-wrappe').not('.slick-initialized').slick({
        infinite: true,
        slidesToShow: 1,
        dots: true,
        arrows: false,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 7000,
        pauseOnHover: true,
        cssEase: 'linear',
        fade: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ],
    });


    //articles-slider
    if ($('*').is('.js-articles-slider')) {
        $('.js-articles-slider').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });
    }
    //input [type="file"]
    $('.js-file').change(function () {
        var file = $(this),
            fileValue = file.val(),
            label = file.next('.js-file-label');
        console.log(fileValue);
        if (fileValue !== '') {
            label.text(fileValue);
        }
    });
    //hidden-content
    $('.js-btn-show').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $(this).next('.dropdown-menu').slideToggle();
    });
    $('.js-faq-close-btn').click(function (e) {
        e.preventDefault();
        $(this).parent('.js-hidden-content').slideUp();
        $(this).parent('.js-hidden-content').siblings('.js-btn-show').removeClass('active');
    });
    $('.btn-user-report-order').click(function () {
        $('#notifications').html("");
        data = {};
        data[yupeTokenName] = yupeToken;
        $this = $(this);
        $.ajax({
            url: $this.attr('data-url'),
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (response) {
                if (response.result) {
                    $('#notifications').html(response.data);
                } else {
                    $('#notifications').append('<ul class="text-left"></ul>');
                    $.each(response.data, function (e, k) {
                        $('#notifications').find('ul').append('<li>' + k + '</li>');
                    });
                }
                $('#notifications').addClass('active');
                setTimeout(function () {
                    $('#notifications').removeClass('active');
                }, 3000);
            },
            error: function () {
            }
        });
    });

    if (!$('.slider-vide-wrapper')[0]) {
        $('#slider-preview-slides, .slick-list').addClass('slider-image-mobile');
    }

    $('.header-search-btn').on('click', function (e) {
        e.stopImmediatePropagation();
        $('.header-search-wrapper').toggle();
        searchIsActive = !searchIsActive;
    });

    $('.header-search').on('click', function (e) {
        e.stopImmediatePropagation();
    })

    $('body').on('click', function () {
        if (searchIsActive) {
            $('.header-search-wrapper').hide();
            searchIsActive = false;
        }
    })

});

function init(map) {
    if (document.getElementById(map) == null) {
        return false;
    }
    myMap = new ymaps.Map(map, {
        center: [55.753994, 37.622093],
        zoom: 9
    });
    myMap.behaviors.disable('scrollZoom');
    ymaps.geocode(scheme_address, {
        results: 1
    }).then(function (res) {
        var firstGeoObject = res.geoObjects.get(0),
            coords = firstGeoObject.geometry.getCoordinates(),
            bounds = firstGeoObject.properties.get('boundedBy');
        firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
        firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());
        myMap.geoObjects.add(firstGeoObject);
        myMap.setBounds(bounds, {
            checkZoomRange: true
        });
        $('#' + map).addClass('active');
    });
}

function authSendForm(form, data, hasError) {
    $('#notifications').html("");
    $.ajax({
        url: form[0].action,
        type: 'POST',
        dataType: 'json',
        data: form.serialize(),
        success: function (response) {
            if (response.result) {
                document.getElementById($(form[0]).attr('id')).reset();
                $('#notifications').html(response.message);
                setTimeout(function () {
                    $('.modal').modal('hide');
                    if (response.url) {
                        document.location.href = response.url
                    }
                }, 5000);
            } else {
                $('#notifications').html(response.message);
            }
            $('#notifications').addClass('active');
            setTimeout(function () {
                $('#notifications').removeClass('active');
            }, 3000);
        },
        error: function () {
        }
    });
    return false;
}
