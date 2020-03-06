$( document ).ready(function() {
    $("#header").load("header.html", function(){
        $("#span_pontuacao_usuario").text(window.localStorage.getItem('pontos'));
        var nome_usuario  = window.localStorage.getItem('usuario').split(' ');
        $("#nome_usuario_header").text(nome_usuario[0]);

        $("#div_btn_home").click( function () {
            window.location.href = '../paginas/home.html';
        });
    }); 

   
});