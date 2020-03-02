<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");

$return = []/

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

    //BUSCANDO ATIVIDADES
    $sql = "SELECT * FROM atividade a LEFT JOIN alternativas_quiz q ON a.id = q.id_quiz UNION ALL
    SELECT * FROM atividade a RIGHT JOIN alternativas_quiz q ON a.id = q.id_quiz;";
    $resultado = mysqli_query($link, sql);
    if($resultado){
    $registro = mysql_fetch_array($resultado, MYSQL_ASSOC);
    }

    echo json_encode($registro);
?>
