<?php
   
session_start(); //Inicia a sessão (necessário para destrui-la)

session_destroy();

header("Location: /projeto-sa/login.php");
exit();
?>