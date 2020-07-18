var loadmore_params = {"ajaxurl":"http:\/\/items.lifeinsys.com\/item\/beatswavewp\/white\/wp-admin\/admin-ajax.php","posts":"{\"posts_per_page\":9,\"orderby\":\"post_date\",\"order\":\"DESC\",\"post_type\":[\"post\"],\"post_status\":\"publish\",\"suppress_filters\":true,\"error\":\"\",\"m\":\"\",\"p\":0,\"post_parent\":\"\",\"subpost\":\"\",\"subpost_id\":\"\",\"attachment\":\"\",\"attachment_id\":0,\"name\":\"\",\"static\":\"\",\"pagename\":\"\",\"page_id\":0,\"second\":\"\",\"minute\":\"\",\"hour\":\"\",\"day\":0,\"monthnum\":0,\"year\":0,\"w\":0,\"category_name\":\"\",\"tag\":\"\",\"cat\":\"\",\"tag_id\":\"\",\"author\":\"\",\"author_name\":\"\",\"feed\":\"\",\"tb\":\"\",\"paged\":0,\"meta_key\":\"\",\"meta_value\":\"\",\"preview\":\"\",\"s\":\"\",\"sentence\":\"\",\"title\":\"\",\"fields\":\"\",\"menu_order\":\"\",\"embed\":\"\",\"category__in\":[],\"category__not_in\":[],\"category__and\":[],\"post__in\":[],\"post__not_in\":[],\"post_name__in\":[],\"tag__in\":[],\"tag__not_in\":[],\"tag__and\":[],\"tag_slug__in\":[],\"tag_slug__and\":[],\"post_parent__in\":[],\"post_parent__not_in\":[],\"author__in\":[],\"author__not_in\":[],\"ignore_sticky_posts\":false,\"cache_results\":true,\"update_post_term_cache\":true,\"lazy_load_term_meta\":true,\"update_post_meta_cache\":true,\"nopaging\":false,\"comments_per_page\":\"50\",\"no_found_rows\":false}","current_page":"1","max_page":"2"};

if (setREVStartSize !== undefined) setREVStartSize(
    { c: '#rev_slider_1_1', gridwidth: [1240], gridheight: [868], sliderLayout: 'fullscreen', fullScreenAutoWidth: 'off', fullScreenAlignForce: 'off', fullScreenOffsetContainer: '', fullScreenOffset: '' });

var revapi1,
    tpj;
(function () {
    if (!/loaded|interactive|complete/.test(document.readyState)) document.addEventListener("DOMContentLoaded", onLoad)
    else
        onLoad();

    function onLoad() {
        if (tpj === undefined) {
            tpj = jQuery;

            if ("on" == "on") tpj.noConflict();
        }
        if (tpj("#rev_slider_1_1").revolution == undefined) {
            revslider_showDoubleJqueryError("#rev_slider_1_1");
        } else {
            revapi1 = tpj("#rev_slider_1_1").show().revolution({
                sliderType: "hero",
                jsFileLocation: "//items.lifeinsys.com/item/beatswavewp/white/wp-content/plugins/revslider/public/assets/js/",
                sliderLayout: "fullscreen",
                dottedOverlay: "none",
                delay: 9000,
                visibilityLevels: [1240, 1024, 778, 480],
                gridwidth: 1240,
                gridheight: 868,
                lazyType: "smart",
                parallax: {
                    type: "mouse",
                    origo: "enterpoint",
                    speed: 400,
                    speedbg: 0,
                    speedls: 0,
                    levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 55],
                    disable_onmobile: "on"
                },
                shadow: 0,
                spinner: "spinner2",
                autoHeight: "off",
                fullScreenAutoWidth: "off",
                fullScreenAlignForce: "off",
                fullScreenOffsetContainer: "",
                fullScreenOffset: "",
                disableProgressBar: "on",
                hideThumbsOnMobile: "off",
                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                debugMode: false,
                fallbacks: {
                    simplifyAll: "off",
                    disableFocusListener: false,
                }
            });
        }; /* END OF revapi call */

    }; /* END OF ON LOAD FUNCTION */
}()); /* END OF WRAPPING FUNCTION */