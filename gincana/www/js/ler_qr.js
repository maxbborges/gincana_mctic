var atividades = JSON.parse(window.localStorage.getItem('atividades'));

let scanner = new Instascan.Scanner({
        video: document.getElementById('preview')
});

scanner.addListener('scan', function(content) {
    window.location.href = '../paginas/atividade.html?qr=' + content;
    window.open(content, "_blank");
});

Instascan.Camera.getCameras().then(cameras => 
{
    if(cameras.length > 0){
        if(typeof(cameras[1]) != "undefined") {
            scanner.start(cameras[1]);
        } else {
            scanner.start(cameras[0]);
        }        
    } else {
        console.error("Não existe câmera no dispositivo!");
    }
});

$("#btn_voltar_qr").click(function () {
    window.location.href = '../paginas/home.html';
});






