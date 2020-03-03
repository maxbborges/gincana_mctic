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
    }


    function enviaPontuacao($link){

        $return['pontos'] = 0;

        (int)$pontos  = filter_input(INPUT_POST, 'pontos', FILTER_DEFAULT);
        $id_usuario  = filter_input(INPUT_POST, 'id_usuario', FILTER_DEFAULT);

        $sql = "UPDATE usuario SET pontos = pontos + {$pontos} WHERE id = {$id_usuario}";
        mysqli_query($link, $sql);

        $sql = "SELECT pontos FROM usuario WHERE id = {$id_usuario}";
        $res = mysqli_query($link, $sql);
        if($res){
            $pontuacao = mysqli_fetch_array($res, MYSQLI_ASSOC);
        }

        $return['pontos'] = $pontuacao['pontos'];

        echo json_encode($return);
    }
?>
