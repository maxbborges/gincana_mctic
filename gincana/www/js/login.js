$("#footer").load("footer.html");

$(document).ready(function () {
  $('#btn-login').click(function functionName() {
    if ($("#nome").val()==''||$("#email").val()==''){
      alert("Preencha os campos obrigatorios");
    } else {
      localStorage.setItem('userInfo', $("#login-form").serialize());
      localStorage.setItem('usuario', $("#nome").val());
      window.location = 'termos_condicoes.html';
    }
  });
    //MONTANDO COMBOS DATA NASCIMENTO
    for (let i = 1; i <= 31; i++) {
        $("#inputDia").append("<option value='" + i + "'>" + i + "</option>");
    }
    for (let i = 1; i <= 12; i++) {
        $("#inputMes").append("<option value='" + i + "'>" + i + "</option>");
    }
    for (let i = 1920; i <= 2020; i++) {
        $("#inputAno").append("<option value='" + i + "'>" + i + "</option>");
    }

    $("#inputWhatsapp").mask("(99) 9999-9999?9").focusout(function (event) {
        var target, phone, element;
        target = (event.currentTarget) ? event.currentTarget : event.srcElement;
        phone = target.value.replace(/\D/g, '');
        element = $(target);
        element.unmask();
        if (phone.length > 10) {
            element.mask("(99) 99999-999?9");
        } else {
            element.mask("(99) 9999-9999?9");
        }
    });
});
