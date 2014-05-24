<?php
	// Router not needet
	include("Slim\Slim.php");
	\Slim\Slim::registerAutoloader();
	$app = new \Slim\Slim();
	
	$app->get("/", function() {
		
	});
	$app->get("/sql", function() {
		echo "SQL test";
	});
	
	$app->run();
	
	if(isset($_POST["connectionTest"])) {
		echo $_POST["dbUser"];
	}
?>