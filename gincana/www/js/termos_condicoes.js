if (localStorage.getItem('userInfo')==null){
    window.location = 'index.html';
} else {
    document.querySelector("#btn_aceitar_termos").addEventListener("click", function() {
        login();
    });
    
    document.querySelector("#btn_cancelar_termos").addEventListener("click", function() {
        localStorage.clear();
        window.location = 'index.html';
    });
}

function login(){
    $.ajax({
        method: 'POST',
        url: 'http://localhost/index3.php',
        data : localStorage.getItem('userInfo'),
        dataType: 'json',
        success:  function(response){
            console.log(response);
            if(response['login']['status'] == 0){
                alert("Preencha todos os campos!");
            } else {
                localStorage.setItem('atividades', JSON.stringify(response['atividades']));
                localStorage.setItem('usuario',response['login']['usuario']);
                localStorage.setItem('pontos',response['login']['pontos']);
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
