$("#footer").load("footer.html");

var v = document.cookie.match('(^|;) ?PHPSESSID=([^;]*)(;|$)');
if (v!=null){
    document.getElementById("cookie").setAttribute('value', v[2]);
    document.querySelector("#btn-login").addEventListener("click", function() {
        localStorage.setItem('userInfo', $("#login-form").serialize());
        localStorage.setItem('usuario', $("#nome").val());
    });
} else {
    
    if (window.location.pathname!='/paginas/index.html'&&
        window.location.pathname!='/paginas/termos_codicoes.html'){
        window.location='/paginas/index.html';
    }
}