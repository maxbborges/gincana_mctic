<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    if ($_POST['nome']!=null&&$_POST['email']!=null&&$_POST['dataDeNascimento']!=null){
        require_once './connection.php';
        if (mysqli_query($link,'INSERT INTO usuario (nome,email,nascimento,rede_social,tipo_rede_social,pontos,sessao) values ("Maxwell Borges","max@gmail.com","1994-02-25","@maxwell.borges","twitter",15,"'.$_POST["cookie"].'");')){
            echo json_encode(array('status'=>1, 'outros'=>$_POST['cookie']));
        }
        else {
            echo json_encode(array('status'=>0, 'outros'=>$_POST['cookie']));
            // echo mysqli_error($link);
        }
    } else {
        echo json_encode(array('status'=>0, 'outros'=>$_POST));
    }
?>
