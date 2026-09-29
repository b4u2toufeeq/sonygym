/**
 * WEBSITE: https://themefisher.com
 * TWITTER: https://twitter.com/themefisher
 * FACEBOOK: https://www.facebook.com/themefisher
 * GITHUB: https://github.com/themefisher/
 */

(function ($) {
	'use strict';

	// Brand: current year in the footer credit line
	$('.js-year').text(new Date().getFullYear());

	// Solid header once the page is scrolled. The previous version read
	// $('.navigation').offset().top, which is always 0 for a fixed element,
	// so the header never turned opaque.
	var $nav = $('.navigation');

	function updateHeader() {
		$nav.toggleClass('fixed-nav', $(window).scrollTop() > 100);
	}

	$(window).on('scroll resize', updateHeader);
	updateHeader();

	// Collapse the mobile menu after a link is chosen
	$('.navbar-nav a[href]').on('click', function () {
		$('#navbarsid').collapse('hide');
	});


	$('.portfolio-gallery').each(function () {
		$(this).find('.popup-gallery').magnificPopup({
			type: 'image',
			gallery: {
				enabled: true
			}
		});
	});


	$('#contact-form').validate({
		rules: {
			name: {
				required: true,
				minlength: 2
			},
			email: {
				required: true,
				email: true
			},
			subject: {
				required: true,
				minlength: 3
			},
			message: {
				required: true,
				minlength: 10
			}
		},
		messages: {
			name: {
				required: 'Please tell us your name',
				minlength: 'Your name must be at least 2 characters'
			},
			email: {
				required: 'Please put your email address',
				email: 'That email address does not look right'
			},
			subject: {
				required: 'Please add a subject so we can route this to the right coach',
				minlength: 'Please add a slightly longer subject'
			},
			message: {
				required: 'Please write your message',
				minlength: 'Please give us a little more detail than that'
			}

		},
		submitHandler: function (form) {
			$(form).ajaxSubmit({
				type: 'POST',
				data: $(form).serialize(),
				url: 'sendmail.php',
				success: function () {
					$('#contact-form #success').fadeIn();
					$('#contact-form #error').hide();
					$(form).trigger('reset');
				},
				error: function () {

					$('#contact-form #error').fadeIn();
					$('#contact-form #success').hide();
				}
			});
		}
	});



	$('.testimonial-slider').slick({
		slidesToShow: 1,
		infinite: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 5000,
		dots: true
	});




	// Init Magnific Popup
	$('.portfolio-popup').magnificPopup({
		delegate: 'a',
		type: 'image',
		gallery: {
			enabled: true
		},
		mainClass: 'mfp-with-zoom',
		navigateByImgClick: true,
		arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
		tPrev: 'Previous (Left arrow key)',
		tNext: 'Next (Right arrow key)',
		tCounter: '<span class="mfp-counter">%curr% of %total%</span>',
		zoom: {
			enabled: true,
			duration: 300,
			easing: 'ease-in-out',
			opener: function (openerElement) {
				return openerElement.is('img') ? openerElement : openerElement.find('img');
			}
		}
	});

})(jQuery);