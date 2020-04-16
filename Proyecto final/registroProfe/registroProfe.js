"use strict";
//# sourceURL=registroProfe.js;
$("#volver").click(volverALogin);


// Carga dinámica del login al darle a Volver
function volverALogin() {

    // Oculto todos los formularios menos este
    $("form:not('#login')").hide("normal");
    $("#volver").hide("normal");
    //$("#body").hide("normal");

    // Verifico si ya he cargado el formulario antes
    if ($('#login').size() == 0) {
        $("<div>").appendTo('section').load("../index.html"
            //function() {
                //$.getScript("registroProfe/registroProfe.js");
            //}
            );

    } else {
        // Lo muestro si está oculto
        $('#login').show("normal");
    }
}
//Cargar select con un get y localstorage
if(localStorage["cuerposProfe"] != null){
    let datos = JSON.parse(localStorage["cuerposProfe"]);
    cargarOptions(datos);
}else{
    $.get("registroProfe/getCuerpo.php", respuestaAltaProfe, 'json');
    function respuestaAltaProfe(datos){
        cargarOptions(datos);
        localStorage["cuerposProfe"] = JSON.stringify(datos);
    }
}

function cargarOptions(datos){
    datos.datos.forEach(element => {
        let option = document.createElement("option");
        option.textContent = element.nombre;
        option.value = element.idCuerpo;
        $("#cuerpo")[0].appendChild(option);
    });
}
//Validacion del formulario

function pulsarAcceder(){
    let dni = $("#dni")[0].value.trim();
    let nombre = $("#nombre")[0].value.trim();
    let apellidos = $("#apellidos")[0].value.trim();
    let cuerpo = $("#cuerpo")[0].value;
    let email = $("#email")[0].value.trim();
    let colegio =  $("#colegio")[0].value.trim();
    let contrasena1 =  $("#contrasena1")[0].value.trim();
    let contrasena2 =  $("#contrasena2")[0].value.trim();
    let bValido = true;
    let sError = "ERROR:";
    limpiarErrores();

    let expDni = /^(X(-|\.)?0?\d{7}(-|\.)?[A-Z]|[A-Z](-|\.)?\d{7}(-|\.)? [0-9A-Z]|\d{8}(-|\.)?[A-Z])$/;
    if(expDni.test(dni)==false){
        bValido = false;
        $("#dni")[0].classList.add("error");
        $("#dni")[0].focus();
        sError+= "\nEl DNI es erróneo";
    }
    let expNombre = /[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}/;
    if(expNombre.test(nombre)==false){
        if(bValido){
            $("#nombre")[0].focus();
            bValido = false;
        }
        sError += "\nEl nombre debe ser compredido solo de letras entre 2 y 48 caracteres";
        $("#nombre")[0].classList.add("error");
    }
    let expApellidos = /[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,64}/;
    if(expApellidos.test(apellidos)==false){
        if(bValido){
            $("#apellidos")[0].focus();
            bValido = false;
        }
        sError += "\nLos apellidos deben estar compredidos solo de letras entre 2 y 64 caracteres";
        $("#apellidos")[0].classList.add("error");
    }
    if(cuerpo == "0"){
        if(bValido){
            $("#cuerpo")[0].focus();
            bValido = false;
        }
        sError += "\nDebe seleccionar un cuerpo de profesor";
        $("#cuerpo")[0].classList.add("error");
    }
    let expEmail = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
    if(expEmail.test(email)==false){
        if(bValido){
            $("#email")[0].focus();
            bValido = false;
        }
        sError += "\nEl e-mail no es correcto";
        $("#email")[0].classList.add("error");
    }
    let expColegio = /[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}/;
    if(expColegio.test(colegio)==false){
        if(bValido){
            $("#colegio")[0].focus();
            bValido = false;
        }
        sError += "\nEl colegio no es correcto";
        $("#colegio")[0].classList.add("error");
    }
    if(contrasena1 != contrasena2 || contrasena1==""||contrasena2==""){
        if(bValido){
            $("#contrasena1")[0].focus();
            bValido = false;
        }
        sError += "\nLas contraseñas deben coincidir";
        $("#contrasena1")[0].classList.add("error");
        $("#contrasena2")[0].classList.add("error");

    }
    if(!bValido){
        alert(sError);
    }else{
        //Si se hace el insert correctamente se limpian los campos y se restablecen los valores
        let oProfe = {
            dni:dni,
            nombre:nombre,
            apellidos:apellidos,
            cuerpo:cuerpo,
            email:email,
            colegio:colegio,
            contrasena:contrasena1
        };
        $.post("registroProfe/registroProfe.php", oProfe, respuestaAltaProfe, 'json');

        function respuestaAltaProfe(respuesta){
            if(respuesta.error){
                alert(respuesta.mensaje);
            }else{
                alert(respuesta.mensaje);
                limpiarCampos();
                limpiarErrores();
                //$("#registroProfe")[0].reset();
                //$("#registroProfe").parent().hide("normal");
            }
        }
    }

}

function limpiarErrores(){
    $("#dni")[0].classList.remove("error");
    $("#nombre")[0].classList.remove("error");
    $("#apellidos")[0].classList.remove("error");
    $("#cuerpo")[0].classList.remove("error");
    $("#email")[0].classList.remove("error");
    $("#colegio")[0].classList.remove("error");
    $("#contrasena1")[0].classList.remove("error");
    $("#contrasena2")[0].classList.remove("error");
}
function limpiarCampos(){
    $("#dni")[0].value = "";
    $("#nombre")[0].value = "";
    $("#apellidos")[0].value = "";
    $("#cuerpo")[0].value = "-1";
    $("#email")[0].value = "";
    $("#colegio")[0].value = "";
    $("#contrasena1")[0].value = "";
    $("#contrasena2")[0].value = "";
}