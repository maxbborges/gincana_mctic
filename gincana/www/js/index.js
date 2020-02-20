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
var teste=[];
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        if (window.location.pathname=='/'){
            this.receivedEvent('deviceready');
            verificaSessao();
        } else if(window.location.pathname=='/paginas/login.html'){
            document.querySelector("#btn-login").addEventListener("click", function() {
                login();
            });
        } else if(window.location.pathname=='/paginas/inicial.html'){
            document.querySelector("#scan").addEventListener("click", function() {
                window.QRScanner.prepare(onDone);
                
            });
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
    console.log(document.cookie);
    // var usuario = window.localStorage.getItem('usuario');
    // if (usuario!=null){
    //     setTimeout(() => {window.location = 'paginas/inicial.html';}, 2000);
    // } else {
    //     setTimeout(() => {window.location = 'paginas/login.html';}, 2000);
    // }
    $.ajax({
        method: "GET",
        url: "http://localhost/",
        dataType: 'json',
        success: function(data, textStatus, jqXHR){
            
            // console.log(window.localStorage)
            console.log(data);
            console.log(textStatus);
            console.log(jqXHR);
            // setTimeout(() => {window.location = 'paginas/login.html';}, 5000);
            if(data['status']==0){
                // setTimeout(() => {window.location = 'paginas/login.html';}, 2000);
            } else {
                // setTimeout(() => {window.location = 'paginas/inicial.html';}, 2000);
                // window.localStorage.setItem("key", "value");
                // console.log(window.localStorage);
            }
        }
    });
    
}

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

function login(){
    console.log(teste);
    $.ajax({
        method: 'POST',
        url: 'http://localhost/',
        data : $("#login-form").serialize(),
        dataType: 'json',
        success:  function(response){
            console.log(response);
            if(response['status'] == 0){
                // console.log(response);
                
                
                // setTimeout(() => {window.location = 'inicial.html';}, 2000);
                // $("#btn-login").html('Entrar');
            //     $("#login-alert").css('display', 'none')
            //     window.location.href = "home.php";
            } else {
                // setTimeout(() => {window.location = 'inicial.html';}, 2000);
            }
        }
        // beforeSend: function(xhr) {
        //     console.log(xhr);
        // }
    })
    .fail(function(jqXHR, textStatus, msg){
        console.log(msg);
        console.log(textStatus);
        console.log(jqXHR);
    });
}