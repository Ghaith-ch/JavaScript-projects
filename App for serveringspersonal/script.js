$(document).ready(function (e) {

	var order = { "Myitems": [] };

	CreateStartPage();

	$("nav").click(function () {

		console.log("link to kassa klicked");

		$(".startsida").removeClass('d-block');
		$(".startsida").addClass('d-none');

		$(".ordersida").removeClass('d-none');
		$(".ordersida").addClass('d-block');

		$("nav").removeClass('d-block');
		$("nav").addClass('d-none');

		CreateOrderPage();
	});


	function CreateStartPage() {
		$(".startsida").html("");
		for (var section in menu) {
			$(".startsida").append("<h2>" + section + "</h2>");

			for (var itemindex in menu[section]) {
				var item = menu[section][itemindex];

				var ul = '<ul class="list-group">' +
					'<li class="list-group-item d-flex justify-content-between align-items-center">' +
					'<div>' +
					'<h5>' + item["name"] + '</h5>' + item["contents"] +
					'</div>' +

					'<div class="d-flex flex-column ">' +
					'<span class="font-weight-bold">' + item["price"] + "kr" + '</span>' +
					'<button type="button" class="addButton p-1">+</button>' +
					'</div>' +

					'</li>' +
					'</ul>';

				$(".startsida").append(ul);
			}
			$(".startsida").append("<br/>");
		}

		document.body.innerHTML = document.body.innerHTML.replace(/undefined/g, " ");

		$(".addButton").click(function (e) {
			console.log("addButton clicked");

			var price = $(e.target).siblings().text();
			var name = $(e.target).parents().siblings().children("h5").text(); //fixa sedan
			order.Myitems.push({ "name": name, "price": price });
			console.log(order.Myitems);
		});
	}

	function CreateOrderPage() {
		$(".ordersida").html("");

		$(".ordersida").append("<h2>The Order</h2>");
		for (var itemindex in order["Myitems"]) {
			var item = order["Myitems"][itemindex];

			var ul = '<ul class="list-group">' +
				'<li class="list-group-item d-flex justify-content-between align-items-center row">' +
				'<div>' +
				'<h5>' + item["name"] + '</h5>' +
				'</div>' +

				'<div class="d-flex">' +
				'<span class="font-weight-bold price mr-3">' + item["price"] + '</span>' +
				'<input type="number" id="quantity" name="quantity" value="1" min="1" max="10">' +
				'<button type="button" class="removeButton ml-3">Remove</button>' +
				'</div>' +

				'</li>' +
				'</ul>';

			$(".ordersida").append(ul);
		}
		$(".ordersida").append("<br/>");

		var div = '<div class="d-flex justify-content-between align-items-center">' +
			'<textarea rows="3" cols="40" name="comment" placeholder=" Write your notes here..."></textarea>' +
			'<div>' +
			'<select id="table" name="tablelist">' +
			'<option value="none" selected disabled >Select a Table</option>' +
			'<option value="table1">Table1</option>' +
			'<option value="table2">Table2</option>' +
			'<option value="table3">Table3</option>' +
			'<option value="table4">Table4</option>' +
			'<option value="table5">Table5</option>' +
			'<option value="table6">Table6</option>' +
			'<option value="table7">Table7</option>' +
			'</select>' +
			'</div>' +

			'<div class="d-flex flex-column ml-3">' +
			'<span class="font-weight-bold ">Total</span>' +
			'<span class="font-weight-bold total"></span>' +
			'</div>' +
			'</div>'
			;

		$(".ordersida").append(div);
		$(".ordersida").append('<button type="button" class="orderButton mt-3">Order</button>');
		count();


		$(".removeButton").click(function (e) {
			console.log("removeButton clicked");

			$(e.target).parents()[1].remove();
			console.log(order.Myitems);
			count();
		});

		$("input").change(function (e) {
			count();
		});

		$(".orderButton").click(function (e) {
			console.log("orderButton clicked");

			alert("The order have sent to the Kitchen!");
			$(".ordersida").removeClass('d-block');
			$(".ordersida").addClass('d-none');

			$(".startsida").addClass('d-block');
			$("nav").addClass('d-block');

			console.log(order.Myitems);
			order.Myitems = [];
			console.log(order.Myitems);
		});
	}

	function count() {
		var total = 0
		var lis = $(".row");
		for (var i = 0; i < lis.length; i++) {
			var item = lis[i];
			var priceOfItem = item.querySelector("span").innerText;

			var quantity = item.querySelector("input").value;
			var price = parseFloat(priceOfItem.replace('kr', ''))
			total = total + (price * quantity)
		}
		var total = $(".total").text(total + " Kr");
	}



});