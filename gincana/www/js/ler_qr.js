let scanner = new Instascan.Scanner({
        video: document.getElementById('preview')
});

scanner.addListener('scan', function(content) {
    buscarAtividades(content);
    alert('Escaneou o conteudo: ' + content);
    window.open(content, "_blank");
});

Instascan.Camera.getCameras().then(cameras => 
{
    if(cameras.length > 0){
        scanner.start(cameras[1]);
    } else {
        console.error("Não existe câmera no dispositivo!");
    }
});

$("#btn_voltar_qr").click(function () {
    window.location.href = '../paginas/home.html';
});

var atividades = JSON.parse(window.localStorage.getItem('atividades'));
console.log(atividades);

buscarAtividades('MCTIC0009');

function buscarAtividades(id_qr){
    $.ajax({
        method: "GET",
        url: "http://localhost/",
        dataType: 'json',
        success: function(data){
            console.log(data);
            // if(data['status']==0){
            //     setTimeout(() => {window.location = 'paginas/index.html';}, 8000);
            // } else {
            //     console.log(data);
            //     localStorage.setItem('usuario',data['usuario']);
            //     localStorage.setItem('pontos',data['pontos']);
            //     setTimeout(() => {window.location = 'paginas/home.html';}, 8000);
            // }
        }
    });
}



// if (localStorage.getItem('pontos')&&localStorage.getItem('usuario')){
    
    // window.addEventListener("load", function(){
    //     $("#div_load").show();
    //     setTimeout(() => {QRScanner.prepare(onDone);}, 1000);
    // });
    
    // function onDone(err, status){ 
    //     $("#div_load").hide();
    //     if (err) {
    //         if(err.code === 5){
    //             alert("Câmera não encontrada ou permissão negada"); 
    //         }
                                       
    //         // window.location.href = '../paginas/home.html';          
    //     }
    //     if (status.authorized) {
    //         // var elements = document.getElementsByClassName('qrcode_apagar')
    
    //         // for (var i = 0; i < elements.length; i++){
    //         //     elements[i].style.display = 'none';
    //         // }
    //         // window.QRScanner.show(function(status){
    //             // setTimeout(() => {
    //             //     QRScanner.getStatus(function(status){
    //             //     console.log(status);
    //             //   })}, 200);
                
    //            QRScanner.scan(displayContents);
    //         // });
    
    //     } else if (status.denied) {
    //         alert('Uso da câmera não permitido');
    //         window.location.href = '../paginas/home.html';
    //     } else {
    //         alert(err);
    //         alert(status);           
    //     }
    // }
    
    // function displayContents(err, text){
    //     alert('ddd');
    //     if(err){
    //         // an error occurred, or the scan was canceled (error code `6`)
    //     } else {
    //         // The scan completed, display the contents of the QR code:
    //         alert('ss');
    //         // alert(text.result);
    //         // document.getElementById('qrAddress').setAttribute('value', text.result);
    //         // document.getElementById('qrAddress').style.display = 'block';
    //         // window.QRScanner.hide(function(status){
    //         //     var elements = document.getElementsByClassName('blink');
    
    //         //     for (var i = 0; i < elements.length; i++){
    //         //         elements[i].style.display = 'block';
    //         //     }
    //         //     document.getElementsByTagName("body")[0].removeAttribute('style');
    //         // });
    //     }
    // }
// } else {
//     alert('Crie o cadastro para continuar!');
//     window.location = 'index.html';
// }


