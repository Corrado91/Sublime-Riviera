jQuery(document).ready(function($) {
	'use strict';

	handleCoverBgImage($);
	logoInTheMiddle($);
	handleBgColor($);
	setTransitionForCreativeTopItems($, 0);
	handleHmbMenu($);
	handleQuotes($);
	runMasonryGallery($);
	runMasonryBlog($);
	runMasonryBlog($);
	stickyMenu($);
	backToTop($);
	clickOnSearchIcon($);
	handleMobile($);
	handleVideoImageContainer($);
	handleAlbumImageContainer($);
	justifiedGallery($);
	ajaxVcCfResponsive($);
	runUnslider($);
	handleParallax($);
	handleGoToNextSection($);
	hanldeJsLinks($);
	setTimeout(function(){
		setContentHeight($);	
	}, 800);
	wavePlayer($);



	$(window).scroll(function() {
         stickyMenu($);
    });

	$(window).on("debouncedresize", function(event) {
		runMasonryGallery($);
		runMasonryBlog($);
		handleVideoImageContainer($);
		handleAlbumImageContainer($);
		ajaxVcCfResponsive($);
		setTimeout(function(){
			setContentHeight($);	
		}, 400);
		handleCenteredMenu($);
	});
});

function runMasonryGallery($) {
	if (!$('.lc_masonry_container').length) {
		return;
	}

	var $grid = $('.lc_masonry_container').imagesLoaded( function() {

		$grid.find('.lc_single_gallery_brick').each(function(){
			var brick_height = Math.ceil($(this).find('img').height()); 
			$(this).css("height", brick_height);
		});

		$grid.masonry({
			itemSelector: '.lc_masonry_brick',
			percentPosition: true,
			columnWidth: '.brick-size',
		}); 
	});
}

function runMasonryBlog($) {
	if (!$('.lc_blog_masonry_container').length) {
		return;
	}

	var $grid = $('.lc_blog_masonry_container').imagesLoaded( function() {
		var default_width = $('.blog-brick-size').width();
		var default_height = 3/4 * default_width;
		var is_grid_layout = false;
		var no_portrait_allowed = false;
		var fixed_content_height_mobile = 1.6;

		if ($grid.hasClass("grid_container")) {
			is_grid_layout = true;
		}

		if (default_width < 300) {
			if ($('.blog-brick-size').parent().width() > 550) {
				$('.blog-brick-size').removeClass('brick3');
				$('.blog-brick-size').addClass('brick2');
				default_width = $('.blog-brick-size').width();
			} else {
				default_width = $('.blog-brick-size').parent().width();
			}
			default_height = 3/4 * default_width;
		}

		if ((2 * default_width - $grid.width()) > 1) {
			no_portrait_allowed = true;
		}

		$('.lc_blog_masonry_brick').each(function(){
			
				if ($(this).hasClass('has_thumbnail')) {
					
					var $image = $(this).find('img.lc_masonry_thumbnail_image');
					var img_src = $image.attr("src");

					var $cover_div = $(this).find(".brick_cover_bg_image");
					$cover_div.addClass("lc_cover_bg");
					$cover_div.css("background-image", "url("+img_src+")");
					
					var imageObj = new Image();
					imageObj.src = $image.attr("src");

					if (is_grid_layout || no_portrait_allowed) {
						$(this).css("width", default_width);
						$(this).css("height", default_height);
						if (default_width < 380) {
							$(this).css("height", fixed_content_height_mobile * default_height);
						}
					} else {
						if (imageObj.naturalWidth / imageObj.naturalHeight >= 1.6) {
							$(this).addClass("landscape_brick");
							$(this).css("width", 2*default_width);
							$(this).css("height", default_height);
						} else if (imageObj.naturalHeight / imageObj.naturalWidth >= 1.5) {
							$(this).addClass("portrait_brick");
							$(this).css("width", default_width);
							$(this).css("height", 2*default_height);
						} else {
							$(this).css("width", default_width);
							$(this).css("height", default_height);
						}
					}
				} else {
						$(this).css("width", default_width);
						$(this).css("height", default_height);
						if (default_width < 380) {
							$(this).css("height", fixed_content_height_mobile * default_height);
						}
				}
		});


		$grid.masonry({
			itemSelector: '.lc_blog_masonry_brick',
			percentPosition: true,
			columnWidth: '.blog-brick-size',
		});
		$grid.fadeTo("400", 1);
	});
}

