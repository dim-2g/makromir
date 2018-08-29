$(function() {

    $('.zoom').magnificPopup({
        type  : 'image'
    });
    initAdvantagesSlider();
    initPhotosSlider();
    initBenefitSlider();
    initPhotoGallerySlider();
    initProfitSlider();


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
var slider_benefit = false;
var slider_photogallery = false;
var slider_profit = false;
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

initBenefitSlider  = function() {

    if ($(window).width()<1024) {
        if (!slider_benefit) {
            $('.benefit-slider').slick({
                'autoplay': false,
                'arrows': true,
                'dots': true,
                'slidesToShow': 2,
                'slidesToScroll': 1,
                'adaptiveHeight': true,
                'responsive': [
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 1,
                        }
                    }
                ]
            });
            slider_benefit = true;
        }
    } else {
        if (slider_benefit) {
            $('.benefit-slider').slick('unslick');
            slider_benefit = false;
        }
    }
}

initProfitSlider  = function() {

    if ($(window).width()<1024) {
        if (!slider_profit) {
            $('.profit-slider').slick({
                'autoplay': false,
                'arrows': true,
                'dots': true,
                'slidesToShow': 1,
                'slidesToScroll': 1,
                'adaptiveHeight': true
            });
            slider_profit = true;
        }
    } else {
        if (slider_profit) {
            $('.profit-slider').slick('unslick');
            slider_profit = false;
        }
    }
}

initPhotoGallerySlider  = function() {

    if (!slider_photogallery) {
        $('.photogallery-slider').slick({
            'autoplay': false,
            'arrows': true,
            'dots': true,
            'slidesToShow': 3,
            'slidesToScroll': 1,
            'responsive': [
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });
        slider_photogallery = true;
    }

}


$(window).resize(function(){

    initPhotoGallerySlider();
    indxSlidtabInit();
    initBenefitSlider();
    initProfitSlider();
});





$(function(){
    $.fn.tabs=function(options){
        $.fn.tabs.destroy = function () {
            console.log('destroy');
            setActiveContent($(this),-2);
            console.log('end destroy');
        }
        let defa=$.extend({
            linkClass:'.tabs__link',
            contentClass:'.tabs__content',
            addToActive:'',
            preventDefault:true
        },options);

        let setActiveContent=function(id){
            if(id==-1){
                //console.log(-1);
                $(this).find(defa.contentClass).each(function(){
                    $(this).css({
                        'display':'none'
                    });
                    $(this).removeClass('active');
                });
                $(this).find(defa.linkClass).each(function(){
                    $(this).removeClass('active');
                });
                return true;
            }
            if(id==-2){
                //console.log(-1);
                console.log(1);
                $(this).find(defa.contentClass).each(function(){
                    $(this).css({
                        'display':'block'
                    });
                    $(this).removeClass('active');
                    $(this).addClass(defa.addToActive);

                });

                return true;
            }
            if(id>=0){

                if(true){
                    let link=$(this).find(defa.linkClass).eq(id);
                    let tab=$(this).find(defa.contentClass).eq(id);
                    //  console.log(`Click ${tab.length}`);
                    link.addClass('active');
                    tab.addClass('active');
                    tab.addClass(defa.addToActive);
                    tab.css({
                        'display':'block'
                    });
                }
            }
        }
        $(this).each(function(){
            //  console.log('tabs created');
            let $this=$(this);
            setActiveContent.call($this,-1);
            setActiveContent.call($this,0);

            $(this).find(defa.linkClass).on('click',function(e){
                if(defa.preventDefault==true){
                    e.preventDefault();
                }
                //
                var indx=$this.find(defa.linkClass).index($(this));
                setActiveContent.call($this,-1)
                setActiveContent.call($this,indx);
            });
        });
    }
}(jQuery));



$(document).ready(function(){
    $('.slidtab').tabs({
        linkClass:'.slidtab__list-item',
        contentClass:'.slidtab__list-content',
        addToActive:'animated  fadeIn'
    });
});

var indxSlidtabFlag=false;
function  indxSlidtabInit(){
    if($(window).innerWidth()<=930&&indxSlidtabFlag==false){
        console.log($('.slidtab__list-content').length);
        $('.slidtab__list').css('display','none');
        $('.slidtab__list-content').each(function(){
            $(this).css('display','flex');
        })
        $('.slidtab').tabs.destroy();

        $('.slidtab__slider').owlCarousel({
            dots:true,
            nav:false,
            loop:true,
            items:1,
            navText : ["",""],
            responsive:{
                320:{
                    nav:true,
                },
                550:{
                    nav:false
                },
            }
        });
        indxSlidtabFlag=true;
    }
    if($(window).innerWidth()>930&&indxSlidtabFlag==true){
        $('.slidtab__slider').owlCarousel('destroy');
        $('.slidtab').tabs({
            linkClass:'.slidtab__list-item',
            contentClass:'.slidtab__list-content',
            addToActive:'animated  fadeIn'
        });
        $('.slidtab__list').css('display','block');
        $('.slidtab__list-item').eq(0).trigger('click');
        $('.slidtab__list-content').eq(0).css('display','block');

        indxSlidtabFlag=false;
    }

}
indxSlidtabInit();



var indxBenefitFlag=false;
function  indxSlidtabInit(){
    if($(window).innerWidth()<=930&&indxSlidtabFlag==false){
        console.log($('.slidtab__list-content').length);
        $('.slidtab__list').css('display','none');
        $('.slidtab__list-content').each(function(){
            $(this).css('display','flex');
        })
        $('.slidtab').tabs.destroy();

        $('.slidtab__slider').owlCarousel({
            dots:true,
            nav:false,
            loop:true,
            items:1,
            navText : ["",""],
            responsive:{
                320:{
                    nav:true,
                },
                550:{
                    nav:false
                },
            }
        });
        indxSlidtabFlag=true;
    }
    if($(window).innerWidth()>930&&indxSlidtabFlag==true){
        $('.slidtab__slider').owlCarousel('destroy');
        $('.slidtab').tabs({
            linkClass:'.slidtab__list-item',
            contentClass:'.slidtab__list-content',
            addToActive:'animated  fadeIn'
        });
        $('.slidtab__list').css('display','block');
        $('.slidtab__list-item').eq(0).trigger('click');
        $('.slidtab__list-content').eq(0).css('display','block');

        indxSlidtabFlag=false;
    }

}
