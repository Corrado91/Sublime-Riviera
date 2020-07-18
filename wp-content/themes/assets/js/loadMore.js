jQuery(function($){
    $('.see-more a').click(function(e){

        e.preventDefault();

        var button = $(this),
            data = {
                'action': 'loadmore',
                'query': loadmore_params.posts, // get params from wp_localize_script() function
                'page' : loadmore_params.current_page,
                'type' : button.data("type")
            };

        $.ajax({
            url : loadmore_params.ajaxurl, // AJAX handler
            data : data,
            type : 'POST',
            beforeSend : function ( xhr ) {
                button.text('Loading...'); // change the button text, you can also add a preloader image
            },
            success : function( data ){
                if( data ) {
                    if (button.data("type") == "grid") {
                        button.text( 'SEE MORE' ).closest("#blog-grid-gallery").find('.grid').append(data).after(); // insert new posts

                        setTimeout(function(){        window.msnry = new Masonry( '.grid', {
                            columnWidth: '.grid-sizer',
                            percentPosition: true
                        })}, 13);

                        loadmore_params.current_page++;


                    } else if (button.data("type") == "masonry") {
                        button.text( 'SEE MORE' ).closest("#blog-mansory-section").find('.grid').append(data); // insert new posts

                        loadmore_params.current_page++;
                        window.msnry = new Masonry( '.grid', {
                            columnWidth: '.grid-sizer',
                            percentPosition: true
                        });

                    } else if (button.data("type") == "standard") {
                        button.text( 'SEE MORE' ).closest('.see-more').before(data); // insert new posts

                        loadmore_params.current_page++;
                    } else if (button.data("type") == "search") {
                        button.text( 'SEE MORE' ).closest('.see-more').before(data); // insert new posts

                        loadmore_params.current_page++;
                    }

                    if ( loadmore_params.current_page == loadmore_params.max_page )
                        button.closest(".see-more").remove(); // if last page, remove the button
                } else {
                    button.closest(".see-more").remove(); // if no data, remove the button as well
                }
            }
        });
    });
});