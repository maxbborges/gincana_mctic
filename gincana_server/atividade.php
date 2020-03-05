<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    session_start();

    require_once './connection.php';

   $opcao = (isset($_POST['opcao'])) ? $_POST['opcao'] : $_GET['opcao'];

    switch ($opcao) {
        case 'enviarPontuacao':
            enviaPontuacao($link);
            break;    
        case 'retiraPontuacao':
            retiraPontuacao($link);
            break; 
        case 'verificaFezAtividade':
            verificaFezAtividade($link);
            break; 
    }


    function enviaPontuacao($link){

        $return['pontos'] = 0;

        (int)$pontos = filter_input(INPUT_POST, 'pontos', FILTER_DEFAULT);
        $id_usuario = filter_input(INPUT_POST, 'id_usuario', FILTER_DEFAULT);
        $id_atividade = filter_input(INPUT_POST, 'id_atividade', FILTER_DEFAULT);

        $sql = "UPDATE usuario SET pontos = pontos + {$pontos} WHERE id = {$id_usuario}";
        mysqli_query($link, $sql);

        $sql = "SELECT pontos FROM usuario WHERE id = {$id_usuario}";
        $res = mysqli_query($link, $sql);
        if($res){
            $pontuacao = mysqli_fetch_array($res, MYSQLI_ASSOC);
        }

        //REGISTRANDO A ATIVIDADE FEITA
        $sql = "INSERT INTO realiza_atividade (id_usuario, id_atividade) VALUES ({$id_usuario}, {$id_atividade})";
        mysqli_query($link, $sql);

        $return['pontos'] = $pontuacao['pontos'];

        echo json_encode($return);
    }

    function retiraPontuacao($link){

        $return['pontos'] = 0;

        (int)$pontos  = filter_input(INPUT_POST, 'pontos', FILTER_DEFAULT);
        $id_usuario  = filter_input(INPUT_POST, 'id_usuario', FILTER_DEFAULT);

        $sql = "UPDATE usuario SET pontos = pontos - {$pontos} WHERE id = {$id_usuario}";
        mysqli_query($link, $sql);

        $sql = "SELECT pontos FROM usuario WHERE id = {$id_usuario}";
        $res = mysqli_query($link, $sql);
        if($res){
            $pontuacao = mysqli_fetch_array($res, MYSQLI_ASSOC);
        }

        $return['pontos'] = $pontuacao['pontos'];

        echo json_encode($return);
    }

    function verificaFezAtividade($link){

        $return['result'] = false;

        $id_usuario  = filter_input(INPUT_POST, 'id_usuario', FILTER_DEFAULT);
        $id_atividade  = filter_input(INPUT_POST, 'id_atividade', FILTER_DEFAULT);

        $sql = "SELECT id FROM realiza_atividade WHERE id_usuario = {$id_usuario} AND id_atividade = {$id_atividade}";
        $resultado = mysqli_query($link, $sql);

        if($resultado){
            if($resultado->num_rows > 0){
                $return['result'] = true;
            }            
        }

        echo json_encode($return);
    }
?>
