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
$(".tables").change(function () {
	$(".tables option:selected").each(function () {
		$.ajax({
			url: api,
			type: "POST",
			data: "getContent=1&table=" + $(this).text(),
			success: function (data) {
				$(".main-table").html("");
				$(".main-table").append(data);
			},
			error: function (data, status) {
				console.log("Error:\n" + status + data);
			}
		});
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