function handleQuotes($) {
	$('blockquote').each(function(){
		$(this).prepend($('<i class="fa fa-quote-right" aria-hidden="true"></i>'));
	});
}

function handleCoverBgImage($) {
	$( ".lc_lif_background_image" ).each(function() {
		var imgSrc = $(this).data("bgimage");
		$(this).css("background-image", "url("+imgSrc+")");
		$(this).css("background-position", "center center");
		$(this).css("background-repeat", "no-repeat");
		$(this).css("background-size","cover");
	});		
}

function handleBgColor($) {
	$( ".lc_lif_overlay" ).each(function() {
		var bgColor = $(this).data("color");
		
		$(this).parent().css("position", "relative");
		
		$(this).css({
			"background-color" : bgColor,
			"position" : "absolute"
		});
	});

	$( ".lc_lif_bg_color" ).each(function() {
		var bgColor = $(this).data("color");
		$(this).css("background-color", bgColor)
	});
}

function handleHmbMenu($) {
	$( ".hmb_menu" ).hover(
		function() {
			$(this).find('.hmb_line').addClass('hover');
		}, function() {
			$(this).find('.hmb_line').removeClass('hover');
		}
	);

	$('.hmb_menu').click(function() {
		$(this).find('.hmb_line').toggleClass('click');

		if ($(this).hasClass('hmb_creative')) {
			$('.nav_creative_container').toggleClass('visible_container');

			var resetValues = $('.nav_creative_container .creative_menu ul.menu > li').hasClass('menu_item_visible') ? 1 : 0;
			setTransitionForCreativeTopItems($, resetValues);
			$('.nav_creative_container .creative_menu ul.menu > li').toggleClass('menu_item_visible');
		}

		if ($(this).hasClass('hmb_mobile')) {
				if ($('header').hasClass('sticky_enabled')) {
					$("body").animate({ scrollTop: 0 }, 400, function(){
							showMobileMenuContainer($);
					});
				} else {
					showMobileMenuContainer($);
				}
			}		
		});
}

var setTransitionForCreativeTopItems = function($, resetValues) {
	if (!$(".nav_creative_container").length) {
		return;
	}

	if (resetValues == 1) {
		$('.nav_creative_container .creative_menu ul.menu > li').each(function(){
			$(this).css({
				"-webkit-transition-delay"	: "0s",
				"-moz-transition-delay"		: "0s",
				"transition-delay"			: "0s"
			});
		})

		return;
	}

	var start_delay = 2;
	var elt_duration = "";
	$('.nav_creative_container .creative_menu ul.menu > li').each(function(){
		start_delay += 1;
		if (start_delay < 10) {
			elt_duration = "0."+start_delay+"s";
		} else {
			elt_duration = start_delay/10+"s";
		}

		$(this).css({
			"-webkit-transition-delay"	: elt_duration,
			"-moz-transition-delay"		: elt_duration,
			"transition-delay"			: elt_duration
		});
	});
}

var showMobileMenuContainer = function($) {
	$('.mobile_navigation_container').toggle();
	$('.mobile_navigation_container').toggleClass('mobile_menu_opened');	
}

