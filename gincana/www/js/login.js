$("#footer").load("footer.html");

var v = document.cookie.match('(^|;) ?PHPSESSID=([^;]*)(;|$)');
if (v!=null){
    document.getElementById("cookie").setAttribute('value', v[2]);
    document.querySelector("#btn-login").addEventListener("click", function() {
        window.location = 'termos_condicoes.html';
        localStorage.setItem('userInfo', $("#login-form").serialize());
        localStorage.setItem('usuario', $("#nome").val());
    });
} else {
    alert ('Erro, não foi buscar sua sessão!');
}