
 $("#footer").load("footer.html"); 


document.getElementById("cookie").setAttribute('value', ((document.cookie).split("="))[1]);
document.querySelector("#btn-login").addEventListener("click", function() {
    // console.log(window.localStorage.getItem('login'));
    login();
});

function login(){
    $.ajax({
        method: 'POST',
        url: 'http://localhost/index3.php',
        data : $("#login-form").serialize(),
        dataType: 'json',
        success:  function(response){
            // console.log(response);
            if(response['status'] == 0){
                console.log('erro');
                console.log(response);
                // setTimeout(() => {window.location = 'inicial.html';}, 2000);
                // $("#btn-login").html('Entrar');
            //     $("#login-alert").css('display', 'none')
            //     window.location.href = "home.php";
            } else {
                console.log('carregando!');
                setTimeout(() => {window.location = 'home.html';}, 7000);
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