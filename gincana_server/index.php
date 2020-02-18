<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require_once './connection.php';

$consulta = mysqli_query($link, "select * from usuario");
mysqli_close($link);
$teste = [];
while($var = $consulta->fetch_object()){
    array_push($teste,$var);
}
echo json_encode($teste);
  
//   $login=$_POST['login'];	//Pegando dados passados por AJAX
//   $senha=$_POST['senha'];
	
// 	else{
// 		echo 1;	//Responde sucesso
// 		if(!isset($_SESSION)) 	//verifica se há sessão aberta
// 		session_start();		//Inicia seção
// 		//Abrindo seções
// 		$_SESSION['usuarioID']=$res['id']; 		
// 		$_SESSION['nomeUsuario']=$res['nome'];
// 		$_SESSION['email']=$res['email'];	
// 		exit;	
// 	}



?>
