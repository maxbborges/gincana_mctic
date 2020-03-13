<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");

    $return = [];

    if ($_POST['nome'] != null && $_POST['email'] != null){
        
        require_once './connection.php';

        $nome = $_POST['nome'];
        $email = $_POST['email'];        
        $instagram = $_POST['inputInstagram'];
        $twitter = $_POST['inputTwitter'];
        $facebook = $_POST['inputFacebook'];
        $whatsapp = $_POST['inputWhatsapp'];
        $pontos = 0;
        $sessao = $_POST["cookie"];
        $codigo = '';
        $data_nascimento = $_POST['inputAno'] . '-' . $_POST['inputMes'] . '-' . $_POST['inputDia'];        

        //GERANDO O CÓDIGO DO USUÁRIO
        $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYWZ';
        $charactersLength = strlen($characters);        
        for ($i = 0; $i < 6; $i++) {
            $codigo .= $characters[rand(0, $charactersLength - 1)];
        }  

        $sql = "INSERT INTO usuario (nome, codigo, email, nascimento, instagram, twitter, facebook, whatsapp, pontos, sessao) VALUES (?,?,?,?,?,?,?,?,?,?)";
        $stmt = $link->prepare($sql);
        if($stmt){
            if($stmt->bind_param('ssssssssis', $nome, $codigo, $email, $data_nascimento, $instagram, $twitter, $facebook, $whatsapp, $pontos, $sessao)){
                $stmt->execute();                

                $user = mysqli_query($link,'SELECT id, nome, pontos, codigo FROM usuario where sessao = "'.$sessao.'";')->fetch_assoc();
                $return['login'] = [
                    'id' => $user['id'], 
                    'status' => 1,
                    'usuario' => $user['nome'],
                    'pontos' => $user['pontos'],
                    'codigo' => $user['codigo']
                ];

                $stmt->close();
            } else {
                $return['login'] = ['status' => 0, 'outros' => $_POST['cookie']];
            }            
        } else {
            $return['login'] = ['status' => 0, 'outros' => $_POST['cookie']];
        }
    } else {
        $return['login'] = ['status' => 0, 'outros' => $_POST['cookie']];
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
            $return['premios'][$rg['codigo']]['id_premio'] = $rg['id'];
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
            $return['qr_finaliza'][$rg['codigo']]['pontos'] = $rg['pontos'];
            $return['qr_finaliza'][$rg['codigo']]['id'] = $rg['id'];
        }        
    }

    echo json_encode($return);
?>
