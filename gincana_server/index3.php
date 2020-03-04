<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");

    $return = [];

    if ($_POST['nome']!=null&&$_POST['email']!=null&&$_POST['dataDeNascimento']!=null){
        require_once './connection.php';
        if (mysqli_query($link,'INSERT INTO usuario (nome,email,nascimento,rede_social,tipo_rede_social,pontos,sessao) values ("'.$_POST['nome'].'","'.$_POST['email'].'","'.$_POST['dataDeNascimento'].'","@maxwell.borges","twitter",0,"'.$_POST["cookie"].'");')){
            $consulta1=mysqli_query($link,'SELECT id,nome,pontos FROM usuario where sessao="'.$_POST['cookie'].'";')->fetch_assoc();
            $return['login'] = array('id'=>$consulta1['id'], 'status'=>1, 'usuario'=>$consulta1['nome'],'pontos'=>$consulta1['pontos']);
            // echo json_encode(array('status'=>1, 'usuario'=>$consulta1['nome'],'pontos'=>$consulta1['pontos']));
        }
        else {
            $return['login'] = array('status'=>0, 'outros'=>$_POST['cookie']);
            // echo json_encode(array('status'=>0, 'outros'=>$_POST['cookie']));
            // echo mysqli_error($link);
        }
    } else {
        $return['login'] = array('status'=>0, 'outros'=>$_POST);
        // echo json_encode(array('status'=>0, 'outros'=>$_POST));
    }

    //TODOS OS QR CODE
    $sql = "SELECT codigo, id_tipo_qr FROM atividade
            UNION ALL
            SELECT codigo, id_tipo_qr FROM premio
            UNION ALL
            SELECT codigo, id_tipo_qr FROM qr_finaliza_atividade;";
    $resultado = mysqli_query($link, $sql);
    if($resultado){
        while($rg = mysqli_fetch_array($resultado, MYSQLI_ASSOC)){
            $return['todos_qr'][$rg['codigo']] = $rg['id_tipo_qr'];
        }        
    }

    //BUSCANDO ATIVIDADES
    $sql = "SELECT a.id as id_atividade, codigo, id_tipo_qr, a.descricao as desc_atividade, pontos, q.id as id_alternativa, id_quiz, q.descricao as desc_alternativa, resposta_certa 
            FROM atividade a 
            LEFT JOIN alternativas_quiz q ON a.id = q.id_quiz 
            
            UNION ALL 
            
            SELECT a.id as id_atividade, codigo, id_tipo_qr, a.descricao as desc_atividade, pontos, q.id as id_alternativa, id_quiz, q.descricao as desc_alternativa, resposta_certa
            FROM atividade a 
            RIGHT JOIN alternativas_quiz q ON a.id = q.id_quiz;";
            
    $resultado = mysqli_query($link, $sql);
    if($resultado){
        while($rg = mysqli_fetch_array($resultado, MYSQLI_ASSOC)){
            $return['atividades'][$rg['codigo']]['id_atividade'] = $rg['id_atividade'];
            $return['atividades'][$rg['codigo']]['codigo'] = $rg['codigo'];
            $return['atividades'][$rg['codigo']]['id_tipo_qr'] = $rg['id_tipo_qr'];
            $return['atividades'][$rg['codigo']]['desc_atividade'] = $rg['desc_atividade'];
            $return['atividades'][$rg['codigo']]['pontos']= $rg['pontos'];
            if($rg['id_alternativa'] != NULL){
                $return['atividades'][$rg['codigo']]['alternativas'][$rg['id_alternativa']]['desc_alternativa'] = $rg['desc_alternativa'];
                $return['atividades'][$rg['codigo']]['alternativas'][$rg['id_alternativa']]['resposta_certa'] = $rg['resposta_certa'];
            }

        }        
    }

    //BUCANDO PRÊMIOS
    $sql = "SELECT * FROM premio";
    
    $resultado = mysqli_query($link, $sql);
    if($resultado){
        while($rg = mysqli_fetch_array($resultado, MYSQLI_ASSOC)){
            $return['premios'][$rg['codigo']]['id_tipo_qr'] = $rg['id_tipo_qr'];
            $return['premios'][$rg['codigo']]['descricao'] = $rg['descricao'];
            $return['premios'][$rg['codigo']]['estoque'] = $rg['estoque'];
            $return['premios'][$rg['codigo']]['pontos'] = $rg['pontos'];
        }        
    }

    //BUSCANDO QR CODE DE FINALIZAÇÃO DE ATIVIDADES
    $sql = "SELECT * FROM qr_finaliza_atividade";
    
    $resultado = mysqli_query($link, $sql);
    if($resultado){
        while($rg = mysqli_fetch_array($resultado, MYSQLI_ASSOC)){
            $return['qr_finaliza'][$rg['codigo']]['id_tipo_qr'] = $rg['id_tipo_qr'];
            $return['qr_finaliza'][$rg['codigo']]['finaliza_atividade'] = $rg['finaliza_atividade'];
        }        
    }

    echo json_encode($return);
?>
