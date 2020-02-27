document.querySelector("#prepare").addEventListener("click", function() {
    // console.log("x");
    window.QRScanner.prepare(onDone); // show the prompt    
});

function onDone(err, status){ 
    if (err) {
        // here we can handle errors and clean up any loose ends.
        console.error(err);
    }
    if (status.authorized) {
        var elements = document.getElementsByClassName('blink')

        for (var i = 0; i < elements.length; i++){
            elements[i].style.display = 'none';
        }
        window.QRScanner.show(function(status){
            window.QRScanner.scan(displayContents);
        });

    } else if (status.denied) {
        // The video preview will remain black, and scanning is disabled. We can
        // try to ask the user to change their mind, but we'll have to send them
        // to their device settings with `QRScanner.openSettings()`.
    } else {
        // we didn't get permission, but we didn't get permanently denied. (On
        // Android, a denial isn't permanent unless the user checks the "Don't
        // ask again" box.) We can ask again at the next relevant opportunity.
    }
}

function displayContents(err, text){
    if(err){
        // an error occurred, or the scan was canceled (error code `6`)
    } else {
        // The scan completed, display the contents of the QR code:
        console.log(text.result);
// document.getElementById('qrAddress').setAttribute('value', text.result);
// document.getElementById('qrAddress').style.display = 'block';
// window.QRScanner.hide(function(status){
//     var elements = document.getElementsByClassName('blink');

//     for (var i = 0; i < elements.length; i++){
//         elements[i].style.display = 'block';
//     }
//     document.getElementsByTagName("body")[0].removeAttribute('style');
// });
    }
}


// var app = {
//     onDeviceReady: function() {

//         console.log('status');
//         this.receivedEvent('deviceready');
        
        
//         document.querySelector("#prepare").addEventListener("click", function() {
//             console.log("x");
//             window.QRScanner.prepare(onDone); // show the prompt    
//         });
    
//         // document.querySelector("#show").addEventListener("touchend", function() {
//         //     window.QRScanner.show();    
//         // });
    
//         // document.querySelector("#scan").addEventListener("touchend", function() {
//         //     window.QRScanner.scan(displayContents);
//         // });
    
//         function onDone(err, status){
            
//             if (err) {
//                 // here we can handle errors and clean up any loose ends.
//                 console.error(err);
//             }
//             if (status.authorized) {
//                 var elements = document.getElementsByClassName('blink')

//                 for (var i = 0; i < elements.length; i++){
//                     elements[i].style.display = 'none';
//                 }
//                 window.QRScanner.show(function(status){
//                     window.QRScanner.scan(displayContents);
//                 });

//             } else if (status.denied) {
//                 // The video preview will remain black, and scanning is disabled. We can
//                 // try to ask the user to change their mind, but we'll have to send them
//                 // to their device settings with `QRScanner.openSettings()`.
//             } else {
//                 // we didn't get permission, but we didn't get permanently denied. (On
//                 // Android, a denial isn't permanent unless the user checks the "Don't
//                 // ask again" box.) We can ask again at the next relevant opportunity.
//             }
//         }
    
//         function displayContents(err, text){
//             if(err){
//                 // an error occurred, or the scan was canceled (error code `6`)
//             } else {
//                 // The scan completed, display the contents of the QR code:
//                 console.log(text.result);
//         // document.getElementById('qrAddress').setAttribute('value', text.result);
//         // document.getElementById('qrAddress').style.display = 'block';
//         // window.QRScanner.hide(function(status){
//         //     var elements = document.getElementsByClassName('blink');

//         //     for (var i = 0; i < elements.length; i++){
//         //         elements[i].style.display = 'block';
//         //     }
//         //     document.getElementsByTagName("body")[0].removeAttribute('style');
//         // });
//             }
//         }
//     }
// };   

// console.log(app)

// function onDone(err, status){
//     console.log(status);
//     if (err) {
//         // here we can handle errors and clean up any loose ends.
//     }
//     if (status.authorized) {
//         var elements = document.getElementsByClassName('blink')

//         for (var i = 0; i < elements.length; i++){
//             elements[i].style.display = 'none';
//         }
//         window.QRScanner.show(function(status){
//             window.QRScanner.scan(displayContents);
//         });
//     } else if (status.denied) {
//         // The video preview will remain black, and scanning is disabled. We can
//         // try to ask the user to change their mind, but we'll have to send them
//         // to their device settings with `QRScanner.openSettings()`.
//     } else {
//         // we didn't get permission, but we didn't get permanently denied. (On
//         // Android, a denial isn't permanent unless the user checks the "Don't
//         // ask again" box.) We can ask again at the next relevant opportunity.
//     }
// }

// function displayContents(err, text){
//     if(err){
//         console.log("erro");
//         // an error occurred, or the scan was canceled (error code `6`)
//     } else {
//         console.log(text.result);
//         document.getElementById('qrAddress').setAttribute('value', text.result);
//         document.getElementById('qrAddress').style.display = 'block';
//         window.QRScanner.hide(function(status){
//             var elements = document.getElementsByClassName('blink');

//             for (var i = 0; i < elements.length; i++){
//                 elements[i].style.display = 'block';
//             }
//             document.getElementsByTagName("body")[0].removeAttribute('style');
//         });
//     }
// }