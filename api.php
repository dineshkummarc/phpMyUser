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
		if(isset($_SESSION["username"]) and isset($_SESSION["password"]) and isset($_SESSION["database"])) {
			try {
				$connection = new PDO("mysql:host=".$_SESSION["database"], $_SESSION["username"], $_SESSION["password"]);
				foreach($connection->query("SHOW DATABASES") as $row)
					print("<option>".$row[0]."</option>");
			} catch(PDOException $e) {
				print("<span class=\"errorlevel\">".$e->getMessage()."</span>");
				die();
			}
		}
	}
	if(isset($_POST["getTable"])) {
		if(isset($_SESSION["username"]) and isset($_SESSION["password"]) and isset($_SESSION["database"])) {
			try {
				$_SESSION["db"] = $_POST["database"];
				$connection = new PDO("mysql:dbname=".$_POST["database"].";host=".$_SESSION["database"], $_SESSION["username"], $_SESSION["password"]);
				foreach($connection->query("SHOW TABLES") as $row)
					print("<option>".$row[0]."</option>");
			} catch(PDOException $e) {
				print("<span class=\"errorlevel\">".$e->getMessage()."</span>");
				die();
			}
		}
	}
	if(isset($_POST["getContent"])) {
		if(isset($_SESSION["username"]) and isset($_SESSION["password"]) and isset($_SESSION["database"]) and $_SESSION["db"]) {
			try {
				$connection = new PDO("mysql:dbname=".$_SESSION["db"].";host=".$_SESSION["database"], $_SESSION["username"], $_SESSION["password"]);
				print("<tr><th></th>");
				foreach($connection->query("DESCRIBE ".$_POST["table"]) as $row)
					print("<th>".$row[0]."</th>");
				print("</tr>");
				$query = $connection->prepare("SELECT * FROM ".$_POST["table"]);
				$query->execute();
				$re = $query->fetchAll(PDO::FETCH_NUM);
				foreach($re as $row) {
					print("<tr>");
					print("<td><input type=\"checkbox\" class=\"checker form-control\"></td>");
					foreach($row as $col)
						print("<td>".$col."</td>");
					print("</tr>");
				}
			} catch(PDOException $e) {
				print("<span class=\"errorlevel\">".$e->getMessage()."</span>");
				die();
			}
		}
	}
?>