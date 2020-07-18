/**
 Custom JS

 1. OPEN AND CLOSE MENU
 2. OPEN AND CLOSE SEARCH BAR
 3. HEADER BACKGROUND AFTER PAGE LOAD
 4. HEADER BACKGROUND AFTER PAGE SCROLL
 5. HEADER FULL HEIGHT
 6. BACKGROUND IMAGE PARALLAX EFFECT
 7. WOW ANIMATION
 8. TESTIMONIALS CAROUSEL
 9. PLAYER
 10. POPUP SLIDER
 11. MUSIC DISCOGRAPHY BANNERS EQUAL WIDTH AND HEIGHT
 12. BLOG MANSORY
 13. CART NUMBER PICKER
 14. SHOP SORTING DROPDOWN SELECT
 15. SINGLE PRODUCT IMAGE ZOOM
 16. PAYMENT RADIO BUTTON
 17 .userAgent for browser
 18 .PDISPLAY MAP AFTER CLICK
 19. BLOG MASONRY HOVER FUNCTION
 20 .PRE LOADER
 21 .SCROLL SECTION
 **/

"use strict";
//Variable for caching
var windowElement = jQuery(window);
var body = jQuery("body");

//Variable for player
var current_track = 1;

//Variable for slider
var current_slide = 0;
var slides_length = 0;
var prev_slide = 0;
var slideWidth = jQuery("#popup-container").width() * 0.8;
var appendBody;
var popup_images_arr = [];
if(typeof wc_add_to_cart_params != 'undefined'){
    jQuery('.menu-item').each(function(){
        if(jQuery(this).find('a').text().indexOf("Shop") >= 0){
            jQuery(this).css('display', 'inline-block');
        }
    });
    jQuery('.nav.flex-column.section .menu-item a:contains("shop")').css('display', 'inline-block');
} else {
    jQuery('.menu-item').each(function(){
        if(jQuery(this).find('a').text().indexOf("Shop") >= 0){
            jQuery(this).css('display', 'none');
        }
    });
}


function msieversion() {
    var ua = window.navigator.userAgent;
    var net = ua.indexOf("NET ");

    if (net > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        if ( ! Modernizr.objectfit ) {
            jQuery('.img_link').each(function () {
                var $container = jQuery(this),
                    imgUrl = $container.find('img').prop('src');
                if (imgUrl) {
                    $container
                        .css('backgroundImage', 'url(' + imgUrl + ')')
                        .addClass('compat-object-fit');
                }
            });
    }
    }
    return false;
} // End




// Get track duration by source

function getDuration(src) {
    return new Promise(function(resolve, reject) {
        var audio = new Audio();
        jQuery(audio).on("loadedmetadata", function(){
            resolve(audio.duration);
        });
        audio.src = src;

    });
}
// Function for player
function playerItemEnd() {
    jQuery('.play-mp3').show();
    jQuery('.pause-mp3').hide();
}
// Function For Gallery Popup Slider
function changeSlide() {

    if (current_slide == prev_slide) {
        return false;
    }

    for (let i = 0; i<slides_length; i++) {
        if  (i === prev_slide) {
            jQuery("a.popup-image").eq(i).css({"z-index": "1"}).stop().animate({
                opacity: 0
            }, 500, function () {
                jQuery( this ).css("visibility", "hidden");
            })
        }
        if (i === current_slide) {
            jQuery("a.popup-image").eq(i).css({"visibility":"visible", "z-index": "2"}).stop().animate({
                opacity: 1
            }, 500)
        }
    }

    jQuery("#popup-container li").filter(function (index) {
        return index != current_slide
    }).removeClass("active");

    jQuery("#popup-container li").filter(function (index) {
        return index == current_slide
    }).addClass("active");

}

