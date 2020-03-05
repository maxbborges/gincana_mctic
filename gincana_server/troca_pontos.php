<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    session_start();

    require_once './connection.php';

   $opcao = (isset($_POST['opcao'])) ? $_POST['opcao'] : $_GET['opcao'];

    switch ($opcao) {
        case 'verificaTroca':
            verificaTroca($link);
            break; 
    }


    function verificaTroca($link){

        $return['result'] = 0;

        $id_usuario = filter_input(INPUT_POST, 'id_usuario', FILTER_DEFAULT);
        $id_premio = filter_input(INPUT_POST, 'id_premio', FILTER_DEFAULT);
        $pontos = filter_input(INPUT_POST, 'pontos', FILTER_DEFAULT);

        $sql = "SELECT id FROM resgata_premio WHERE id_usuario = {$id_usuario} AND id_premio = {$id_premio}";

        $res = mysqli_query($link, $sql);
        if($res){
            if($res->num_rows > 0){
                //ATIVIDADE JÁ FEITA
                $return['result'] = 2;
            } else{
                //VERIFICA SE TEM PONTOS SUFICIENTES
                $pontos_usuario = verificaPontos($link, $id_usuario);

                $return['ddd'] = $pontos_usuario;
                $return['ppp'] = $pontos;

                if((int)$pontos_usuario > (int)$pontos){
                    //REGISTRANDO A ATIVIDADE FEITA
                    $sql = "INSERT INTO resgata_premio (id_usuario, id_premio) VALUES ({$id_usuario}, {$id_premio})";
                    mysqli_query($link, $sql);
                    
                    $sql = "UPDATE usuario SET pontos = pontos - {$pontos} WHERE id = {$id_usuario}";
                    mysqli_query($link, $sql);

                    $return['result'] = 1;

                } else {
                    //PONTOS INSUFICIENTES
                    $return['result'] = 3;  
                }
                
            }
           
        }        

        echo json_encode($return);
    }
    
    function verificaPontos($link, $id_usuario){
        
        $pontos_ = 0;

        $sql = "SELECT pontos FROM usuario WHERE id = {$id_usuario}";
        $res = mysqli_query($link, $sql);
        if($res){
            $pontos_ = mysqli_fetch_array($res, MYSQLI_ASSOC);
        }

        return $pontos_['pontos'];
    }
?>
