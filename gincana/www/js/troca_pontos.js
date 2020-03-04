$(document).ready(function () {

    const premios = JSON.parse(window.localStorage.getItem('premios'));
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codigo_qr = urlParams.get('qr');

    var pontos = premios[codigo_qr].pontos;
    var disponibilidade = verificaDisponibilidade(codigo_qr);
    
    if(disponibilidade){
        retiraPontuacao(pontos);
    } 

    $("#div_mensagem .span_desconto").text(pontos + ' pontos foram descontados');
    
    $("#btn_continuar_pontos").click( function () {
        window.location.href = "../paginas/home.html";
    });
        

});

//CONTABILIZA A PONTUAÇÃO PARA O USUARIO
function retiraPontuacao(pontos) {

    var id_usuario = window.localStorage.getItem('id');

    $.ajax({
        method: "POST",
        dataType: 'json',
        url: "http://localhost/atividade.php",
        data: { 'opcao': 'retiraPontuacao', 'id_usuario': id_usuario, 'pontos': pontos },
        success: function (data) {
            localStorage.setItem('pontos', data['pontos']);
        }
    });
}

//VERIFICA SE O USUARIO JÁ TROCOU O PREMIO
function verificaDisponibilidade(codigo_qr){
    return true;
}




