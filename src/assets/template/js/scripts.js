$(function() {

    $('.zoom').magnificPopup({
        type  : 'image'
    });
    initAdvantagesSlider();
    initPhotosSlider();
    initLocationSlider();

    $('.open-popup-link').magnificPopup({
        type:'inline',
        midClick: true
    });

    $('.toggle-menu').on('click', function () {
        $('.mobile-menu').slideToggle();
    });

    $('body').on('click', '[data-goto]', function(e) {
        e.preventDefault();
        var selector = $(this).attr('data-goto');
        $('html, body').animate({ scrollTop: $(selector).offset().top}, 1200);
    });

    $('.photos--desktop-DISABLED').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },

    });

});

var slider_advantages = false;
var slider_photos = false;
var slider_location = false;
initAdvantagesSlider  = function() {

    if ($(window).width()<992) {
        if (!slider_advantages) {
            $('.advantages-slider').slick({
                'autoplay': false,
                'arrows': true,
                'dots': true,
                'slidesToShow': 1,
                'slidesToScroll': 1
            });
            slider_advantages = true;
        }
    } else {
        if (slider_advantages) {
            $('.advantages-slider').slick('unslick');
            slider_advantages = false;
        }
    }
}

initPhotosSlider  = function() {

    if ($(window).width()<992) {
        if (!slider_photos) {
            $('.photos-slider').slick({
                'autoplay': false,
                'arrows': true,
                'dots': true,
                'slidesToShow': 1,
                'slidesToScroll': 1,
                adaptiveHeight: true,
            });
            slider_photos = true;
        }
    } else {
        if (slider_photos) {
            $('.photos-slider').slick('unslick');
            slider_photos = false;
        }
    }
}

initLocationSlider  = function() {

    if ($(window).width()<992) {
        if (!slider_location) {
            $('.location-slider').slick({
                'autoplay': false,
                'arrows': true,
                'dots': true,
                'slidesToShow': 1,
                'slidesToScroll': 1,
                adaptiveHeight: true,
            });
            slider_location = true;
        }
    } else {
        if (slider_location) {
            $('.location-slider').slick('unslick');
            slider_location = false;
        }
    }
}


$(window).resize(function(){
    initAdvantagesSlider();
    initPhotosSlider();
    initLocationSlider();
});



