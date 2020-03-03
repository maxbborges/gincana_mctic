$( document ).ready(function() {
    $("#header").load("header.html", function(){
        $("#span_pontuacao_usuario").text(window.localStorage.getItem('pontos'));
        $("#nome_usuario_header").text(window.localStorage.getItem('usuario'));
    }); 
});