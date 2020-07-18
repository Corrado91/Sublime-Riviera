
jQuery(document).ready(function($) {
	// 'use strict';

	ajaxCF($);
});

var ajaxCF = function($) {
	if (!$('form.beatswave_contactform').length) {
		return;
	}
	$("form.beatswave_contactform").submit(function(event) {
        $('.beatswave_cf_error').removeAttr('style');
		event.preventDefault();

		var name = $.trim($(this).find("input#contactName").val());
		var email = $.trim($(this).find("input#contactemail").val());
		var website = $.trim($(this).find("input#contactWebsite").val());
		var message = $.trim($(this).find("textarea#commentsText").val());
		var required_is_empty = false;

		if ('' == name) {
			required_is_empty = true;
			$(this).find('.comment-form-author').find('.beatswave_cf_error').show('slow');
		}

		if ('' == email) {
			required_is_empty = true;
			$(this).find('.comment-form-email').find('.beatswave_cf_error').show('slow');
		}

		if ('' == message) {
			required_is_empty = true;
			$(this).find('.comment-form-comment').find('.beatswave_cf_error').show('slow');
		}

		if (required_is_empty) {
			return;
		}

		var data = {
			action: 'beatswavecontactform_action',
			data: $(this).find(":input").serialize()
		};

		$.post(DATAVALUES.ajaxurl, data, function(response) {
			var obj;
			
			try {
				obj = $.parseJSON(response);
			}
			catch(e) {
				alert("Unexpected problem occurred when sending the email.");
				return;
			}

			if(obj.success === true) {
				$("form.beatswave_contactform").find(".formResultOK").find(".beatswave_cf_error").show("slow");

				$("form.beatswave_contactform").find("input#contactName").val('');
				$("form.beatswave_contactform").find("input#contactemail").val('');
				$("form.beatswave_contactform").find("input#phone").val('');
				$("form.beatswave_contactform").find("textarea#commentsText").val('');
			} else {
				if (obj.error === 'wp_mail_failed') {
					$("form.beatswave_contactform").find(".wp_mail_error").find(".beatswave_cf_error").show("slow");
				}
			}
		});		

	});
}