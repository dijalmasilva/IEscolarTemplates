function moveTop(idcampo) {
    location.href = "#" + idcampo;
}

function hideUpload() {    
    if(document.getElementById("documentosPai") === null) {
        document.getElementById("divFormUpload").style.display = "none";        
    }
}

function showUpload() {    
    if (document.getElementById("documentosPai") !== null) {
        document.getElementById("divFormUpload").style.display = "block";
    }
}

//function maskLogin(campo) {	
//    jQuery(function($) {
//	var id = campo.id;
//        var sizeLeft = campo.maxLength - campo.value.length;
//
//	if(id === "secretario" || id === "professor") {
//	   for (var i = 0; sizeLeft > i; i++) {
//              $(campo).val("0" + campo.value);
//           }	   
//	}
//	else if(id === "aluno" || id === "responsavel") {
//	   //todo
//	}
//	else {
//	   //todo
//	}
//    });
//}

function validaIdadeInicialFinal() {
    var inicial = document.getElementById("inicial").value;
    var final = document.getElementById("final").value;

    if (inicial > final) {
        document.getElementById("messageError").style.display = "block";
        return false;
    }
    return true;
}

//números , e .
function numeros() {
    if (event.keyCode === 44 || event.keyCode === 46) {
        return true;
    }
    if (event.keyCode < 48 || event.keyCode > 57) {
        return false;
    }
}

//somente números
function somenteNumeros() {
    if (event.keyCode < 48 || event.keyCode > 57) {
        return false;
    }
}

function validarPeriodoData(formulario) {
    var dataInicio = document.getElementById(formulario.name + ":dataInicial_input").value;
    var dataFim = document.getElementById(formulario.name + ":dataFinal_input").value;

    var diaInicio = (dataInicio.split('/')[0]);
    var mesInicio = (dataInicio.split('/')[1]);
    var anoInicio = (dataInicio.split('/')[2]);

    var diaFim = (dataFim.split('/')[0]);
    var mesFim = (dataFim.split('/')[1]);
    var anoFim = (dataFim.split('/')[2]);

    var dataInicio = anoInicio + '-' + mesInicio + '-' + diaInicio;
    var dataFim = anoFim + '-' + mesFim + '-' + diaFim;

    if (Date.parse(dataInicio) > Date.parse(dataFim)) {
        document.getElementById("messageError").style.display = "block";
        return false;
    } else {
        return true;
    }
}

function marcarOpcoesSim(lenght) {
    var radio;
    for (var i = 1; i < lenght; i++) {
        radio = document.getElementById("dataTableParecer:" + i + ":radioValue:0");
        if (radio !== null) {
            radio.checked = true;
        }
    }

    var escreveAte = document.getElementById("dataTableParecer:72:escreveAte");
    if (escreveAte !== null) {
        escreveAte.value = "0";
    }
}

function phoneMaskHandler(campo, event) {
    var target, phone, element;
    target = (event.currentTarget) ? event.currentTarget : event.srcElement;
    phone = target.value.replace(/\D/g, '');
    element = $(target);
    element.unmask();

    if (phone.length !== 0) {
        if (phone.length > 10) {
            element.mask("(99)99999-9999");
            messageErrorHide(campo);
        } else {
            target.value = phone;
            element.mask("(99)99999-9999");
            messageErrorShow(campo, "CELULAR DEVE TER 11 DÍGITOS! DDD + NÚMERO");
            campo.focus();
        }
    }
    else {
        element.mask("(99)99999-9999");
        messageErrorHide(campo);
    }
}

function focusBlurCampoCelular() {
    document.getElementById('CELULAR').focus();
    document.getElementById('CELULAR').blur();
}

function focusBlurCampoCelularComForm() {
    document.getElementById('formCadastroSecretario:CELULAR').focus();
    document.getElementById('formCadastroSecretario:CELULAR').blur();
}

function focusBlurCampoCelularDoResponsavel() {
    document.getElementById('CELULAR_DO_RESPONSAVEL').focus();
    document.getElementById('CELULAR_DO_RESPONSAVEL').blur();
}

