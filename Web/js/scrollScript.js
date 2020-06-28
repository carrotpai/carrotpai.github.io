$(window).scroll(function() {
	var top = $(document).scrollTop();
	if (top >= 50){
		$('#header').addClass('sticky');
	}
	else{
		$('#header').removeClass('sticky');
	}
});
