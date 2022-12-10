import $ from 'jquery'
window.jQuery = $
window.$ = $

import 'slick-carousel/slick/slick.js';

document.addEventListener('DOMContentLoaded', () => {

	$('.burger').on('click', () => {
		$('.menu').addClass('active');
	});
	$('.close').on('click', () => {
		$('.menu').removeClass('active');
	});

	$('.product_slider').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		arrows: false,
	});

	function getDots() {
		let divs = document.querySelectorAll('ul.slick-dots li button');
		for (var i = 0; i < divs.length; i++) {		
			let btnId = divs[i].getAttribute('aria-controls');
			let elem = document.getElementById(btnId);
			let child = elem.querySelector('.dot-text');
			let elemAttr = child.getAttribute('data-dot-text');
			divs[i].setAttribute('data-dot-text', elemAttr);
			$('.info-dots').append('<a class="dots_button" value="'+i+'">'+elemAttr+'</a>');
		}
	}
	// setTimeout(getDots, 20);
	getDots();
	
	$('div.info-dots').on('click', '.dots_button', function () {
		var num = $(this).attr("value");
		console.log(num);
		$('.product_slider').slick('slickGoTo', num);
	});

	//E-mail Ajax Send
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "/mail.php", //Change
			data: th.serialize()
		}).done(function() {
			$(th).find('.success').addClass('active').css('display', 'flex').hide().fadeIn();
			setTimeout(function() {
				// Done Functions
				$(th).find('.success').removeClass('active').fadeOut();
				th.trigger("reset");
			}, 5000);
		});
		return false;
	});

	$('.success .close').on('click', () => {
		$('.success').removeClass('active').fadeOut();
	});

})
