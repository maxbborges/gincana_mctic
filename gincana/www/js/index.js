$(document).ready(function () {
    $("#footer").load("paginas/footer.html");

    var app = {
        // Application Constructor
        initialize: function () {
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        },
        onDeviceReady: function () {
            document.querySelector("#deletar_cookie").addEventListener("click", function () {
                document.cookie = 'PHPSESSID=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                // console.log('limpo');
            });
        },

        // Update DOM on a Received Event
        receivedEvent: function (id) {
            var parentElement = document.getElementById(id);
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');

            console.log('Received Event: ' + id);
        }
    };

    app.initialize();

    $("#tipoRedeSocial").change(function () {
        // console.log('ee');
    });
});
