<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
session_start();
echo json_encode(array('status'=>0, 'outros'=>$_COOKIE));

// $_SESSION = $_POST;
// session_write_close();

// echo $_GET['callback'].'('.header("Location: index3.php").')';
// require_once './connection.php';

// $consulta = mysqli_query($link, "select * from usuario");

// $teste = [];
// while($var = $consulta->fetch_object()){
//     array_push($teste,$var);
// }
// session_start();
// echo json_encode($_SESSION);

// $_SESSION['xxx']=4;
// // echo json_encode($_SESSION);


// mysqli_close($link);
?>