// Key Event Change Slider
jQuery(document).keydown(function(e) {
    if(jQuery('#popup-container').length > 0 && jQuery('#popup-container').css('display')== "block"){
        switch(e.which) {
            case 37:
                jQuery('.popup_left').trigger('click');
                break;
            case 39:
                jQuery('.popup_right').trigger('click');
                break;
            case 27:
                jQuery('#popup-container').trigger('click');
                break;
            default: return; // exit this handler for other keys
        }
    }        // Key Event Menu
    else if(jQuery('div.nav-menu').hasClass('active')){
        switch(e.which) {
            case 27:
                jQuery('.menu_icon').trigger('click');
                break;

            default: return; // exit this handler for other keys
        }
    }
    // Key Event Search
    else if(jQuery('div.search-bar').hasClass('active')){
        switch(e.which) {
            case 27:
                jQuery('.search_icon').trigger('click');
                break;

            default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    }
});

//Function for Music Discography banners equal width and height
    function setTeamMemberHeight() {
        if(jQuery('body').hasClass('rocks')){
            jQuery('.music-banner').height(jQuery('.music-banner').width());
            jQuery('.music-banner-image').height(jQuery('.music-banner-image').width());
            jQuery('.news_bg_image').height(jQuery('.news_bg_image').width());
            jQuery('.disc-image').height(jQuery('.music-banner-image').width() - 30);
            jQuery('.disc-image').width(jQuery('.disc-image').height());
            jQuery('.s-item-image').height(jQuery('.s-item-image').width());
        } else if(jQuery('body').hasClass('white')){
           jQuery('.music-banner').height(jQuery('.music-banner').width());
           jQuery('.music-banner-image').height(jQuery('.music-banner-image').width());
           jQuery('.news_bg_image').height(jQuery('.news_bg_image').width());
           jQuery('.s-item-image').height(jQuery('.s-item-image').width());
        } else {
            jQuery('.music-banner').height(jQuery('.music-banner').width());
            jQuery('.music-banner-1').height(jQuery('.music-banner-1').width());
            jQuery('.music-banner-2').height(jQuery('.music-banner-2').width());
            jQuery('.music-banner-3').height(jQuery('.music-banner-3').width());
            jQuery('.s-item-image').height(jQuery('.s-item-image').width());
        }

    }
//Function for Music Discography banners equal width and height after window resize
windowElement.resize(function () {
    setTeamMemberHeight();
});

//Function for internet explorer
function msieversion() {
    var ua = window.navigator.userAgent;
    var net = ua.indexOf("NET ");

    if (net > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        if ( ! Modernizr.objectfit ) {
            console.log(net)
            jQuery('.img_link').each(function () {
                var $container = jQuery(this),
                    imgUrl = $container.find('img').prop('src');
                if (imgUrl) {
                    $container
                        .css('backgroundImage', 'url(' + imgUrl + ')')
                        .addClass('compat-object-fit');
                }
            });
        }
    }
    return false;
} // End


jQuery(function ($) {
    "use strict";
    /* ----------------------------------------------------------- */
    /*  1. OPEN AND CLOSE MENU
    /* ----------------------------------------------------------- */
    $('.menu_icon').on('click', function () {
        $(this).toggleClass('active');
        $('.search_icon').removeClass('active');
        $('#header .nav-menu').toggleClass('active');
        $('#header .search-bar').removeClass('active');
    });


    /* ----------------------------------------------------------- */
    /*  2. OPEN AND CLOSE SEARCH BAR
    /* ----------------------------------------------------------- */
    $('.search_icon').on('click', function () {
        $(this).toggleClass('active');
        $('.menu_icon').removeClass('active');
        $('#header .search-bar').toggleClass('active');
        $('#header .nav-menu').removeClass('active');
    });


    /* ----------------------------------------------------------- */
    /*  3. HEADER BACKGROUND AFTER PAGE LOAD
    /* ----------------------------------------------------------- */
    if ( windowElement.scrollTop() > 20) {
        $('.header-continer.lc_sticky_menu').addClass('active');
    } else {
        $('.header-continer.lc_sticky_menu').removeClass('active');
    }


    /* ----------------------------------------------------------- */
    /*  4. HEADER BACKGROUND AFTER PAGE SCROLL
    /* ----------------------------------------------------------- */
    windowElement.on('scroll',function () {
        if ($(this).scrollTop() > 20) {
            $('.header-continer.lc_sticky_menu').addClass('active');
            $('.nav-menu.nav-demo-2').addClass('d-none');
            $('.logo').addClass('col-12 col-lg-4 col-md-4 col-sm-4');
            $('.nav-menu.nav-demo-2').addClass('col-12 col-lg-8 col-sm-8 d-flex align-items-center justify-content-center');
        } else {
            $('.header-continer.lc_sticky_menu').removeClass('active');
            // $('.nav-menu.nav-demo-2').removeClass('d-none');
            $('.logo').removeClass('col-12 col-lg-4 col-md-4 col-sm-4');
            $('.nav-menu.nav-demo-2').removeClass('col-12 col-lg-8 col-sm-8 d-flex align-items-center justify-content-center');
        }
    });

    /* ----------------------------------------------------------- */
    /*  4.5 HEADER BACKGROUND AFTER PAGE SCROLL
    /* ----------------------------------------------------------- */
    $(document).ready(function() {
        if($('.active').length > 1 ){
            $('.logo').addClass('col-12 col-lg-4 col-md-4 col-sm-4');
            $('.nav-menu.nav-demo-2').addClass('col-12 col-lg-8 col-sm-8 d-flex align-items-center justify-content-center');
        }else{
            $('.logo').removeClass('col-12 col-lg-4 col-md-4 col-sm-4');
            $('.nav-menu.nav-demo-2').removeClass('col-12 col-lg-8 col-sm-8 d-flex align-items-center justify-content-center');
        }        
    });   
        
    $(document).ready(function() {
        if ($(this).scrollTop() < 20) {
            $('.nav-menu.nav-demo-2').addClass('d-none');
        } else {
            $('.nav-menu.nav-demo-2').removeClass('d-none');
        }
    });

    
    /* ----------------------------------------------------------- */
    /*  5. HEADER FULL HEIGHT
    /* ----------------------------------------------------------- */
    $.fn.fullHeight = function(){
        var self = this;
        var windowHeight = window.innerHeight;
        var fullHeightFunction = function(){
            return self.css({
                'height': windowHeight
            });
        }
        windowElement.on('resize', function(){
            windowHeight = window.innerHeight;
            fullHeightFunction();
        });
        fullHeightFunction();
        return self;
    }
    // $('#header').fullHeight();


    /* ----------------------------------------------------------- */
    /*  6. BACKGROUND IMAGE PARALLAX EFFECT
    /* ----------------------------------------------------------- */
    windowElement.on('scroll', function () {

        /* Header Section Background Image */
        var st1 = $(this).scrollTop();
        $("#header .bg_image").css({
            "background-position-y": (st1/3)
        });

        /* Tours Section Background Image */
        var st2 = $(this).scrollTop();
        if($('body').hasClass('rocks')){
            $("#on-tour .section_bg_image").css({
                "background-position-y": (-st2/20 - 100)
            });
        } else{
            $("#on-tour .section_bg_image").css({
                "background-position-y": (-st2/20 + 100)
            });
        }

    });


    /* ----------------------------------------------------------- */
    /*  7. WOW ANIMATION
    /* ----------------------------------------------------------- */
    var wow = new WOW(
        {
            animateClass: 'animated',
            offset: 100
        }
    );
    wow.init();


    /* ----------------------------------------------------------- */
    /*  8. TESTIMONIALS CAROUSEL
    /* ----------------------------------------------------------- */

    $('.cd-testimonials-wrapper').flexslider({
        selector: ".cd-testimonials > li",
        animation: "slide",
        controlNav: true,
        animationSpeed: 400,
        smoothHeight: true,
        start: function() {
            $('.cd-testimonials').children('li').css({
                'opacity': 1,
                'position': 'relative'
            });
        }
    });

    /* ----------------------------------------------------------- */
    /*  9. PLAYER
    /* ----------------------------------------------------------- */
$(window).load(function () {
    plyr.setup({
        controls: [
            'play',
            'progress',
            'current-time',
            'duration',
            'mute',
            'volume'
        ]
    });
})

    // Home New Album
    $(body).on('click', '#album-release button[data-plyr="play"]', function () {
        $('#album-release .plyr--playing button[data-plyr="pause"]').trigger('click')
    });

    $('.pause-mp3').hide();
    $('.play-mp3').on('click',function () {
        $('.play-mp3').show();
        $('.pause-mp3').hide();
        $(this).closest('.play-pause').find('svg').toggle();
        if ($(this).closest('.music_line').index() != current_track) {
            $("#mp3_1").html("");
            $("#mp3_1").html('<audio controls class="audio1" onended="playerItemEnd()"><source src="' + $(this).closest('.play-pause').data('src') + '" type="audio/mpeg"></audio>');
            plyr.setup({
                controls: [
                    'play',
                    'progress',
                    'current-time',
                    'duration',
                    'mute',
                    'volume'
                ]
            });
        }

        current_track = $(this).closest('.music_line').index();

        $("#mp3_1").find("button").eq(0).trigger("click");

    });

    $('.pause-mp3').on('click',function () {
        $('.pause-mp3').hide();
        $('.play-mp3').show();
        $("#mp3_1").find("button").eq(1).trigger("click");
    });

    $("body").on("click", "#mp3_1 .plyr__controls button", function () {
        if ($(this).data("plyr") == "play") {
            $("#playlist").find(".music_line").eq(current_track-1).find(".play-pause .play-mp3").hide();
            $("#playlist").find(".music_line").eq(current_track-1).find(".play-pause .pause-mp3").show();
        } else {
            $('.pause-mp3').hide();
            $('.play-mp3').show();
        }
    });

    $(document).on('ready',function () {
        var tracks_arr = [];
        $(".play-pause").each(function () {
            var that = $(this);
            getDuration($(this).data("src"))
                .then(function(length) {
                    let duration = parseInt(length);
                    let minutes = Math.floor(duration/60);
                    let seconds = duration - minutes*60;
                    if (seconds < 10) {
                        seconds = "0" + seconds;
                    }
                    that.closest(".music_line").find(".plyr__time--duration").html(minutes + ":" + seconds);
                });
        });
        $('.stars span a').each(function (key, value) {
            $(this).html('<span style="display:none;">'+(key+1)+'</span><i class="fa fa-star" aria-hidden="true"></i>');
        })
        $('.stars span a').click(function () {
            $('.stars span a').each(function () {
                $(this).find('i').removeClass('star-rate');
            })
            $(this).find('i').addClass('star-rate');
            $(this).prevAll().find('i').addClass('star-rate');
        })
        if($('nav.menu').find('ul').attr('class') === undefined || $('nav.menu').find('ul').attr('class') == false){
            $('nav.menu').find('ul').addClass('nav flex-column section');
        }
        if($("#woo_pp_ec_button img").length > 0){
            $("#woo_pp_ec_button img").attr("src", "https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-small.png");
        }
        $('.tp-bgimg.defaultimg').css('background-position-y', '0px !important')
        if(jQuery('body').hasClass('white')){
            $('.home #contact-us').append('<div class="overly"></div>')
        }
        if($('.grid').length > 0){
            window.msnry = new Masonry( '.grid', {
                columnWidth: '.grid-sizer',
                percentPosition: true
            });
        }
    });


    /* ----------------------------------------------------------- */
    /*  10. POPUP SLIDER
    /* ----------------------------------------------------------- */

    $(".anim_border").on("click", function (event) {
        popup_images_arr = [];
        slides_length = $(".img_link").length;

        $("#slides-container").html("");
        $("#popup-container ul").html("");
        $.each($(".img_link"), function (index, value) {
            popup_images_arr.push($(".img_link img")[index].src);
        });

        appendBody = '';

        for (var i = 0; i < popup_images_arr.length; i++) {
            if (event.currentTarget == $(".anim_border")[i]) {
                current_slide = i;
                appendBody += '<a href="javascript:void(0)" class="popup-image" style="position: absolute; opacity: 1; visibility: visible"><img src=' + popup_images_arr[i] + '></a>';
            } else {
                appendBody += '<a href="javascript:void(0)" class="popup-image" style="position: absolute;  opacity: 0; visibility: hidden"><img src=' + popup_images_arr[i] + '></a>';
            }
        }

        $("#slides-container").append(appendBody);

        // Slider Width in Window Resize time
        windowElement.resize(function () {
            slideWidth = $("#popup-container").width() * 0.8;
            if (windowElement.width() <= 767) {
                slideWidth = $("#popup-container").width() * 0.9;
            }
        });

        // Slider Width during <=767
        if (windowElement.width() <= 767) {
            slideWidth = $("#popup-container").width() * 0.9;
        }


        for (var i = 0; i < popup_images_arr.length; i++) {
            if (event.currentTarget != $(".anim_border")[i]) {
                $("#popup-container ul").append("<li></li>");
            } else {
                $("#popup-container ul").append("<li class='active'></li>");
            }
        }

        $("#popup-container").css("display", "block").animate({
            opacity: 1
        }, 300);
    });

    body.on("click", ".popup_left",  function () {
        prev_slide = current_slide;
        if (current_slide) {
            current_slide--;
        } else {
            current_slide = slides_length - 1;
        }
        changeSlide();
    });
    body.on("click", ".popup_right",  function () {
        prev_slide = current_slide;
        if (current_slide < slides_length - 1) {
            current_slide++;
        } else {
            current_slide = 0;
        }
        changeSlide();
    });

    body.on("click", "#popup-container li", function () {
        prev_slide = current_slide;
        current_slide = $("#popup-container li").index($(this));
        changeSlide();
    });

    $("#popup-container").on("click", function (e) {
        if ( !$(e.target).is($("#slides-container a img")) && !$(e.target).is($("#popup-container ul li")) && !$(e.target).is($("#popup_block .popup_arrow")) && !$(e.target).is($("#popup_block .popup_arrow i")) )
            $("#popup-container").animate({
                opacity: 0
            }, 300, function () {
                $(this).css("display", "none");
            })

    });

    if($('.nav li.active').length == 0)
    {
        $('.nav li:first-child').addClass('active');
    }
    $('.centered-bottom').attr('style', 'background-position: center bottom !important;');
    $('.carousel-inner .carousel-item:first-child').addClass('active');
    for(i=0 ; i < $('#carouselExampleIndicators .carousel-inner .carousel-item').length ; i++){
        let carousel_active = 'active';
        if(i != 0){
            carousel_active = ''
        }
        $('#carouselExampleIndicators .carousel-indicators').append('<li data-target="#carouselExampleIndicators" data-slide-to="'+i+'" class="'+carousel_active+'"></li>')
    }


/* ----------------------------------------------------------- */
/*  11. Music Discography banners equal width and height
/* ----------------------------------------------------------- */
setTeamMemberHeight();


    /* ----------------------------------------------------------- */
    /*  12.BLOG MANSORY
    /* ----------------------------------------------------------- */
if($('.grid').length > 0){
    window.msnry = new Masonry( '.grid', {
        columnWidth: '.grid-sizer',
        percentPosition: true
    });
}

    /* ----------------------------------------------------------- */
    /*  13.CART NUMBER PICKER
    /* ----------------------------------------------------------- */

    $.fn.numberPicker = function() {
        var dis = 'disabled';
        return this.each(function() {
            var picker = $(this),
                p = picker.find('button:last-child'),
                m = picker.find('button:first-child'),
                input = picker.find('input'),
                min = parseInt(input.attr('min'), 10),
                max = parseInt(input.attr('max'), 10),
                inputFunc = function(picker) {
                    var i = parseInt(input.val(), 10);
                    if ( (i <= min) || (!i) ) {
                        input.val(min);
                        p.prop(dis, false);
                        m.prop(dis, true);
                    } else if (i >= max) {
                        input.val(max);
                        p.prop(dis, true);
                        m.prop(dis, false);
                    } else {
                        p.prop(dis, false);
                        m.prop(dis, false);
                    }
                },
                changeFunc = function(picker, qty) {
                    var q = parseInt(qty, 10),
                        i = parseInt(input.val(), 10);
                    if ((i < max && (q > 0)) || (i > min && !(q > 0))) {
                        input.val(i + q);
                        inputFunc(picker);
                    }
                };
            m.on('click', function(){changeFunc(picker,-1);});
            p.on('click', function(){changeFunc(picker,1);});
            input.on('change', function(){inputFunc(picker);});
            inputFunc(picker); //init
        });
    };
    $('.plusminus').numberPicker();
    $('.minusplus').click(function () {
        $('button[name="update_cart"]').removeAttr('disabled');
    })

    /** 404 Page fiull height **/
    $('.page-404 #header-404').fullHeight();


    /* ----------------------------------------------------------- */
    /*  14.SHOP SORTING DROPDOWN SELECT
    /* ----------------------------------------------------------- */
    $(".dropdown-menu li a").on('click', function () {
        var selText = $(this).text();
        $(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
    });

    /* ----------------------------------------------------------- */
    /*  15.SINGLE PRODUCT IMAGE ZOOM
    /* ----------------------------------------------------------- */
    var $zoom = $('.zoom').magnify();


    /* ----------------------------------------------------------- */
    /*  16.PAYMENT RADIO BUTTON
    /* ----------------------------------------------------------- */

    $('.pay-text').css('display','none');
    if ($(".paypal input").is(':checked')) {
        $(".paypal input").closest('.custom-control').find('.pay-text').css('display','block');
        $(".paypal input").closest('.custom-control').siblings().find('.pay-text').css('display','none');
    } else {
        $(".ubs input").closest('.custom-control').find('.pay-text').css('display','block');
        $(".ubs input").closest('.custom-control').siblings().find('.pay-text').css('display','none');
    }
    $(body).on("change", ".paypal input, .ubs input", function () {
            $(this).closest('.custom-control').find('.pay-text').css('display','block');
            $(this).closest('.custom-control').siblings().find('.pay-text').css('display','none');
    });

    // Add To Cart
    var nav = $('.shop-view-cart'),
        animateTime = 300,
        navLink = $('.catd-button');
    nav.css({'height':'0'});
    navLink.on('click',function(){
        nav.css({overflow:'visible'});
        if(nav.height() === 0){
            autoHeightAnimate(nav, animateTime);
        }
    });

/* Function to animate height: auto */
    function autoHeightAnimate(element, time) {
    var curHeight = element.height(), // Get Default Height
        autoHeight = element.css('height', 'auto').height() + 30; // Get Auto Height
    element.height(curHeight); // Reset to Default Height
    element.stop().animate({height: autoHeight}, time); // Animate to Auto Height
}

    // Auto complete Search focus
    body.on("click", ".chosen-single", function () {
        $('.chosen-search input').focus();
        // $('.chosen-search input').trigger('click');
    });
    /* COUNTRY SELECT */
    if($('.chosen-select').length > 0){
        $('.chosen-select').chosen();
        $('.chosen-select-deselect').chosen({ allow_single_deselect: true });
    }
    $('#shipping_method li').click(function () {
        $('.shipping-method').find('.dropdown-toggle').html($(this).find('label').html());
    });
    $('.checkout_coupon').css('display','flex');
    //for big title alignment
    if(!$('.title-image img').length){
        $('.global-title').css({"position":"relative","padding":"0"});
        $(window).resize(function(){
            if (window.matchMedia("(min-width:1025px) and (max-width: 1380px)").matches) {
                $('#page-title').css({"margin":"92px 0px 70px"});
            } else  if(window.matchMedia("(min-width:768px) and (max-width: 1024px)").matches){
                $('#page-title').css({"margin":"75px 0px 52px"});
            }else  if(window.matchMedia("(min-width:576px) and (max-width: 767px)").matches){
                $('#page-title').css({"margin":"51px 0px 34px"});
            }else if(window.matchMedia("(max-width: 575px)").matches){
                $('#page-title').css({"margin":"37px 0px 34px 0px"});
            }else{
                $('#page-title').css({"margin":"140px 0px 104px 0px"});
            }
        });
    }

    /* ----------------------------------------------------------- */
    /*  17.userAgent for browser
     /* ----------------------------------------------------------- */
    if (navigator.userAgent.search("MSIE") >= 0) {
        $('body').addClass('msie');
    }
    else if (navigator.userAgent.search("Chrome") >= 0) {
        $('body').addClass('chrome');
    }
    else if (navigator.userAgent.search("Firefox") >= 0) {
        $('body').addClass('firefox');
    }
    else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
        $('body').addClass('safari');
    }
    else if (navigator.userAgent.search("Opera") >= 0) {
        $('body').addClass('opera');
    }
    else if (navigator.userAgent.search("NET") >= 0) {
        $('body').addClass('net');
    }
    else if (navigator.userAgent.search("Edge") >= 0) {
        $('body').addClass('edge');
    }


    /* ----------------------------------------------------------- */
    /*  18.DISPLAY MAP AFTER CLICK
    /* ----------------------------------------------------------- */
    if(!$('body').hasClass('white')){
        $(".overly-1").on("click", function (e) {
            e.stopPropagation();
            if ($(e.target).is($(".overly-1")))
                $(".overly-1").animate({
                    opacity: 0
                }, 300, function () {
                    $(this).css("display", "none");
                });
            $("#text-and-video").css('position','relative');
        });
        $("body.single-js_events").on("click", function (event) {
            event.stopPropagation();
            $(".overly-1").css("display", "block").animate({
                opacity: 1
            }, 300);
            $("#text-and-video").css('position','initial');
        });
    }




    /** Function for Explorer ****/
    $(document).ready(msieversion);

    if (navigator.userAgent.search("NET") >= 0) {
        if ( ! Modernizr.objectfit ) {
            if($('body').hasClass('rocks')){
                $('.music-banner-image').each(function () {
                    var $container = $(this),
                        imgUrl = $container.find('img').prop('src');
                    if (imgUrl) {
                        $container
                            .css('backgroundImage', 'url(' + imgUrl + ')')
                            .addClass('compat-object-fit');
                    }
                });
            }
            jQuery('.music-banner .w-100').each(function () {
                var $container = jQuery(this),
                    imgUrl = $container.find('img').prop('src');
                if (imgUrl) {
                    $container
                        .css('backgroundImage', 'url(' + imgUrl + ')')
                        .addClass('compat-object-fit');
                }
            });

            jQuery('.embed-responsive .youtube').each(function () {
                var $container = jQuery(this),
                    imgUrl = $container.find('img').prop('src');
                if (imgUrl) {
                    $container
                        .css('backgroundImage', 'url(' + imgUrl + ')')
                        .addClass('compat-object-fit');
                }
            });

            jQuery('.video-block .video-img-banner').each(function () {
                var $container = jQuery(this),
                    imgUrl = $container.find('img').prop('src');
                if (imgUrl) {
                    $container
                        .css('backgroundImage', 'url(' + imgUrl + ')')
                        .addClass('compat-object-fit');
                }
            });

            jQuery('.grid-item-img').each(function () {
                var $container = jQuery(this),
                    imgUrl = $container.find('img').prop('src');
                if (imgUrl) {
                    $container
                        .css('backgroundImage', 'url(' + imgUrl + ')')
                        .addClass('compat-object-fit');
                }
            });

            jQuery('.blog-grid-image').each(function () {
                var $container = jQuery(this),
                    imgUrl = $container.find('img').prop('src');
                if (imgUrl) {
                    $container
                        .css('backgroundImage', 'url(' + imgUrl + ')')
                        .addClass('compat-object-fit');
                }
            });

            jQuery('.featured-image').each(function () {
                var $container = jQuery(this),
                    imgUrl = $container.find('img').prop('src');
                if (imgUrl) {
                    $container
                        .css('backgroundImage', 'url(' + imgUrl + ')')
                        .addClass('compat-object-fit');
                }
            });

            jQuery('.t-shirt-image').each(function () {
                var $container = jQuery(this),
                    imgUrl = $container.find('img').prop('src');
                if (imgUrl) {
                    $container
                        .css('backgroundImage', 'url(' + imgUrl + ')')
                        .addClass('compat-object-fit');
                }
            });
        }
    }

/* ----------------------------------------------------------- */
/*  19.BLOG MASONRY HOVER FUNCTION
 /* ----------------------------------------------------------- */

    jQuery("body").on("mouseover", "#blog-mansory-section > .grid > .grid-item", function(){
        jQuery(".grid-item").not(this).not(".active").addClass("active");
        jQuery(this).removeClass("active");
    });
    jQuery("body").on("mouseout", "#blog-mansory-section > .grid > .grid-item" , function(){
        if (!jQuery(".grid-item:hover").length) {
            jQuery(".grid-item.active").removeClass("active");
        }
    });

});

/* ----------------------------------------------------------- */
/*  20.PRE LOADER
/* ----------------------------------------------------------- */
windowElement.on('load', function(){
    jQuery('#preloader').fadeOut('slow',function(){
        jQuery(this).remove();
    });
    if(!jQuery('.title-image img').length) {
        if (window.matchMedia("(min-width: 1025px) and (max-width: 1380px)").matches) {
            jQuery('#page-title').css({"margin": "92px 0px 70px"});
        } else if (window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches) {
            jQuery('#page-title').css({"margin": "75px 0px 52px"});
        } else if (window.matchMedia("(min-width:576px) and (max-width: 767px)").matches) {
            jQuery('#page-title').css({"margin": "51px 0px 34px"});
        } else if (window.matchMedia("(max-width: 575px)").matches) {
            jQuery('#page-title').css({"margin": "37px 0px 34px 0px"});
        } else {
            jQuery('#page-title').css({"margin": "140px 0px 104px 0px"});
        }
    }
    if ( jQuery(body).css('background-image') != 'none' || jQuery('.canvas_image.lc_lif_background_image').length ) {
        jQuery.each(jQuery("body > div, #lc_lif_content > div"), function (index, value) {
            if ( !jQuery(value).find(".section_bg_image").length && jQuery(value).attr("id") != "wpadminbar" ) {
                jQuery(this).addClass('no-bg-color');
                jQuery(this).css('opacity', 1);
            }
        })
    }
});

/* ----------------------------------------------------------- */
/*  21 .SCROLL SECTINO
/* ----------------------------------------------------------- */

$(function(){
    $(".creative_menu a").on('click', function(){
        $("html, body").animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });
});