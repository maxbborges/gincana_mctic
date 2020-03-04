$(document).ready( function () {

    const atividades = JSON.parse(window.localStorage.getItem('atividades'));
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codigo_qr = urlParams.get('qr');

    var tipo_atividade = atividades[codigo_qr]['id_tipo_qr'];
    var pontos = 0;

    if(tipo_atividade != undefined){
        if(tipo_atividade == 1){
            $("#atividade_1").show();
            $("#atividade_2").hide();
            $("#div_desc_atividade_fisico p").html(atividades[codigo_qr]['desc_atividade'] + ". <br>(este desafio deve ser validado pelo monitor para obter pontuação)");
            pontos = atividades[codigo_qr]['pontos'];
        } else {
            var alternativa = "";
            var resposta_certa = "";
            var checked = "";
            var count = 1;

            $("#atividade_1").hide();
            $("#atividade_2").show();
            $("#div_desc_atividade_quiz p").html(atividades[codigo_qr]['desc_atividade']);
            pontos = atividades[codigo_qr]['pontos'];      
            
            
            
            $.each(atividades[codigo_qr]['alternativas'], function(i, item) {
                alternativa = atividades[codigo_qr]['alternativas'][i].desc_alternativa;
                resposta = atividades[codigo_qr]['alternativas'][i].resposta_certa;

                if(resposta === 'S'){
                    resposta_certa = alternativa;
                }

                if(count == 1){
                    checked = 'checked';
                }

                $("#alternativas_quiz").append(
                    '<input class="form-check-input" type="radio" name="alternativaQuiz" id="alternativa_'+ i +'" value="option1" ' + checked + '>\n\
                        <label class="form-check-label label_alternativa" for="alternativa_'+ i +'">\n\
                            '+ alternativa +'\n\
                        </label><br>');
                
                count++;
                checked = "";
            });
        }
    }

    $("#btn_seguinte_atividade, #btn_cancelar_quiz, #btn_continuar_jogando").click( function (){
        window.location.href = '../paginas/home.html';
    });

    $("#btn_trocar_pontos").click( function (){
        window.location.href = '../paginas/ler_qr.html';
    });

    $("#btn_seguinte_quiz").click( function () {
        $("#atividade_2").hide();
        $("#div_ganha_pontos").show();

        $("#resposta_certa").append(resposta_certa);
        $("#div_pontos_ganhos .span_pontuacao").html('<strong>' + pontos + '</strong>');

        enviaPontuacao(pontos);
    });
});

function enviaPontuacao(pontos) {
    var id_usuario = window.localStorage.getItem('id');
    $.ajax({
        method: "POST",
        dataType: 'json',
        url: "http://localhost/atividade.php",
        data: {'opcao': 'enviarPontuacao', 'id_usuario': id_usuario, 'pontos': pontos},
        success: function (data){
            localStorage.setItem('pontos', data['pontos']);
        }
    });    
}




