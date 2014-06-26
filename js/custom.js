var api = "api.php";
$(".modal-close").click(function () {
	$(".modal").modal("hide");
});
$(".show-password").mousedown(function () {
	$(".login-password").attr("type", "text");
});
$(".show-password").mouseup(function () {
	$(".login-password").attr("type", "password");
});
$(".login-save").click(function () {
// TODO: insert spinner
// TODO: disable/enable inputs
	$.ajax({
		url: api,
		type: "POST",
		data: "connectionTest=1" + 
			"&username=" + $(".login-username").val() +
			"&password=" + $(".login-password").val() +
			"&database=" + $(".login-database").val(),
		success: function(data, status, jqXHR) {
			if($(data).filter(".errorlevel").length > 0)
				alert($(data).filter(".errorlevel").html());
			else
				location.href = location.href;
		},
		error: function(data, status) {
			console.log("Error:\n" + status + "\n" + data);
		}
	});
});
$(".database").change(function () {
	$(".database option:selected").each(function () {
		$.ajax({
			url: api,
			type: "POST",
			data: "getTable=1&database=" + $(this).text(),
			success: function (data) {
				if($(data).filter(".errorlevel").length > 0)
					alert($(data).filter(".errorlevel").html());
				else
					$(".tables").html(data);
			},
			error: function (data, status) {
				console.log("Error:\n" + status + data);
			}
		});
	});
});
$(".tables").click(function () {
	$(".tables option:selected").each(function () {
		$(".main-table").html("<table class=\"main-table table table-bordered\"></table>");
		$.ajax({
			url: api,
			type: "POST",
			data: "getTableHead=1&table=" + $(this).text(),
			dataType: "JSON",
			success: function (data) {
				$(".main-table").append("<tr class=\"main-table-head\"></tr>");
				$(".main-table-head").append("<th></th>");
				$.each(data, function(key, val) {
					$(".main-table-head").append("<th>" + val[0] + "</th>");
				});
			},
			error: function (data, status) {
				console.log("Error:\n" + status + data);
			}
		});
		$.ajax({
			url: api,
			type: "POST",
			data: "getTableContent=1&table=" + $(this).text(),
			dataType: "JSON",
			success: function (data) {
				c = 0;
				$.each(data, function(key, val) {
					c++;
					$(".main-table").append("<tr class=\"main-table-body-" + c.toString() + "\"></tr>");
					$(".main-table-body-" + c.toString()).append("<td><input type=\"checkbox\" class=\"form-control main-table-body-" + c + "\"></td>");
					$.each(val, function(key, val) {
						$(".main-table-body-" + c.toString()).append("<td class=\"main-table-content\">" + val + "</td>");
					});
				});
			},
			error: function (data, status) {
				console.log("Error:\n" + status + data);
			}
		});
	});
});
$(".main-bar").on("DOMNodeInserted", function () {
	$(".main-table-content").off();
	$(".main-table-content").dblclick(function () {
		index = $(this).index() + 1;
		title = $(".main-table-head th:nth-child(" + index + ")").html();
		oldEntry = $(this).html();
		newEntry = window.prompt("Change: " + old);
		
	});
});
$.ajax({
	url: api,
	type: "POST",
	data: "getData=1",
	success: function(data) {
		if($(data).filter(".errorlevel").length > 0)
			alert($(data).filter(".errorlevel").html());
		else
			$(".database").html(data);
	},
	error: function(data, status) {
		console.log("Error:\n" + status + "\n" + data);
	}
});
$(".login-username").val("root");
$(".login-password").val("");
$(".login-database").val("localhost");
