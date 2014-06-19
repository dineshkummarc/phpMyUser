<?php
	session_start();
	if(isset($_POST["connectionTest"])) {
		try {
			$connection = new PDO("mysql:host=".$_POST["database"], $_POST["username"], $_POST["password"]);
			$_SESSION["username"] = $_POST["username"];
			$_SESSION["password"] = $_POST["password"];
			$_SESSION["database"] = $_POST["database"];
		} catch(PDOException $e) {
			print("<span class=\"errorlevel\">".$e->getMessage()."</span>");
			die();
		}
	}
	if(isset($_POST["getData"])) {
		if(isset($_SESSION["username"])) {
			try {
				$connection = new PDO("mysql:host=".$_POST["database"], $_POST["username"], $_POST["password"]);
				foreach($connection->query("SHOW DATABASES") as $row)
					print("<option>".$row."</option>");
			} catch(PDOException $e) {
				print("<span class=\"errorlevel\">".$e->getMessage()."</span>");
				die();
			}
		}	
	}
?>