$(document).ready( function () {

    const atividades = JSON.parse(window.localStorage.getItem('atividades'));
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codigo_qr = urlParams.get('qr');

    var tipo_atividade = atividades[codigo_qr]['id_tipo_atividade'];
    if(tipo_atividade != undefined){
        if(tipo_atividade == 1){
            $("#atividade_1").show();
            $("#atividade_2").hide();
            $("#div_desc_atividade_fisico p").html(atividades[codigo_qr]['desc_atividade'] + ". <br>(este desafio deve ser validado pelo monitor para obter pontuação)");
        } else {
            $("#atividade_1").hide();
            $("#atividade_2").show();
            $("#div_desc_atividade_quiz p").html(atividades[codigo_qr]['desc_atividade']);
             
            var alternativa = "";
            $.each(atividades[codigo_qr]['alternativas'], function(i, item) {
                alternativa = atividades[codigo_qr]['alternativas'][i].desc_alternativa;
                $("#alternativas_quiz").append(
                    '<input class="form-check-input" type="radio" name="alternativaQuiz" id="alternativa_'+ i +'" value="option1" checked>\n\
                        <label class="form-check-label label_alternativa" for="alternativa_'+ i +'">\n\
                            '+ alternativa +'\n\
                        </label><br>');
            });
        }
    }

    $("#btn_seguinte_atividade").click( function (){
        window.location.href = '../paginas/home.html';
    });

    $("#btn_cancelar_quiz").click( function (){
        window.location.href = '../paginas/home.html';
    });

});




