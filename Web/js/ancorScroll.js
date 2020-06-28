$(document).ready(function() {
	$('.navigate li a').click(function() {
		var elementClick = $(this).attr("href");
		var destination = $(elementClick).offset().top;
		$('html').animate({
			scrollTop: destination - 100
		}, 1500);
	});
});