$(document).ready(function () {

    const atividades = JSON.parse(window.localStorage.getItem('atividades'));
    const qr_finaliza = JSON.parse(window.localStorage.getItem('qr_finaliza'));
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codigo_qr = urlParams.get('qr');

    var pontos = 0;


});

//CONTABILIZA A PONTUAÇÃO PARA O USUARIO
function enviaPontuacao(pontos) {

    var id_usuario = window.localStorage.getItem('id');

    $.ajax({
        method: "POST",
        dataType: 'json',
        url: "http://localhost/atividade.php",
        data: { 'opcao': 'enviarPontuacao', 'id_usuario': id_usuario, 'pontos': pontos },
        success: function (data) {
            localStorage.setItem('pontos', data['pontos']);
        }
    });
}

//VERIFICA SE O USUARIO JÁ FEZ A ATIVIDADE
function verificaDisponibilidade(){

}




