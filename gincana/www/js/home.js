$(document).ready( function () {
    $(".nome_usuario").text(localStorage.getItem('usuario'));
    $(".span_pontos").text(localStorage.getItem('pontos'));
    $("#span_codigo").text(localStorage.getItem('codigo'));

    $("#btn_ler_qr, #btn_trocar_pontos").click( function () {
        window.location.href = 'ler_qr.html';
    });

    $("#span_link_sair").click( function () {
        $("#modal_sair").modal('show');
    });

    $("#confirma_sair").click(function () {
        localStorage.clear();
        $("#modal_sair").modal('hide');
        location.reload();
    });

});
