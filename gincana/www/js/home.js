// if (localStorage.getItem('pontos')&&localStorage.getItem('usuario')){
    $(".nome_usuario").text(localStorage.getItem('usuario'));
    $(".span_pontos").text(localStorage.getItem('pontos'));
    document.querySelector("#btn_ler_qr").addEventListener("click", function() {
        window.location = 'ler_qr.html';
        // setTimeout(() => {window.location = 'ler_qr.html';}, 1000);
    });
// } else {
//     alert('Crie o cadastro para continuar!');
//     window.location = 'index.html';
// }

var atividades = JSON.parse(window.localStorage.getItem('atividades'));
console.log(atividades);