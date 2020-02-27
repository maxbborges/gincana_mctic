/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

$("#footer").load("paginas/footer.html"); 

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        document.getElementsByTagName("body")[0].setAttribute('style', 'display:none;');
        verificaSessao();

        if (window.location.pathname=='/'){
            // this.receivedEvent('deviceready');
            
        // } else if(window.location.pathname=='paginas/index.html'){
        //     document.getElementById("cookie").setAttribute('value', window.localStorage.getItem('sessao'));
        //     document.querySelector("#btn-login").addEventListener("click", function() {
        //         login();
        //     });
        // } else if(window.location.pathname=='/paginas/inicial.html'){
            // document.querySelector("#scan").addEventListener("click", function() {
            //     window.QRScanner.prepare(onDone);
                
            // });
        }
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

function verificaSessao(){
    // console.log(PHPSESSID);
    // window.localStorage.setItem("login", "value");
    // console.log(document.cookie);
    // console.log(window.localStorage.getItem('login'));
    // console.log(window.localStorage);
    // var usuario = window.localStorage.getItem('usuario');
    $.ajax({
        method: "GET",
        url: "http://localhost/",
        dataType: 'jsonp',
        success: function(data, textStatus, jqXHR){
            console.log(data);
            if(data['status']==0){
                setTimeout(() => {window.location = 'paginas/index.html';}, 8000);
            } else {
                console.log(data)
                setTimeout(() => {window.location = 'paginas/home.html';}, 8000);
            }
        }
    });
}

// function login(){
//     $.ajax({
//         method: 'POST',
//         url: 'http://localhost/',
//         data : $("#login-form").serialize(),
//         dataType: 'json',
//         success:  function(response){
//             console.log(response);
//             if(response['status'] == 0){
//                 // console.log(response);
                
                
//                 // setTimeout(() => {window.location = 'inicial.html';}, 2000);
//                 // $("#btn-login").html('Entrar');
//             //     $("#login-alert").css('display', 'none')
//             //     window.location.href = "home.php";
//             } else {
//                 setTimeout(() => {window.location = 'paginas/home.html';}, 2000);
//             }
//         }
//         // beforeSend: function(xhr) {
//         //     console.log(xhr);
//         // }
//     })
//     .fail(function(jqXHR, textStatus, msg){
//         console.log(msg);
//         console.log(textStatus);
//         console.log(jqXHR);
//     });
// }

function onDone(err, status){
    if (err) {
        // here we can handle errors and clean up any loose ends.
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
        console.log("erro");
        // an error occurred, or the scan was canceled (error code `6`)
    } else {
        console.log(text.result);
        document.getElementById('qrAddress').setAttribute('value', text.result);
        document.getElementById('qrAddress').style.display = 'block';
        window.QRScanner.hide(function(status){
            var elements = document.getElementsByClassName('blink');

            for (var i = 0; i < elements.length; i++){
                elements[i].style.display = 'block';
            }
            document.getElementsByTagName("body")[0].removeAttribute('style');
        });
    }
}