$("#footer").load("paginas/footer.html"); 

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        // document.getElementsByTagName("body")[0].setAttribute('style', 'display:none;');
        verificaSessao();

        document.querySelector("#prepare1").addEventListener("click", function() {
            window.QRScanner.prepare(onDone);
        });
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
                localStorage.setItem('usuario',data['usuario']);
                localStorage.setItem('pontos',data['pontos']);
                setTimeout(() => {window.location = 'paginas/home.html';}, 8000);
            }
        }
    });
}