function focusBlurCampoCelularComForm() {
    document.getElementById('formCadastroSecretario:CELULAR').focus();
    document.getElementById('formCadastroSecretario:CELULAR').blur();
}

function setNomeBotaoAvancar() {
    document.getElementById("wizardAluno_next").innerHTML = "<span class='ui-button-text ui-c'>Continuar Atualização do Aluno</span>";
}

function validarCPF(campo) {
    var cpf = campo.value;

    cpf = cpf.replace(".", "");
    cpf = cpf.replace(".", "");
    cpf = cpf.replace("-", "");

    if (cpf === "___________") {
        messageErrorHide(campo);
        return false;
    }

    if (cpf.length !== 11 || cpf === "00000000000" || cpf === "11111111111" ||
            cpf === "22222222222" || cpf === "33333333333" || cpf === "44444444444" ||
            cpf === "55555555555" || cpf === "66666666666" || cpf === "77777777777" ||
            cpf === "88888888888" || cpf === "99999999999") {

        campo.focus();
        campo.value = "";
        messageErrorShow(campo, "CPF INVÁLIDO!");
        return false;
    }
    else {
        messageErrorHide(campo);
    }

    soma = 0;
    for (i = 0; i < 9; i++)
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11)
        resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) {
        campo.focus();
        campo.value = "";
        messageErrorShow(campo, "CPF INVÁLIDO!");
        return false;
    }
    else {
        messageErrorHide(campo);
    }
    soma = 0;
    for (i = 0; i < 10; i ++)
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11)
        resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) {
        campo.focus();
        campo.value = "";
        messageErrorShow(campo, "CPF INVÁLIDO!");
        return false;
    }
    else {
        messageErrorHide(campo);
    }
    messageErrorHide(campo);
    return true;
}

function validarEmail(campo) {
    var email = campo.value;
    if (email !== "") {
        if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
            campo.focus();
            campo.value = "";
            messageErrorShow(campo, "EMAIL INVÁLIDO");
        }
        else {
            messageErrorHide(campo);
        }
    }
}

function verificarData(campo) {
    var data = campo.value;

    var objDate = new Date();
    objDate.setYear(data.split("/")[2]);
    objDate.setMonth(data.split("/")[1] - 1);//- 1 pq em js é de 0 a 11 os meses
    objDate.setDate(data.split("/")[0]);

    if (objDate.getTime() > new Date().getTime()) {
        campo.focus();
        campo.value = "";
        messageErrorShow(campo, "DATA INVÁLIDA");
    }
    else {
        messageErrorHide(campo);
    }
}

function messageErrorShow(campo, msg) {
    campo.focus();
    campo.style.border = "1px solid red";
    document.getElementById("messageError").innerHTML = msg;
    document.getElementById("messageError").style.display = "block";
}

function messageErrorHide(campo) {
    campo.style.border = "1px solid #cccccc";
    document.getElementById("messageError").style.display = "none";
}

function verificaAnoLetivo(campo) {
    var anoDigitado = campo.value;

    if (anoDigitado === null) {
        return false;
    }

    var anoAtual = new Date().getYear() + 1900;

    if (anoDigitado > anoAtual) {
        campo.value = "";
        messageErrorShow(campo, "ANO LETIVO NÃO PODE SER MAIOR QUE O ANO ATUAL!");
    }
    else {
        messageErrorHide(campo);
    }
}

function maskLogin(campo) {
    jQuery(function($) {
//        var id = campo.id;
        var sizeLeft = (campo.maxLength - 7) - campo.value.length;

        if (isNumber(campo.value)) {
            for (var i = 0; sizeLeft > i; i++) {
                $(campo).val("0" + campo.value);
            }
        }

//        if (id === "secretario" || id === "professor") {
//            for (var i = 0; sizeLeft > i; i++) {
//                $(campo).val("0" + campo.value);
//            }
//        }
//        else if (id === "aluno" || id === "responsavel") {
//            //todo
//        }
//        else {
//            //todo
//        }
    });
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
