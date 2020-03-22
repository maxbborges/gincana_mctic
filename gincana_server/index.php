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
?>
