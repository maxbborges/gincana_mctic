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
            console.log(response);
            if(response['login']['status'] == 0){
                alert("Preencha todos os campos!");
            } else {
                localStorage.setItem('atividades', JSON.stringify(response['atividades']));
                localStorage.setItem('usuario',response['login']['usuario']);
                localStorage.setItem('pontos',response['login']['pontos']);
                window.location = 'home.html';                
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