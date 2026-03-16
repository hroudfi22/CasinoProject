<?php

	define('DB_NAME', 'hroudfi22');
	define('DB_USER', 'hroudfi22');
	define('DB_PASSWORD', 'KwcMuYPh');
	define('DB_HOST', '127.0.0.1');

	global $db;
    $db = new PDO(
            "mysql:host=" .DB_HOST. ";dbname=" .DB_NAME,DB_USER,DB_PASSWORD
        );
    /*
     array(
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
            )
	*/

?>