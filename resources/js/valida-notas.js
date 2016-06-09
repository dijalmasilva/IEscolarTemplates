function maskNota(campo) {
    jQuery(function($) {
        var nota = campo.value;

        if (nota === "10" || nota === "100" || nota === "1000" || nota === "10,0" || nota === "10.0") {
            $(campo).val("10.0");
        }
        else if (nota.length === 1) {
            $(campo).val(nota + ".0");
        }
        else if (nota.length > 1) {
            if (nota.length === 3 && nota[1] === "0" && nota[2] === "0") {
                $(campo).val(nota[0] + ".0");
            }
            else if (nota.length === 4 && nota[1] === "0" && nota[2] === "0" && nota[3] === "0") {
                $(campo).val(nota[0] + ".0");
            }
            else {
                $(campo).mask("?9.?99");
                $(campo).unmask();
            }
        }
        if ($(campo).val() >= 7 ? $(campo).css("color", "blue") : $(campo).css("color", "red"));        
    });
}

function setMedia(campo, i) {
    var element = campo.form.id + ":dataTableMatriculas:" + i;

    var nota1 = document.getElementById(element + ":nota1").value;
    var nota2 = document.getElementById(element + ":nota2").value;
    var nota3 = document.getElementById(element + ":nota3").value;

    var soma = 0;
    var divisao = 0;
    var media = 0;

    if (nota1.length !== 0) {
        if (nota1 >= 7) {
            resetRecuperacao(element, "1", true, "");
            soma += parseFloat(nota1);
        }
        else {
            var recup1 = document.getElementById(element + ":recuperacao1").value;

            if (recup1.length !== 0) {
                resetRecuperacao(element, "1", false, recup1);

                if (nota1 > recup1 && recup1 !== "10.0") {
                    soma += parseFloat(nota1);
                }
                else {
                    soma += parseFloat(recup1);
                }
            }
            else {
                resetRecuperacao(element, "1", false, "0.0");
                soma += parseFloat(nota1);
            }
        }
        divisao++;
    }
    else {
        resetRecuperacao(element, "1", true, recup1);
    }

    if (nota2.length !== 0) {
        if (nota2 >= 7) {
            resetRecuperacao(element, "2", true, "");
            soma += parseFloat(nota2);
        }
        else {
            var recup2 = document.getElementById(element + ":recuperacao2").value;

            if (recup2.length !== 0) {
                resetRecuperacao(element, "2", false, recup2);
                if (nota2 > recup2 && recup2 !== "10.0") {
                    soma += parseFloat(nota2);
                }
                else {
                    soma += parseFloat(recup2);
                }
            }
            else {
                resetRecuperacao(element, "2", false, "0.0");
                soma += parseFloat(nota2);
            }
        }
        divisao++;
    }
    else {
        resetRecuperacao(element, "2", true, recup2);
    }

    if (nota3.length !== 0) {
        if (nota3 >= 7) {
            resetRecuperacao(element, "3", true, "");
            soma += parseFloat(nota3);
        }
        else {
            var recup3 = document.getElementById(element + ":recuperacao3").value;

            if (recup3.length) {
                resetRecuperacao(element, "3", false, recup3);

                if (nota3 > recup3 && recup3 !== "10.0") {
                    soma += parseFloat(nota3);
                }
                else {
                    soma += parseFloat(recup3);
                }
            }
            else {
                resetRecuperacao(element, "3", false, "0.0");
                soma += parseFloat(nota3);
            }
        }
        divisao++;
    }
    else {
        resetRecuperacao(element, "3", true, recup3);
    }

    media = soma / divisao;
    document.getElementById(element + ":mediaNotas").value = media;

    focusBlurCampo(campo, i, "mediaNotas");

    var mediaArredondada = arredondaNota(document.getElementById(element + ":mediaNotas").value);
    document.getElementById(element + ":mediaNotas").value = mediaArredondada;
   
        if (mediaArredondada >= 7) {
            document.getElementById(element + ":situacao").value = "APROVADO";
        }else {
            if (mediaArredondada !== "NaN.0") {
                document.getElementById(element + ":situacao").value = "RECUPERAÇÃO";
            }
            else {
                document.getElementById(element + ":situacao").value = "";
            }       
        }
    
//    else {
//        if (mediaArredondada !== "NaN.0") {
//            document.getElementById(element + ":situacao").value = "RECUPERAÇÃO";
//        }
//        else {
//            document.getElementById(element + ":situacao").value = "";
//        }
//    }

    if (document.getElementById(element + ":mediaNotas").value.length === 0) {
        document.getElementById(element + ":situacao").value = "";
    }

    focusBlurCampo(campo, i, "mediaNotas");
    focusBlurCampo(campo, i, "situacao");
}

