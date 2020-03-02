$("#footer").load("paginas/footer.html"); 

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        // document.getElementsByTagName("body")[0].setAttribute('style', 'display:none;');
        verificaSessao();

        document.querySelector("#deletar_cookie").addEventListener("click", function() {
            document.cookie ='PHPSESSID=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            console.log('limpo');
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
            if(data['status']==0){
                setTimeout(() => {window.location = 'paginas/index.html';}, 2000);
            } else {
                localStorage.setItem('usuario',data['usuario']);
                localStorage.setItem('pontos',data['pontos']);
                setTimeout(() => {window.location = 'paginas/home.html';}, 2000);
            }
        }
    });
}