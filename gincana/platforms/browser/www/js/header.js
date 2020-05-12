$( document ).ready(function() {
    $("#header").load("header.html", function(){
        $("#span_pontuacao_usuario").text(window.localStorage.getItem('pontos'));

        var nome_usuario  = window.localStorage.getItem('usuario').split(' ');
        var codigo_usr  = window.localStorage.getItem('codigo');

        $("#nome_usuario_header").text(nome_usuario[0]);
        $("#codigo_usuario_header").text('(' + codigo_usr + ')');

        $("#div_btn_home").click( function () {
            window.location.href = '../paginas/home.html';
        });
    }); 

   
});