function setContentHeight($) {
	if (!$('#lc_lif_content').length) {
		return;
	}
    if ($('body').hasClass('page-template-template-visual-composer')) {
		if ($('.lc_copy_area').length) {
				$('.lc_copy_area').css("opacity", "1");
		}
        return;
    }	
	$('#lc_lif_content').css("min-height", "");

	var totalHeight = $('#lc_lif_wrapper').height();
	if ($('#heading_area').length > 0) {
		totalHeight -= $('#heading_area').height();
	}
	if ($('#footer_sidebars').length) {
		totalHeight -= $('#footer_sidebars').height();
	}

	if ($('.lc_copy_area ').length) {
		totalHeight -= $('.lc_copy_area').height();
	}

	var minContentHeight = $('#lc_lif_content').data("minheight");
	if ($('#lc_lif_content').length) {
		if (totalHeight > minContentHeight) {
			$('#lc_lif_content').css('min-height', totalHeight);
		}
	}

	if ($('.lc_copy_area').length) {
		$('.lc_copy_area').css("opacity", "1");
	}
}

function stickyMenu($) {
	if (!$('header').hasClass('lc_sticky_menu')) {
		return;
	}
	if ($('.mobile_navigation_container').hasClass('mobile_menu_opened')) {
		return;
	}

	var triggerSticky = 100;
	if ($(window).scrollTop() > triggerSticky) {
		enableSticky($);
	} else {
		disableSticky($);
	}
}

var enableSticky = function($) {
	if ($('header').hasClass('sticky_enabled')) {
		return;
	}

	$('header').css("visibility", "hidden")
	$('header').addClass('sticky_enabled');
	$('header').css("visibility", "visible");
}

var disableSticky = function($) {
	var element = $('header');
	if ($(element).hasClass('sticky_enabled')) {
			$(element).removeClass('sticky_enabled');

			if(0 == $(element).attr("class").length) {
				$(element).removeAttr("class");
			}
	}
}

var backToTop = function($) {
	if (!$('.lc_back_to_top_btn').length) {
		return;
	}

	var backToTopEl = $('.lc_back_to_top_btn');
	$(backToTopEl).click(function(){
		$("html, body").animate({ scrollTop: 0 }, "slow");
	});

	$(window).scroll(function() {
		if ($(window).scrollTop() < 200) {
			$(backToTopEl).hide();
		} else {
			$(backToTopEl).show('slow');
		}
	});	
}


var clickOnSearchIcon = function($) {
	$('.trigger_global_search').click(function(){
		$('#lc_global_search').show();
	});

	$('.close_search_form').click(function(){
		$('#lc_global_search').hide();
	});

	$(document).keyup(function(e) {
		/* escape key maps to keycode `27`*/
	    if (e.keyCode == 27) { 
			$('#lc_global_search').hide();
	    }
	});	
}

var handleMobile = function($) {
	$('nav.mobile_navigation').find('ul li.menu-item-has-children > a').click(function(event){
		event.preventDefault();
		$(this).parent().find('> ul').toggle('300');
	});
}

var handleVideoImageContainer = function($) {
	if (!$('.video_image_container').length) {
		return;
	}

	$('.video_image_container').each(function() {
		var no_px_width = parseFloat($(this).css('width'));
		$(this).css("height", no_px_width * 9/16);
		$(this).parent().parent().css("opacity", 1);
	});
}

var handleAlbumImageContainer = function($) {
	if (!$('.album_image_container').length) {
		return;
	}

	$('.album_image_container').each(function() {
		var no_px_width = parseFloat($(this).css('width'));
		$(this).css("height", no_px_width);
		$(this).parent().parent().css("opacity", 1);
	});	
}

var justifiedGallery = function($) {
	if (!$('.lc_lif_justified_gallery').length) {
		return;
	}

	$(".lc_lif_justified_gallery").each(function() {
		var rowHeight = $(this).data("rheight");
		if (!$.isNumeric(rowHeight)) {
			rowHeight = 180;
		}

		$(this).justifiedGallery({
			rowHeight: rowHeight,
			lastRow: 'justify',
			margins: 0,
			captions: false,
			imagesAnimationDuration: 400
		});

		$(this).find("img").fadeTo("600", 0.6);
		$(this).parent().find('.view_more_justified_gallery').fadeTo("400", 1);
	});

	setTimeout(function(){
		$('.img_box').find("img").addClass("transition4");
	}, 600);

}

