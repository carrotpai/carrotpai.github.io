jQuery(document).ready(function($) {
	$('#order').on("submit", function(event){
		if (valid()){
			event.preventDefault();
		} else {
			localStorage.clear();
		}
	})
	$('input[type="text"]').on("click", function(){
		var nameInput = $(this).attr('id');
		$(this).removeClass('error');
		if (nameInput == "telephon"){
			$('.for-telephon').remove();
		}

		if (nameInput == "nameClient"){
			$('.for-nameClient').remove();
		}

		if (nameInput == "address" ){
			$('.for-address').remove();
		}

		if(nameInput == "email"){
			$('.for-email').remove();
		}
	});

	$('input[type="radio"]').on("click", function(){
		$('.payment').removeClass('error');
		$('.for-radio').remove();
	});

	function valid(){

		$('.text-error').remove();

		var reg     = /^\w+([\.-]?\w+)*@(((([a-z0-9]{2,})|([a-z0-9][-][a-z0-9]+))[\.][a-z0-9])|([a-z0-9]+[-]?))+[a-z0-9]+\.([a-z]{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum|ru))$/i;
		var el = $('#email');
		var val_mail = el.val()?false:true;

		if (val_mail){
			el.after('<span class="for-email text-error">Поле e-mail обязательно к заполнению</span>');
		} else if (!reg.test(el.val())){
			val_mail = true;
			el.after('<span class="for-email text-error">Вы указали недопустимый e-mail</span>');
		}
		$('#email').toggleClass('error', val_mail);

		reg = /^\d[\d\(\)\ -]{4,14}\d$/;
		el = $('#telephon');
		var val_phone = el.val()?false:true;


		if(val_phone){
			el.after('<span class="for-telephon text-error">Поле Телефон обязательно к заполнению</span>');
		} else if (el.val().length != 11){
			val_phone = true;
			el.after('<span class="for-telephon text-error">Недопустимый номер телефона</span>');
		} else if (!reg.test(el.val())){
			val_phone = true;
			el.after('<span class="for-telephon text-error">Недопустимый номер телефона</span>');
		}
		$('#telephon').toggleClass('error', val_phone);

		el = $('#nameClient');
		var val_name = el.val()?false:true;

		if (val_name){
			el.after('<span class="for-telephon text-error">Поле Имя обязательно к заполнению</span>');
		}
		$('#nameClient').toggleClass('error', val_name);

		el = $('#address');
		var val_address = el.val()?false:true;
		if (val_address){
			el.after('<span class="for-telephon text-error">Поле Адрес обязательно к заполнению</span>');
		} else if (el.val().length < 6){
			val_address = true;
			el.after('<span class="for-telephon text-error">Недопустимый Адрес</span>');
		}
		$('#address').toggleClass('error', val_address);

		var box1 = $('#option-one').prop('checked');
		var box2 = $('#option-two').prop('checked');
		var val_chbox =  !box1 & !box2;
		if (val_chbox){
			$('.payment').after('<span class="for-radio text-error">Выберете способ оплаты</span>');
			$('.payment').addClass('error');
		}


		return val_mail || val_phone || val_name || val_address || val_chbox;
	}
});