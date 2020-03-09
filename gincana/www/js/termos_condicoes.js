var cookieLocal;
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
        url: 'http://localhost/index3.php',
        data : localStorage.getItem('userInfo'),
        dataType: 'json',
        success:  function(response){
            if(response['login']['status'] == 0){
                alert("Preencha todos os campos!");
            } else {
                localStorage.setItem('todos_qr', JSON.stringify(response['todos_qr']));
                localStorage.setItem('atividades', JSON.stringify(response['atividades']));
                localStorage.setItem('premios', JSON.stringify(response['premios']));
                localStorage.setItem('qr_finaliza', JSON.stringify(response['qr_finaliza']));

                localStorage.setItem('usuario',response['login']['usuario']);
                localStorage.setItem('pontos',response['login']['pontos']);
                localStorage.setItem('id',response['login']['id']);

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
