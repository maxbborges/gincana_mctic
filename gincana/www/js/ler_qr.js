var atividades = JSON.parse(window.localStorage.getItem('atividades'));

let scanner = new Instascan.Scanner({
        video: document.getElementById('preview')
});

scanner.addListener('scan', function(content) {
    verificaQr(content);    
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

function verificaQr(content){
    var arr_qr = JSON.parse(window.localStorage.getItem('todos_qr'));
    var tipo = arr_qr[content];

    if(tipo == 1 || tipo == 2 || tipo == 4){
        //atividade fisica, atividade quiz e finalização de atividade pelo monitor
        window.location.href = '../paginas/atividade.html?qr=' + content + '&tipo=' + arr_qr[content];
    } else if( tipo == 3){
        //troca de pontos
        window.location.href = '../paginas/troca_pontos.html?qr=' + content;
    } else {
        window.location.href = '../paginas/home.html';
    }

}






