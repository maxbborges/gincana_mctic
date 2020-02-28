<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    if ($_POST['nome']!=null&&$_POST['email']!=null&&$_POST['dataDeNascimento']!=null){
        require_once './connection.php';
        if (mysqli_query($link,'INSERT INTO usuario (nome,email,nascimento,rede_social,tipo_rede_social,pontos,sessao) values ("'.$_POST['nome'].'","'.$_POST['email'].'","'.$_POST['dataDeNascimento'].'","@maxwell.borges","twitter",0,"'.$_POST["cookie"].'");')){
            $consulta1=mysqli_query($link,'SELECT id,nome,pontos FROM usuario where sessao="'.$_POST['cookie'].'";')->fetch_assoc();
            echo json_encode(array('status'=>1, 'usuario'=>$consulta1['nome'],'pontos'=>$consulta1['pontos']));
        }
        else {
            echo json_encode(array('status'=>0, 'outros'=>$_POST['cookie']));
            // echo mysqli_error($link);
        }
    } else {
        echo json_encode(array('status'=>0, 'outros'=>$_POST));
    }
?>
