$(".nome_usuario").text(localStorage.getItem('usuario'));
$(".span_pontos").text(localStorage.getItem('pontos'));


$("#btn_ler_qr").click( function () {
    window.location.href = 'ler_qr.html';
});

$("#btn_trocar_pontos").click( function () {
    window.location.href = 'troca_pontos.html';
});