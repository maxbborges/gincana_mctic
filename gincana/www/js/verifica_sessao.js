if ((window.location.origin).indexOf("localhost")>-1){
    var protocolo = "http://";
    var endereco = "localhost";
    porta2 = '/';
} else {
    var protocolo = "https://";
    endereco = "35.223.219.35";
    var porta1 = ':443/'
    var porta2 = ':444/'
}

if ((window.localStorage.getItem('usuario')!=null&&window.localStorage.getItem('usuario')!='undefined')&&
        (window.localStorage.getItem('pontos')!=null&&window.localStorage.getItem('pontos')!='undefined')&&
        (window.localStorage.getItem('status')!=null&&window.localStorage.getItem('status')!='undefined')&&
        (window.localStorage.getItem('atividades')!=null&&window.localStorage.getItem('atividades')!='undefined')
        ){
            if (window.location['href']==(window.location['origin']+'/')){
                window.location = 'paginas/home.html';
            } else if (((window.location.pathname).indexOf("paginas/index.html")>-1)||((window.location.pathname).indexOf("paginas/termos_condicoes.html")>-1)){
                window.location = 'home.html';
            }
} else {
    if (((window.location.pathname).indexOf("paginas/index.html")==-1)||((window.location.pathname).indexOf("paginas/termos_condicoes")==-1)){
            verificaSessao();
    }
}

function verificaSessao(){
    $.ajax({
        method: "GET",
        url: protocolo+endereco+porta2,
        dataType: 'jsonp',
        success: function(data, textStatus, jqXHR){
            if(data['status']==0){
                if((window.location.pathname).indexOf("paginas")>-1&&((window.location.pathname).indexOf("paginas/index.html")==-1)&&((window.location.pathname).indexOf("paginas/termos_condicoes")==-1)){
                    window.location = 'index.html';
                } else if (((window.location.pathname).indexOf("paginas/index.html")==-1)&&((window.location.pathname).indexOf("paginas/termos_condicoes")==-1)) {
                    window.location = 'paginas/index.html';
                }
            } else {
                localStorage.setItem('usuario',data['usuario']);
                localStorage.setItem('pontos',data['pontos']);
                localStorage.setItem('status',data['status']);
                localStorage.setItem('id_user',data['id_user']);
            //     if (window.location['href']==(window.location['origin']+'/')){
            //         window.location = 'paginas/home.html';
            //     } else {
            //         window.location = 'home.html';
            //     }
            }
        }
    });
}