var cookieLocal;
if ((window.localStorage.getItem('userInfo'))!=null){
    cookieLocal = (window.localStorage.getItem('userInfo')).match('(^|&) ?cookie=([^;]*)(;|$)');
}
cookieLocal = (cookieLocal ? cookieLocal[2] : null);

var cookieServidor = document.cookie.match('(^|;) ?PHPSESSID=([^;]*)(;|$)');
cookieServidor = (cookieServidor ? cookieServidor[2] : null);

if ((window.localStorage.getItem('usuario')!=null&&window.localStorage.getItem('usuario')!='undefined')&&
        (window.localStorage.getItem('pontos')!=null&&window.localStorage.getItem('pontos')!='undefined')&&
        (window.localStorage.getItem('status')!=null&&window.localStorage.getItem('status')!='undefined')&&
        (window.localStorage.getItem('atividades')!=null&&window.localStorage.getItem('atividades')!='undefined')&&
        (cookieLocal===cookieServidor)&&
        (cookieServidor!=null)){
            if (window.location['href']==(window.location['origin']+'/')){
                window.location = 'paginas/home.html';
                // setTimeout(() => {window.location = 'paginas/home.html';}, 5000);
            }
} else {
    if (window.location['pathname']!='/paginas/index.html'&&
        window.location['pathname']!='/paginas/termos_condicoes.html'){
            verificaSessao();
    }
}

function verificaSessao(){
    $.ajax({
        method: "GET",
        url: "http://localhost/",
        dataType: 'jsonp',
        success: function(data, textStatus, jqXHR){
            if(data['status']==0){
                if (window.location['href']==(window.location['origin']+'/')){
                    window.location = 'paginas/index.html';
                } else {
                    window.location = 'index.html';
                }
            } else {
                localStorage.setItem('usuario',data['usuario']);
                localStorage.setItem('pontos',data['pontos']);
                localStorage.setItem('status',data['status']);
                localStorage.setItem('id',data['id']);
                if (window.location['href']==(window.location['origin']+'/')){
                    window.location = 'paginas/home.html';
                } else {
                    window.location = 'home.html';
                }
            }
        }
    });
}