var ajaxVcCfResponsive = function($) {
	if (!$(".vc_lc_contactform").length) {
		return;
	}

	var containerWidth = $(".vc_lc_contactform").width();
	if (containerWidth <= 768) {
		$(".vc_lc_contactform").find(".vc_lc_element").removeClass("three_on_row");
	} else {
		$(".vc_lc_contactform").find(".three_on_row_layout").addClass("three_on_row");
	}
}

var runUnslider = function($) {
	$('.lc_reviews_slider').each(function(){
		var slide_speed = 400;
		var slide_delay = 4000;

		if (typeof $(this).parent().data('slidespeed') !== 'undefined') {
			slide_speed = $(this).parent().data('slidespeed');
		}
		if (typeof $(this).parent().data('slidedelay') !== 'undefined') {
			slide_delay = $(this).parent().data('slidedelay');
		}		

		$(this).unslider({
			arrows: {
				prev: '<a class="unslider-arrow prev"><i class="fa fa-angle-left" aria-hidden="true"></i></a>',
				next: '<a class="unslider-arrow next"><i class="fa fa-angle-right" aria-hidden="true"></i></a>',
			},
			autoplay: true,
			delay: slide_delay,
			speed: slide_speed
		});		
	});


}

var handleParallax = function($) {
	$( ".lc_lif_parallax" ).each(function() {
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			$(this).addClass("ai_lif_no_scroll");
		} else {
			$(this).css("background-position", "50% 0");
			var $parallaxObject = $(this);
			
			$(window).scroll(function() {
				var yPos = -($(window).scrollTop() / $parallaxObject.data("pspeed")); 
				var newCoord = '50% '+ yPos + 'px';
				
				$parallaxObject.css("background-position", newCoord);
			});
		}
	});	
}

var  handleGoToNextSection = function($) {
	if (!$('.goto_next_section').length) {
		return;
	}

	var animateIcon = function(targetElement, speed){
	    $(targetElement).css({'padding-top':'0px'});
	    $(targetElement).css({'opacity':'1'});
	    $(targetElement).animate(
	        {
	        	'padding-top'	: "25px",
	        	"opacity"		: "0"
	    	},
	        {
	        duration: speed,
	        complete: function(){
	            animateIcon($('.goto_next_section i'), speed);
	            }
	        }
	    );
	};
	setTimeout(function(){
		animateIcon($('.goto_next_section i'), 2000);
	}, 3000);
	
	$('.goto_next_section').click(function(){
		var $nextRow = $(this).parents('.vc_row').next();
		if($nextRow.length) {
			$('html, body').animate({
        		scrollTop: $nextRow.offset().top
    		}, 1200);
		}
	});

}

var hanldeJsLinks = function($) {
	if (!$('.lc_js_link').length) {
		return;
	}

	$('.lc_js_link').click(function(event) {
		event.preventDefault();
		var newLocation = $(this).data("href");
		var newWin = '';
		if ($(this).data("target")) {
			newWin = $(this).data("target");
		}
		window.open(newLocation, newWin);
	});
}

var logoInTheMiddle = function($) {
    if (!$('.centered_menu').length) {
        return;
    }

    var middleMenuPosition = Math.ceil($("nav.centered_menu ul.nav.flex-column > li").length / 2);
    $("nav.centered_menu ul.nav.flex-column > li:nth-child(" + middleMenuPosition + ")").after('<li class="nav-item nav-logo"></li>');
    $('#logo').detach().appendTo('li.nav-item.nav-logo');
    $('#logo').css("opacity", "1");
    $(".header-continer.centered_menu > .section").animate({ opacity: 1 }, "slow");

    /*center menu to the screen*/
    handleCenteredMenu($);
}

