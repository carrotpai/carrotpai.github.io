jQuery(document).ready(function() {

	if (localStorage.getItem("total__price")){
		$('.total_price__cart').text(localStorage.getItem("total__price"));
	} else {
		$('.total_price__cart').text('0');
	}

	let itemsCombos, itemsPizzas, itemsSnacks, itemsDrinks;
	$.getJSON('/Web/data_pages/main_page/combos.json', function(data) {
		let tempArray = data["combos"];
		itemsCombos = tempArray;
	});
	$.getJSON('/Web/data_pages/main_page/pizzas.json', function(data) {
		let tempArray = data["pizzas"];
		itemsPizzas = tempArray;
	});
	$.getJSON('/Web/data_pages/main_page/snacks.json', function(data) {
		let tempArray = data["snacks"];
		itemsSnacks = tempArray;
	});
	$.getJSON('/Web/data_pages/main_page/drinks.json', function(data) {
		let tempArray = data["drinks"];
		itemsDrinks = tempArray;
	});

	setTimeout(function(){
		for(var i = 0; i < localStorage["length"]; i++){
			var name = localStorage.key(i);
			var mas = JSON.parse(localStorage[name]);
			var count = mas[1];
			var searchBlock = mas[0];

			switch (searchBlock) {
				case "combos":
				for(ind in itemsCombos){
					if (itemsCombos[ind]["name"] == name){
						var elem = "<div class='cart_item' data-info='"+name+"' data-block='combos'><div class='separ'></div><div class='product'><img src='images/"+name+".jpg' alt='"+name+"'><div class='product_descript'><div class='label'>"+itemsCombos[ind]["label"]+"</div><div class='pric'>"+"<h5 class='cena'>"+itemsCombos[ind]["price"]+"<h5>"+"<h5>₽</h5>"+"</div><button type='button' class='btn-circle btn-lg minus'><i>-</i></button><div class='count'>"+count+"</div><button type='button' class=' btn-circle btn-lg plus'><i>+</i></button></div></div></div>";
						$('.cart__items').append(elem);
					}
				}
				break;
				case "pizzas":
				for(ind in itemsPizzas){
					if (itemsPizzas[ind]["name"] == name){
						var elem = "<div class='cart_item' data-info='"+name+"' data-block='pizzas'><div class='separ'></div><div class='product'><img src='images/"+name+".png' alt='"+name+"'><div class='product_descript'><div class='label'>"+itemsPizzas[ind]["label"]+"</div><div class='pric'>"+"<h5 class='cena'>"+itemsPizzas[ind]["price"]+"<h5>"+"<h5>₽</h5>"+"</div><button type='button' class='btn-circle btn-lg minus'><i>-</i></button><div class='count'>"+count+"</div><button type='button' class=' btn-circle btn-lg plus'><i>+</i></button></div></div></div>";
						$('.cart__items').append(elem);
					}
				}
				break;
				case "snacks":
				for(ind in itemsSnacks){
					if (itemsSnacks[ind]["name"] == name){
						var elem = "<div class='cart_item' data-info='"+name+"' data-block='snacks'><div class='separ'></div><div class='product'><img src='images/"+name+".png' alt='"+name+"'><div class='product_descript'><div class='label'>"+itemsSnacks[ind]["label"]+"</div><div class='pric'>"+"<h5 class='cena'>"+itemsSnacks[ind]["price"]+"<h5>"+"<h5>₽</h5>"+"</div><button type='button' class='btn-circle btn-lg minus'><i>-</i></button><div class='count'>"+count+"</div><button type='button' class=' btn-circle btn-lg plus'><i>+</i></button></div></div></div>";
						$('.cart__items').append(elem);
					}
				}
				break;
				case "drinks":
				for(ind in itemsDrinks){
					if (itemsDrinks[ind]["name"] == name){
						var elem = "<div class='cart_item' data-info='"+name+"' data-block='drinks'><div class='separ'></div><div class='product'><img src='images/"+name+".png' alt='"+name+"'><div class='product_descript'><div class='label'>"+itemsDrinks[ind]["label"]+"</div><div class='pric'>"+"<h5 class='cena'>"+itemsDrinks[ind]["price"]+"<h5>"+"<h5>₽</h5>"+"</div><button type='button' class='btn-circle btn-lg minus'><i>-</i></button><div class='count'>"+count+"</div><button type='button' class=' btn-circle btn-lg plus'><i>+</i></button></div></div></div>";
						$('.cart__items').append(elem);
					}
				}
				break;
			}
		}

		var items = document.querySelectorAll('.cart_item');
		var prices = document.querySelectorAll('.cena');
		var minusButtons = document.querySelectorAll('.minus');
		var plusButtons = document.querySelectorAll('.plus');
		var countsItems = document.querySelectorAll('.count');

		for(var i = 0; i < localStorage["length"] - 1;i++){
			minusButtons[i].addEventListener('click', (function(i){
				return function(){
					var d = $(prices[i]).text();
					var prev = $('.total_price__cart').text();
					var res = +prev - +d;
					var cur_count = $(countsItems[i]).text();
					cur_count -= 1;
					if (cur_count != -1){
						$(countsItems[i]).text(cur_count);
						localStorage.setItem("total__price", res);
						$('.total_price__cart').text(res);
						var ls = $(items[i]).attr('data-info');
						var lsBlock = $(items[i]).attr('data-block');
						if (cur_count != 0){
							localStorage.setItem(ls,  JSON.stringify([lsBlock, cur_count]));
						} else {
							localStorage.removeItem(ls);
						}
					}
					if (cur_count == 0){
						$(items[i]).remove();
					}
				}
			})(i))
			plusButtons[i].addEventListener('click', (function(i){
				return function(){
					var d = $(prices[i]).text();
					var prev = $('.total_price__cart').text();
					var res = +prev + +d;
					var cur_count = $(countsItems[i]).text();
					cur_count = +cur_count + 1;
					$(countsItems[i]).text(cur_count);
					var ls = $(items[i]).attr('data-info');
					var lsBlock = $(items[i]).attr('data-block');
					localStorage.setItem(ls, JSON.stringify([lsBlock, cur_count]));
					localStorage.setItem("total__price", res);
					$('.total_price__cart').text(res);
				}
			})(i))
		}
	}, 500);

});