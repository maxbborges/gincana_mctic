$(document).ready(function () {

    const atividades = JSON.parse(window.localStorage.getItem('atividades'));
    const qr_finaliza = JSON.parse(window.localStorage.getItem('qr_finaliza'));
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codigo_qr = urlParams.get('qr');
    const tipo_qr = urlParams.get('tipo');

    var pontos = 0;

    if (tipo_qr == 1) { //ATIVIDADE FÍSICA
        pontos = atividades[codigo_qr]['pontos'];

        $("#atividade_1").show();
        $("#atividade_2").hide();
        $("#div_warning").hide();
        $("#div_ganha_pontos").hide();

        $("#div_desc_atividade_fisico p").html(atividades[codigo_qr]['desc_atividade'] + ". <br>(este desafio deve ser validado pelo monitor para obter pontuação)");
        
    } else if (tipo_qr == 2) { //ATIVIDADE QUIZ
        var alternativa = "";
        var resposta_certa = "";
        var checked = "";
        var count = 1;
        pontos = atividades[codigo_qr]['pontos']; 

        $("#atividade_1").hide();
        $("#atividade_2").show();
        $("#div_warning").hide();
        $("#div_ganha_pontos").hide();        

        $("#div_desc_atividade_quiz p").html(atividades[codigo_qr]['desc_atividade']);               

        $.each(atividades[codigo_qr]['alternativas'], function (i, item) {
            alternativa = atividades[codigo_qr]['alternativas'][i].desc_alternativa;
            resposta = atividades[codigo_qr]['alternativas'][i].resposta_certa;

            if (resposta === 'S') {
                resposta_certa = alternativa;
            }

            if (count == 1) {
                checked = 'checked';
            }

            $("#alternativas_quiz").append(
                '<input class="form-check-input" type="radio" name="alternativaQuiz" id="alternativa_' + i + '" value="option1" ' + checked + '>\n\
                 <label class="form-check-label label_alternativa" for="alternativa_'+ i + '">\n\
                    '+ alternativa + '\n\
                 </label><br>');

            count++;
            checked = "";
        });

    } else if (tipo_qr == 4) { //QR FINALIZA ATIVIDADE
        
        var atividade_finaliza = qr_finaliza[codigo_qr].finaliza_atividade;
        pontos = atividades[atividade_finaliza]['pontos'];

        $("#atividade_1").hide();
        $("#atividade_2").hide();
        $("#div_warning").hide();
        $("#div_ganha_pontos").show(); 
        $("#resposta_certa").hide();

        $("#div_pontos_ganhos .span_pontuacao").html('<strong>' + pontos + '</strong>');

        enviaPontuacao(pontos);
    }


    $("#btn_seguinte_atividade, #btn_cancelar_quiz, #btn_continuar_jogando").click(function () {
        window.location.href = '../paginas/home.html';
    });

    $("#btn_trocar_pontos").click(function () {
        window.location.href = '../paginas/ler_qr.html';
    });

    $("#btn_seguinte_quiz").click(function () {
        $("#atividade_2").hide();
        $("#div_ganha_pontos").show();

        $("#resposta_certa").append(resposta_certa);
        $("#div_pontos_ganhos .span_pontuacao").html('<strong>' + pontos + '</strong>');

        enviaPontuacao(pontos);
    });
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




