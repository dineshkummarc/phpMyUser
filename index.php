<?php
	include("api.php");
?>
<!doctype html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="css/bootstrap.css">
		<link rel="stylesheet" href="css/custom.css">
		<link rel="stylesheet" href="font-awesome/css/font-awesome.css">
		<title>phpMyUser</title>
	</head>
	<body>
		<?php include("modals.html") ?>
		<div class="container-fluid">
			<div class="row">
				<div class="navbar navbar-default navbar-fixed-top">
					<div class="container-fluid">
						<div class="navbar-header">
							<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navigation-1"><span class="sr-only">Toggle Navbar</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
							<a class="navbar-brand" href=".">phpMyUser</a>
						</div>
						<div class="collapse navbar-collapse" id="navigation-1">
							<ul class="nav navbar-nav">
								<li><a href=".about-form" data-toggle="modal">About</a></li>
								<li><a href=".contact-form" data-toggle="modal">Contact</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div> <!--/navigation-->
			<div class="row">
				<div class="col-xs-2 left-bar">
					<h5><button class="btn btn-primary btn-group-justified" data-toggle="modal" data-target=".login-form">Connect</button></h5>
					<select size="3" class="form-control"></select> 
				</div> <!--/left bar-->
				<div class="col-xs-10 main-bar col-xs-offset-2">
					World
				</div> <!--main bar-->
			</div> <!--/body-->
		</div>
		<script src="js/jQuery.js"></script>
		<script src="js/bootstrap.js"></script>
		<script src="js/custom.js"></script>
	</body>
</html>