$("#footer").load("footer.html"); 

document.getElementById("cookie").setAttribute('value', ((document.cookie).split("="))[1]);
document.querySelector("#btn-login").addEventListener("click", function() {
    window.location = 'termos_condicoes.html';
    localStorage.setItem('userInfo', $("#login-form").serialize());
});