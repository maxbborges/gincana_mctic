var endereco = window.location['hostname'];
$(document).ready(function () {

    const premios = JSON.parse(window.localStorage.getItem('premios'));
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codigo_qr = urlParams.get('qr');

    var pontos = premios[codigo_qr].pontos;
    var id_premio = premios[codigo_qr].id_premio;
    var id_usuario = window.localStorage.getItem('id'); 

    $("#btn_continuar_pontos, #btn_warning").click( function () {
        window.location.href = "../paginas/home.html";
    });

    $.ajax({
        method: "POST",
        dataType: 'json',
        url: "http://"+endereco+"/troca_pontos.php",
        data: { 'opcao': 'verificaTroca', 'id_usuario': id_usuario, 'id_premio': id_premio, 'pontos': pontos},
        success: function (data) {

            if (data['result'] == 1) {

                $("#div_ganhou_premio").show();
                $("#div_warning").hide();

                retiraPontuacao(pontos);

                $("#div_mensagem .span_desconto").text(pontos + ' pontos foram descontados');
    
                
            } else if (data['result'] == 2){ //PRÊMIO JÁ RESGATADO
                
                $("#div_ganhou_premio").hide();
                $("#div_warning").show();
                $("#div_warning_span").text('PRÊMIO JÁ RESGATADO');

            } else if(data['result'] == 3) { //PONTOS INSUFICIENTES
                
                $("#div_ganhou_premio").hide();
                $("#div_warning").show();
                $("#div_warning_span").text('PONTOS INSUFICIENTES');
            }

        }
    });

});

//CONTABILIZA A PONTUAÇÃO PARA O USUARIO
function retiraPontuacao(pontos) {

    var id_usuario = window.localStorage.getItem('id');

    $.ajax({
        method: "POST",
        dataType: 'json',
        url: "http://"+endereco+"/atividade.php",
        data: { 'opcao': 'retiraPontuacao', 'id_usuario': id_usuario, 'pontos': pontos },
        success: function (data) {
            localStorage.setItem('pontos', data['pontos']);
        }
    });
}






