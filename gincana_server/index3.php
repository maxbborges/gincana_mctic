<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    session_start();
    
    require_once './connection.php';
    echo $_GET['callback'].'('.json_encode(array('status'=>1, 'PHPSESSID'=>$_COOKIE)).')';
    
    if (isset($_POST['nome'])&&$_POST['nome']!=null){
        // $_COOKIE['xxx'] = 4;
        // if (mysqli_query($link,'INSERT INTO usuario (nome,login,email,senha,id_tipo_cadastro,id_tipo_usuario,pontos) values ("'.$_POST['nome'].'","max","'.$_POST["nome"].'","123",1,1,5);')){
        //     session_start();
        //     $_SESSION["nome"] = true;
        //     $_SESSION["login"] = true;
        //     echo json_encode(array('status'=>1, 'outros'=>2));
        // }
        // else {
            // echo "1";
            // return json_encode(array('status'=>1, 'outros'=>$_POST['nome']));
        //     // echo mysqli_error($link);
        // }
    } else {
        // echo "2";
        // return json_encode(array('status'=>0, 'outros'=>$_POST));
    }

?>
