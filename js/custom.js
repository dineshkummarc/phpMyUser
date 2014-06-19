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
$.ajax({
	url: api,
	type: "POST",
	data: "getData=1",
	success: function(data) {
		console.log(data);
	},
	error: function(data, status) {
		console.log("Error:\n" + status + "\n" + data);
	}
});

$(".login-username").val("root");
$(".login-password").val("");
$(".login-database").val("localhost");