var handleCenteredMenu = function($) {
    if (!$('nav.centered_menu').length) {
        return;
    }

    var classic_icons_correnction = 0 - $('header_items.centered_menu').outerWidth();
    $('.header_items.centered_menu').css("margin-right", classic_icons_correnction);
}
function wavePlayer($) {
	if (!$('.lc_wave_player_container').length) {
		return;
	}

	$('.lc_wave_player_container').each(function(){
		var $player = $(this);
		var $play_btn = $player.find('.fa-play-circle');
		var $pause_btn = $player.find('.fa-pause-circle');
		var $fwd_btn = $player.find('.fa-step-forward');
		var $bkw_btn = $player.find('.fa-step-backward');
		var $progress_bar = $player.find('.progress_bar');
		var $first_song = $player.find('.wave_player_entry').first();
		var $last_song = $player.find('.wave_player_entry').last();
		var wave_col = $player.data('wavecol');
		var wave_prog_col = $player.data('waveprogcol');
		var autoplay = $player.data('autoplay');

		var wavesurfer = WaveSurfer.create({
			container: '.lc_waveform',
			hideScrollbar : true,
			normalize : true,
			waveColor : wave_col,
			progressColor: wave_prog_col,
			/*renderer: 'MultiCanvas',*/
			/*partialRender: true,*/
			pixelRatio : 1,
			minPxPerSec: 1,
			height: 80
		});

		/*set the colors*/
		$progress_bar.css("background-color", wave_col);

		/*load the 1st song*/
		wavesurfer.load($first_song.data('mediafile'));
		$player.find('.wave_player_entry').first().addClass("now_playing");

		wavesurfer.on('loading', function(progress_amount) {
			if ("none" == $progress_bar.css("display")) {
				$progress_bar.show();	
			}
			$progress_bar.css("width", progress_amount + "%");
		});

		$play_btn.click(function() {
			$play_btn.toggle();
			$pause_btn.toggle();
			wavesurfer.play();
		});
		$pause_btn.click(function() {
			$play_btn.toggle();
			$pause_btn.toggle();
			wavesurfer.pause();
		});
		$fwd_btn.click(function() {
			var $crt_elt = $player.find('.wave_player_entry.now_playing');
			var $next_elt = $crt_elt.next();
			if (!$next_elt.length) {
				$next_elt = $first_song;
			}			
			$crt_elt.removeClass('now_playing');
			$next_elt.addClass('now_playing');
			wavesurfer.load($next_elt.data('mediafile'));

		});
		$bkw_btn.click(function() {
			var $crt_elt = $player.find('.wave_player_entry.now_playing');
			var $prev_elt = $crt_elt.prev();
			if (!$prev_elt.length) {
				$prev_elt = $last_song;
			}
			$crt_elt.removeClass('now_playing');
			$prev_elt.addClass('now_playing');
			wavesurfer.load($prev_elt.data('mediafile'));
		});			
		
		wavesurfer.on('ready', function () {
    		$progress_bar.hide();
		});
		wavesurfer.on('finish', function () {
    		$play_btn.show();
			$pause_btn.hide();
		});		

		if ("yes" == autoplay) {
			wavesurfer.on('ready', function () {
    			wavesurfer.play();
				$play_btn.hide();
				$pause_btn.show();    			
			});
		}

		/*progressColor, waveColor, maxCanvasWidth, hideScrollbar*/
		$player.find('.wave_player_entry').click(function(){
			if (wavesurfer.isPlaying()) {
				wavesurfer.stop();
				/*wavesurfer.empty();*/
			}
			wavesurfer.load($(this).data('mediafile'));
			$player.find('.wave_player_entry.now_playing').removeClass('now_playing');
			$(this).addClass('now_playing');

			wavesurfer.on('ready', function () {
    			wavesurfer.play();
			});
		});
	});


}