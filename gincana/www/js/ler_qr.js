var atividades = JSON.parse(window.localStorage.getItem('atividades'));

// window.addEventListener("load", function () {
//     setTimeout(() => {
//         QRScanner.prepare(onDone);
//     }, 1000);
// });
//
// function onDone(err, status) {
//     if (err) {
//         alert("Não foi possível acessar a câmera do dispositivo");
//         $("#img_load_qr").hide();
//         $("#div_qr_screen").hide();
//         $("#div_qr_manual").show();
//         $("#div_btn_voltar_qr").hide();
//         $("#div_btn_qr_manual").show();
//         $("#span_title_qr").html("Digite o código do QR code");
//     }
//     if (status.authorized) {
//         $("#img_load_qr").hide();
//         $("#div_qr_screen").show();
//         $("#div_btn_voltar_qr").show();
//         $("#div_btn_qr_manual").hide();
//         $("#span_title_qr").html("Escaneie o código do QR code");
//
//         var elements = document.getElementsByClassName('blink')
//         for (var i = 0; i < elements.length; i++) {
//             elements[i].style.display = 'none';
//         }
//         window.QRScanner.show(function (status) {
//             QRScanner.scan(displayContents);
//         });
//     } else if (status.denied) {
//         alert("Não foi possível acessar a câmera do dispositivo");
//         $("#img_load_qr").hide();
//         $("#div_qr_screen").hide();
//         $("#div_qr_manual").show();
//         $("#div_btn_voltar_qr").hide();
//         $("#div_btn_qr_manual").show();
//         $("#span_title_qr").html("Digite o código do QR code");
//     } else {
//         alert("Não foi possível acessar a câmera do dispositivo");
//         $("#img_load_qr").hide();
//         $("#div_qr_screen").hide();
//         $("#div_qr_manual").show();
//         $("#div_btn_voltar_qr").hide();
//         $("#div_btn_qr_manual").show();
//         $("#span_title_qr").html("Digite o código do QR code");
//     }
// }
// function displayContents(err, text) {
//     if (err) {
//         // an error occurred, or the scan was canceled (error code `6`)
//         alert("Ocorreu um erro!");
//         $("#img_load_qr").hide();
//         $("#div_qr_screen").hide();
//         $("#div_qr_manual").show();
//         $("#div_btn_voltar_qr").hide();
//         $("#div_btn_qr_manual").show();
//         $("#span_title_qr").html("Digite o código do QR code");
//     } else {
//         // The scan completed, display the contents of the QR code:
//         verificaQr(text);
//     }
// }

$("#btn_enviar_qr").click(function () {
    var text = $("#text_qr_manual").val();
    verificaQr(text);
});

let scanner = new Instascan.Scanner({
        video: document.getElementById('preview')
});

scanner.addListener('scan', function(content) {
    verificaQr(content);
    // window.open(content, "_blank");
});

Instascan.Camera.getCameras().then(cameras => {
    if (cameras.length > 0) {
        $("#img_load_qr").hide();
        $("#div_qr_screen").show();
        $("#div_btn_voltar_qr").show();
        $("#div_btn_qr_manual").hide();
        $("#span_title_qr").html("Escaneie o código do QR code");

        var selectedCam = cameras[0];
        $.each(cameras, (i, c) => {
          if (c.name.indexOf('back') != -1) {
            selectedCam = c;
            return false;
          }
          if (c.name.indexOf('Trás') != -1) {
            selectedCam = c;
            return false;
          }
        });
        scanner.start(selectedCam);
//
//
//
//         if (cameras.length == 1) {
//
//             alert (JSON.stringify(cameras));
//             var selectedCam = cameras[0];
// $.each(cameras, (i, c) => {
//   alert(JSON.stringify(c));
//     if (c.name.indexOf('integrated') != -1) {
//         selectedCam = c;
//         return false;
//     }
// });
//             scanner.start(selectedCam);
//         } else {
//           var selectedCam = cameras[0];
//           $.each(cameras, (i, c) => {
//             if (c.name.indexOf('back') != -1) {
//               selectedCam = c;
//               return false;
//             }
//             if (c.name.indexOf('Trás') != -1) {
//               selectedCam = c;
//               return false;
//             }
//           });
//           scanner.start(selectedCam);
//
//
//
//
//
//
//           if (navigator.userAgent.match(/android/i)) {
//             var selectedCam = cameras[0];
// $.each(cameras, (i, c) => {
//     if (c.name.indexOf('back') != -1) {
//       alert(JSON.stringify(c));
//         selectedCam = c;
//         return false;
//     }
// });
//             scanner.start(selectedCam);
//           } else if (navigator.userAgent.match(/linux/i)) {
//              alert('vc usa Linux e possui:'+cameras.length);
//           } else if (navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPhone/i)){
//             var selectedCam = cameras[0];
//             $.each(cameras, (i, c) => {
//               if (c.name.indexOf('back') != -1) {
//                 selectedCam = c;
//                 return false;
//               }
//               if (c.name.indexOf('Trás') != -1) {
//                 selectedCam = c;
//                 return false;
//               }
//             });
//             scanner.start(selectedCam);
//           }else if (navigator.userAgent.match(/Windows/i)){
//             alert('vc usa seu pc de casa e possui: '+cameras.length);
//           }
//         }
    } else {
        alert("Não foi possível acessar a câmera do dispositivo1");
        $("#img_load_qr").hide();
        $("#div_qr_screen").hide();
        $("#div_qr_manual").show();
        $("#div_btn_voltar_qr").show();
        $("#div_btn_qr_manual").hide();
        $("#span_title_qr").html("Digite o código do QR code");
    }
}).catch(function (e) {
    alert("Não foi possível acessar a câmera do dispositivo2");
    $("#img_load_qr").hide();
    $("#div_qr_screen").hide();
    $("#div_qr_manual").show();
    $("#div_btn_voltar_qr").hide();
    $("#div_btn_qr_manual").show();
    $("#span_title_qr").html("Digite o código do QR code");
});

$(".btn_voltar_ler_qr").click(function () {
    window.location.href = '../paginas/home.html';
});

function verificaQr(content) {
    if (typeof content=='object'){
      content=content.result;
    }
    var arr_qr = JSON.parse(window.localStorage.getItem('todos_qr'));
    var tipo = arr_qr[content];

    if (tipo == 1 || tipo == 2 || tipo == 4) {
        //atividade fisica, atividade quiz e finalização de atividade pelo monitor
        window.location.href = '../paginas/atividade.html?qr=' + content + '&tipo=' + arr_qr[content];
    } else if (tipo == 3) {
        //troca de pontos
        window.location.href = '../paginas/troca_pontos.html?qr=' + content;
    } else {
        alert('QR não encontrado!');
        window.location.href = '../paginas/home.html';
    }

}
