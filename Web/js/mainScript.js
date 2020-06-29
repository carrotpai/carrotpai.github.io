jQuery(document).ready(function($) {
	var prices = $('.prices');
	var buttons = $('.button');
	var info = $('.info');

	let itemsArray;


	if (localStorage.getItem('total__price')){
		$('.total__price').text(localStorage.getItem('total__price'));
	} else {
		$('.total__price').text('0');
	}

	var cur_ind = 0;
	var labels = document.querySelectorAll('.label');
	var prices = document.querySelectorAll('.prices');
	var descriptions = document.querySelectorAll('.description');
	var images = document.querySelectorAll('.image_item img');

	
	$.getJSON('/Web/data_pages/main_page/combos.json', function(data) {
		var mas = data["combos"];
		for (ind in mas){
			labels[cur_ind].innerHTML = mas[ind]["label"];
			prices[cur_ind].innerHTML = mas[ind]["price"];
			descriptions[cur_ind].innerHTML = mas[ind]["description"];
			$(images[cur_ind]).attr("src", "images/" + mas[ind]["name"] + ".jpg");
			$(info[cur_ind]).attr('data-block', 'combos');
			$(info[cur_ind]).attr('data-info', mas[ind]["name"]);
			cur_ind++;
		}
	})
	.fail(function(){
		alert("failed to get JSON");
	});

	setTimeout(() => console.log('Json загружен'), 500);


	$.getJSON('/Web/data_pages/main_page/pizzas.json', function(data) {
		var mas = data["pizzas"];
		for (ind in mas){
			labels[cur_ind].innerHTML = mas[ind]["label"];
			prices[cur_ind].innerHTML = mas[ind]["price"];
			descriptions[cur_ind].innerHTML = mas[ind]["description"];
			$(images[cur_ind]).attr("src", "images/" + mas[ind]["name"] + ".png")
			$(info[cur_ind]).attr('data-block', 'pizzas');
			$(info[cur_ind]).attr('data-info', mas[ind]["name"]);
			cur_ind++;
		}
	})
	.fail(function(){
		alert("failed to get JSON");
	});

	setTimeout(() => console.log('Json загружен'), 500);

	$.getJSON('/Web/data_pages/main_page/snacks.json', function(data) {
		var mas = data["snacks"];
		for (ind in mas){
			labels[cur_ind].innerHTML = mas[ind]["label"];
			prices[cur_ind].innerHTML = mas[ind]["price"];
			descriptions[cur_ind].innerHTML = mas[ind]["description"];
			$(images[cur_ind]).attr("src", "images/" + mas[ind]["name"] + ".png")
			$(info[cur_ind]).attr('data-block', 'snacks');
			$(info[cur_ind]).attr('data-info', mas[ind]["name"]);
			cur_ind++;
		}
	})
	.fail(function(){
		alert("failed to get JSON");
	});

	$.getJSON('/Web/data_pages/main_page/drinks.json', function(data) {
		var mas = data["drinks"];
		for (ind in mas){
			labels[cur_ind].innerHTML = mas[ind]["label"];
			prices[cur_ind].innerHTML = mas[ind]["price"];
			descriptions[cur_ind].innerHTML = mas[ind]["description"];
			$(images[cur_ind]).attr("src", "images/" + mas[ind]["name"] + ".png")
			$(info[cur_ind]).attr('data-block', 'drinks');
			$(info[cur_ind]).attr('data-info', mas[ind]["name"]);
			cur_ind++;
		}
	})
	.fail(function(){
		alert("failed to get JSON");
	});

	setTimeout(() => console.log('Json загружен'), 500);

	for(var i = 0; i < 15;i++){
		buttons[i].addEventListener('click', (function(i){
			return function(){
				var d = $(prices[i]).text();
				var prev = $('.total__price').text();
				var sum = +prev + +d;
				$('.total__price').text(sum);
				localStorage.setItem('total__price', sum);
				var a = $(info[i]).attr('data-block');
				var b = $(info[i]).attr('data-info');
				if (localStorage.getItem(b)){
					let c = JSON.parse(localStorage.getItem(b));
					console.log(c[1]);
					var cur_count = c[1] + 1;
					localStorage.setItem(b, JSON.stringify([a, cur_count]));
				} else{
					localStorage.setItem(b, JSON.stringify([a, 1]));
				}
			}
		})(i))
	}
});