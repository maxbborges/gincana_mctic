// var endereco = 'http://localhost:80/index3.php';
var endereco = 'https://mbbdev.site/wp-content/plugins/plugin_maxwell/includes/projeto_mctic/gincana_server/index3.php'

if ((window.localStorage.getItem('usuario'))!=null){
    $(".nome_usuario").text(window.localStorage.getItem('usuario'));
}

document.querySelector("#btn_aceitar_termos").addEventListener("click", function() {
    login();
});

document.querySelector("#btn_cancelar_termos").addEventListener("click", function() {
    localStorage.clear();
    window.location = 'index.html';
});

function login(){
    $.ajax({
        method: 'POST',
        url: endereco,
        data : localStorage.getItem('userInfo'),
        dataType: 'json',
        success:  function(response){
          if(response['login']['status'] == 0){
            alert("Ops, Ocorreu um erro!");
          } else {
            console.log(response);
            localStorage.setItem('autenticacao',true);
            localStorage.setItem('todos_qr', JSON.stringify(response['todos_qr']));
            localStorage.setItem('atividades', JSON.stringify(response['atividades']));
            localStorage.setItem('premios', JSON.stringify(response['premios']));
            localStorage.setItem('qr_finaliza', JSON.stringify(response['qr_finaliza']));

            localStorage.setItem('pontos',response['login']['pontos']);
            localStorage.setItem('id',response['login']['id']);
            localStorage.setItem('codigo',response['login']['codigo']);
            window.location = 'home.html';
          }
        }
        // beforeSend: function(xhr) {
        //     console.log(xhr);
        // }
    })
    .fail(function(jqXHR, textStatus, msg){
        console.log(msg);
        console.log(textStatus);
        console.log(jqXHR);
    });
}
