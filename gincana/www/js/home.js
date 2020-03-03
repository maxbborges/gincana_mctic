$(".nome_usuario").text(localStorage.getItem('usuario'));
$(".span_pontos").text(localStorage.getItem('pontos'));
document.querySelector("#btn_ler_qr").addEventListener("click", function() {
    window.location = 'ler_qr.html';
});