function resetRecuperacao(element, numero, view, texto) {
    if (texto !== undefined) {
        document.getElementById(element + ":recuperacao" + numero).value = texto;
    }
    else {
        document.getElementById(element + ":recuperacao" + numero).value = "";
    }
    document.getElementById(element + ":recuperacao" + numero).disabled = view;
}

function setCorSituacao(campo) {
    jQuery(function($) {
        var situacao = campo.value;

        if (situacao === "APROVADO") {
            $(campo).css("color", "green");
        }
        else{
            $(campo).css("color", "red");
        }
    });
}

function setMediaFinal(i) {
//
//    var media = document.getElementById("formRegistrarNotas:dataTableMatriculas:" + i + ":mediaNotas").value;
//    var recuperacao = document.getElementById("formRegistrarNotas:dataTableMatriculas:" + i + ":recuperacao").value;
//
//    if (recuperacao.length !== 0) {
//
//        var mediaFinal = (parseFloat(media * 6) + parseFloat(recuperacao * 4)) / 10;
//        document.getElementById("formRegistrarNotas:dataTableMatriculas:" + i + ":mediaFinalNotas").value = mediaFinal;
//
//        focusBlurMediaFinalNotas(i);
//
//        var mediaFinalArredondada = arredondaNota(document.getElementById("formRegistrarNotas:dataTableMatriculas:" + i + ":mediaFinalNotas").value);
//        document.getElementById("formRegistrarNotas:dataTableMatriculas:" + i + ":mediaFinalNotas").value = mediaFinalArredondada;
//
//        if (recuperacao >= 2) {
//            if (mediaFinalArredondada >= 5) {
//                document.getElementById("formRegistrarNotas:dataTableMatriculas:" + i + ":situacao").value = "APROVADO";
//            }
//            else {
//                document.getElementById("formRegistrarNotas:dataTableMatriculas:" + i + ":situacao").value = "REPROVADO";
//            }
//        }
//        else {
//            document.getElementById("formRegistrarNotas:dataTableMatriculas:" + i + ":mediaFinalNotas").value = mediaFinalArredondada;
//            document.getElementById("formRegistrarNotas:dataTableMatriculas:" + i + ":situacao").value = "REPROVADO";
//        }
//    }
//    else {
//        document.getElementById("formRegistrarNotas:dataTableMatriculas:" + i + ":mediaFinalNotas").value = arredondaNota(media);
//    }
//    focusBlurMediaFinalNotas(i);
}

function arredondaNota(nota) {
    if (nota === "10.0") {
        return nota;
    }

    var indice0 = parseInt(nota[0]);
    var indice1 = nota[1];
    var indice2 = parseInt(nota[2]);
    var indice3 = parseInt(nota[3]);

    if (nota.length >= 4) {
        if (indice3 > 5) {
            if (indice2 === 9) {
                indice2 = 0;
                indice0++;
            }
            else {
                indice2++;
            }
        }
        else if(indice3 < 5) {
            indice3 = 0;            
        }
        else {
            return indice0.toString() + indice1.toString() + indice2.toString() + indice3.toString();
        }
        nota = indice0.toString() + indice1.toString() + indice2.toString();
    }
    return nota;
}

function atualizaNotas(tamanho) {
    for (var i = 0; i < tamanho; i++) {
        focusBlur("formRegistrarNotas:dataTableMatriculas:", i, ":nota1");
        focusBlur("formRegistrarNotas:dataTableMatriculas:", i, ":nota2");
        focusBlur("formRegistrarNotas:dataTableMatriculas:", i, ":nota3");

        focusBlur("formRegistrarNotas:dataTableMatriculas:", i, ":recuperacao1");
        focusBlur("formRegistrarNotas:dataTableMatriculas:", i, ":recuperacao2");
        focusBlur("formRegistrarNotas:dataTableMatriculas:", i, ":recuperacao3");
    }
}

function focusBlur(form, i, campo) {
    document.getElementById(form + i + campo).focus();
    document.getElementById(form + i + campo).blur();
}

function focusBlurCampo(formid, i, campoid) {
    var element = formid.form.id + ":dataTableMatriculas:" + i + ":" + campoid;

    document.getElementById(element).focus();
    document.getElementById(element).blur();
}

function blockEnter() {
    $(document).ready(function() {
        $('#formRegistrarNotas').keypress(function(e) {
            return e.which !== 13;
        });
    });
}

function arredondaMediaNotasAtual(tamanho) {
    for(var i = 0; i < tamanho; i++) {
        var media = document.getElementById("formularioHistorico:historicoNotasAtual:"+ i +":idOutputMediaFinalNotasAtual");
        media.innerHTML = arredondaNota(media.innerHTML);        
    }
}
