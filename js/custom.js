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
	$("[class*=login-]").attr("disabled", "disabled");
	$(".login-spinner").css("display", "inline-block");
	$.ajax({
		url: "api.php",
		type: "post",
		data: "connectionTest=1&dbUser=Foo",
		success: function(data, status, jqXHR) {
			alert(data);
			$(".login-spinner").css("display", "none");
			$("[class*=login-]").removeAttr("disabled");
		},
		error: function() {
			alert("Error");
		}
	});
});