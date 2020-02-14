<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
require_once './connection.php';

$consulta = mysqli_query($link, "select * from atividade_qr");
mysqli_close($link);

while($var = $consulta->fetch_object()){
    echo var_dump($var->descricao);
}
?>
