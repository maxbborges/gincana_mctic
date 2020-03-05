$(".nome_usuario").text(localStorage.getItem('usuario'));
$(".span_pontos").text(localStorage.getItem('pontos'));


$("#btn_ler_qr, #btn_trocar_pontos").click( function () {
    window.location.href = 'ler_qr.html';
});

