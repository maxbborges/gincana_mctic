<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
require_once './connection.php';

if (!isset($_COOKIE['PHPSESSID'])){
    session_start();
    echo $_GET['callback'].'('.json_encode(array('status'=>0)).')';
} else {
    if (($consulta=mysqli_query($link,'SELECT id,nome,pontos FROM usuario where sessao="'.$_COOKIE['PHPSESSID'].'";')->fetch_assoc())!=NULL){
        echo $_GET['callback'].'('.json_encode(array('status'=>1,'usuario'=>$consulta['nome'],'pontos'=>$consulta['pontos'])).')';
    } else {
        echo $_GET['callback'].'('.json_encode(array('status'=>0)).')';
    }
   
}








// echo json_encode(array('status'=>0, 'outros'=>$_COOKIE));

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
