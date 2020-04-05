// endereco = 'http://localhost:80/atividade.php'
endereco = 'https://mbbdev.site/wp-content/plugins/plugin_maxwell/includes/projeto_mctic/gincana_server/atividade.php';
$(document).ready(function () {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    tipo_qr = urlParams.get('tipo');
    codigo_qr = urlParams.get('qr');
    atividades = JSON.parse(window.localStorage.getItem('atividades'));
    id_usuario = window.localStorage.getItem('id');

    $("#btn_warning").click(function () {
        window.location.href = "../paginas/home.html";
    });

    if (tipo_qr == 1 || tipo_qr == 2) {

        if (atividades[codigo_qr] != undefined) {
            if (atividades[codigo_qr]['id_atividade'] != undefined && atividades[codigo_qr]['pontos'] != undefined) {
                id_atividade = atividades[codigo_qr]['id_atividade'];
                pontos = atividades[codigo_qr]['pontos'];
            } else {
                alert('Código não encontrado');
                window.location.href = "../paginas/home.html";
            }
        } else {
            alert('Código não encontrado');
            window.location.href = "../paginas/home.html";
        }


    }

    if (tipo_qr == 1) { //ATIVIDADE FÍSICA

        // $.ajax({
        //     method: "POST",
        //     dataType: 'json',
        //     url: protocolo + endereco + porta2+ "/atividade.php",
        //     data: { 'opcao': 'verificaFezAtividade', 'id_usuario': id_usuario, 'id_atividade': id_atividade },
        //     success: function (data) {

        //         if (!data['result']) {
                    $("#atividade_1").show();
                    $("#atividade_2").hide();
                    $("#div_warning").hide();
                    $("#div_ganha_pontos").hide();

                    $("#div_desc_atividade_fisico p").html(atividades[codigo_qr]['desc_atividade'] + ". <br>(este desafio deve ser validado pelo monitor para obter pontuação)");
                // } else {

                //     $("#atividade_1").hide();
                //     $("#atividade_2").hide();
                //     $("#div_warning").show();
                //     $("#div_ganha_pontos").hide();
                // }
        //     }
        // });


    } else if (tipo_qr == 2) { //ATIVIDADE QUIZ

        $.ajax({
            method: "POST",
            dataType: 'json',
            url: endereco,
            data: { 'opcao': 'verificaFezAtividade', 'id_usuario': id_usuario, 'id_atividade': id_atividade },
            success: function (data) {
                if (!data['result']) {
                    atividadeQuiz(id_atividade, pontos);
                } else {
                    $("#atividade_1").hide();
                    $("#atividade_2").hide();
                    $("#div_warning").show();
                    $("#div_ganha_pontos").hide();
                }
            }
        });

    } else if (tipo_qr == 4) { //QR FINALIZA ATIVIDADE

        var qr_finaliza = JSON.parse(window.localStorage.getItem('qr_finaliza'));

        if (qr_finaliza[codigo_qr] != undefined) {

            // var atividade_finaliza = qr_finaliza[codigo_qr].finaliza_atividade;
            // var id_atividade = atividades[atividade_finaliza]['id_atividade'];
            // pontos = atividades[atividade_finaliza]['pontos'];

            // var atividade_finaliza = qr_finaliza[codigo_qr].finaliza_atividade;
            var id_atividade = qr_finaliza[codigo_qr].id;
            pontos = qr_finaliza[codigo_qr].pontos;


            $.ajax({
                method: "POST",
                dataType: 'json',
                url: endereco,
                data: { 'opcao': 'verificaFezAtividade', 'id_usuario': id_usuario, 'id_atividade': id_atividade },
                success: function (data) {

                    if (!data['result']) {
                        $("#atividade_1").hide();
                        $("#atividade_2").hide();
                        $("#div_warning").hide();
                        $("#div_ganha_pontos").show();
                        $("#resposta_certa").hide();

                        $("#div_pontos_ganhos .span_pontuacao").html('<strong>' + pontos + '</strong>');

                        enviaPontuacao(pontos, id_atividade);
                    } else {
                        $("#atividade_1").hide();
                        $("#atividade_2").hide();
                        $("#div_warning").show();
                        $("#div_ganha_pontos").hide();
                    }
                }
            });
        } else {
            alert('Código não encontrado');
            window.location.href = "../paginas/home.html";
        }

    } else {
        alert('Código não encontrado');
        window.location.href = "../paginas/home.html";
    }


    $("#btn_seguinte_atividade, #btn_cancelar_quiz, #btn_continuar_jogando").click(function () {
        window.location.href = '../paginas/home.html';
    });

    $("#btn_trocar_pontos").click(function () {
        window.location.href = '../paginas/ler_qr.html';
    });

    $("#btn_seguinte_quiz").click(function () {
        var id_atividade = atividades[codigo_qr]['id_atividade'];

        $("#atividade_2").hide();
        $("#div_ganha_pontos").show();

        $("#div_pontos_ganhos .span_pontuacao").html('<strong>' + pontos + '</strong>');

        enviaPontuacao(pontos, id_atividade);
    });
});

//CONTABILIZA A PONTUAÇÃO PARA O USUARIO
function enviaPontuacao(pontos, id_atividade) {

    $.ajax({
        method: "POST",
        dataType: 'json',
        url: endereco,
        data: { 'opcao': 'enviarPontuacao', 'id_usuario': id_usuario, 'pontos': pontos, 'id_atividade': id_atividade },
        success: function (data) {
            localStorage.setItem('pontos', data['pontos']);
        }
    });
}


function atividadeQuiz(id_atividade, pontos) {

    var alternativa = "";
    var res_certa = "";
    var checked = "";
    var count = 1;
    var atividades = JSON.parse(window.localStorage.getItem('atividades'));

    $("#atividade_1").hide();
    $("#atividade_2").show();
    $("#div_warning").hide();
    $("#div_ganha_pontos").hide();

    $("#div_desc_atividade_quiz p").html(atividades[codigo_qr]['desc_atividade']);

    $.each(atividades[codigo_qr]['alternativas'], function (i, item) {
        alternativa = atividades[codigo_qr]['alternativas'][i].desc_alternativa;
        resposta = atividades[codigo_qr]['alternativas'][i].resposta_certa;

        if (resposta === 'S') {
            $("#resposta_certa").append(alternativa);
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

}
