<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
require_once './connection.php';

// if (!isset($_COOKIE['PHPSESSID'])&&isset($_POST['cookie'])){
//     // session_start();
//     setcookie("xx", 'xx');
//     echo json_encode(array('status'=>0, 'PHPSESSIDxxx'=>$_COOKIE['xx'], 'sessao'=>$_POST['cookie']));
// }

if (!isset($_COOKIE['PHPSESSID'])&&!isset($_POST['cookie'])){
    session_start();
    // echo json_encode(array('status'=>0, 'PHPSESSID'=>$_POST['cookie']));
    echo $_GET['callback'].'('.json_encode(array('status'=>0, 'PHPSESSID'=>$_COOKIE)).')';
} else {
    if (isset($_COOKIE['login'])){
        // echo $_GET['callback'].'('.json_encode(array('status'=>1, 'PHPSESSID'=>$_COOKIE)).')';
        echo json_encode(array('status'=>0, 'PHPSESSID'=>$_COOKIE));
    } else if (isset($_POST['nome'])) {
        if (mysqli_query($link,'INSERT INTO usuario (nome,login,email,senha,id_tipo_cadastro,id_tipo_usuario,pontos) values ("'.$_POST['nome'].'","max","'.$_POST["nome"].'","123",1,1,5);')){
            $_COOKIE["login"] = true;
            echo json_encode(array('status'=>1, 'PHPSESSID'=>$_POST));
            // echo $_GET['callback'].'('.json_encode(array('status'=>1)).')';
            // echo json_encode("xxx");
        } else {
            echo json_encode(array('status'=>0, 'PHPSESSID3'=>$_POST));
            // echo $_GET['callback'].'('.json_encode(array('status'=>0, 'PHPSESSID'=>$_COOKIE)).')';
        }
    } else {
        echo $_GET['callback'].'('.json_encode(array('status'=>1, 'PHPSESSID'=>$_COOKIE, 'teste'=>"aa")).')';
        // echo json_encode(array('status'=>0, 'PHPSESSID1'=>0));
    }
}








// echo json_encode(array('status'=>0, 'outros'=>$_COOKIE));

// $_SESSION = $_POST;
// session_write_close();

// echo $_GET['callback'].'('.header("Location: index3.php").')';
// require_once './connection.php';

// $consulta = mysqli_query($link, "select * from usuario");

// $teste = [];
// while($var = $consulta->fetch_object()){
//     array_push($teste,$var);
// }
// session_start();
// echo json_encode($_SESSION);

// $_SESSION['xxx']=4;
// // echo json_encode($_SESSION);


// mysqli_close($link);
?>
