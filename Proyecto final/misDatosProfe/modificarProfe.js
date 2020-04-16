"use strict";
//# sourceURL=modificarProfe.js;

//Cargar select con un get y localstorage
if(localStorage["cuerposProfe"] != null){
    let datos = JSON.parse(localStorage["cuerposProfe"]);
    cargarOptions(datos);
}else{
    $.get("../registroProfe/getCuerpo.php", respuestaAltaProfe, 'json');
    function respuestaAltaProfe(datos){
        cargarOptions(datos);
        localStorage["cuerposProfe"] = JSON.stringify(datos);
    }
}

let datosProfe = JSON.parse(sessionStorage.getItem("profesor"));
$("#dni1")[0].value = datosProfe.dni;
$("#nombre1")[0].value = datosProfe.nombre;
$("#apellidos1")[0].value = datosProfe.apellidos;
$("#cuerpo1")[0].value = datosProfe.cuerpo;
$("#email1")[0].value = datosProfe.email;
$("#colegio1")[0].value = datosProfe.colegio;
$("#contrasena")[0].value = datosProfe.contrasena;



function cargarOptions(datos){
    datos.datos.forEach(element => {
        let option = document.createElement("option");
        option.textContent = element.nombre;
        option.value = element.idCuerpo;
        $("#cuerpo1")[0].appendChild(option);
    });
}
//Validacion del formulario
$("#modificar").click(pulsarModificar);
function pulsarModificar(){
    let dni = $("#dni1")[0].value.trim();
    let nombre = $("#nombre1")[0].value.trim();
    let apellidos = $("#apellidos1")[0].value.trim();
    let cuerpo = $("#cuerpo1")[0].value;
    let email = $("#email1")[0].value.trim();
    let colegio =  $("#colegio1")[0].value.trim();
    let contrasena1 =  $("#contrasena")[0].value.trim();
    let bValido = true;
    let sError = "ERROR:";
    limpiarErrores();

    let expDni = /^(X(-|\.)?0?\d{7}(-|\.)?[A-Z]|[A-Z](-|\.)?\d{7}(-|\.)? [0-9A-Z]|\d{8}(-|\.)?[A-Z])$/;
    if(expDni.test(dni)==false){
        bValido = false;
        $("#dni1")[0].classList.add("error");
        $("#dni1")[0].focus();
        sError+= "\nEl DNI es erróneo";
    }
    let expNombre = /[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}/;
    if(expNombre.test(nombre)==false){
        if(bValido){
            $("#nombre1")[0].focus();
            bValido = false;
        }
        sError += "\nEl nombre debe ser compredido solo de letras entre 2 y 48 caracteres";
        $("#nombre1")[0].classList.add("error");
    }
    let expApellidos = /[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,64}/;
    if(expApellidos.test(apellidos)==false){
        if(bValido){
            $("#apellidos1")[0].focus();
            bValido = false;
        }
        sError += "\nLos apellidos deben estar compredidos solo de letras entre 2 y 64 caracteres";
        $("#apellidos1")[0].classList.add("error");
    }
    if(cuerpo == "0"){
        if(bValido){
            $("#cuerpo1")[0].focus();
            bValido = false;
        }
        sError += "\nDebe seleccionar un cuerpo de profesor";
        $("#cuerpo1")[0].classList.add("error");
    }
    let expEmail = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
    if(expEmail.test(email)==false){
        if(bValido){
            $("#email1")[0].focus();
            bValido = false;
        }
        sError += "\nEl e-mail no es correcto";
        $("#email1")[0].classList.add("error");
    }
    let expColegio = /[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}/;
    if(expColegio.test(colegio)==false){
        if(bValido){
            $("#colegio1")[0].focus();
            bValido = false;
        }
        sError += "\nEl colegio no es correcto";
        $("#colegio1")[0].classList.add("error");
    }
    if(contrasena == ""){
        if(bValido){
            $("#contrasena")[0].focus();
            bValido = false;
        }
        sError += "\nDebe escribir una contraseña";
        $("#contrasena")[0].classList.add("error");
    }
    if(!bValido){
        alert(sError);
    }else{
        //Si se hace el insert correctamente se limpian los campos y se restablecen los valores
        var oProfe = {
            dni:dni,
            nombre:nombre,
            apellidos:apellidos,
            cuerpo:cuerpo,
            email:email,
            colegio:colegio,
            contrasena:contrasena1
        };
        $.post("../misDatosProfe/modificarProfe.php", oProfe, respuestaModProf, 'json');

        function respuestaModProf(respuesta){
            if(respuesta.error){
                alert(respuesta.mensaje);
            }else{
                alert(respuesta.mensaje);
                limpiarErrores();
                sessionStorage.setItem("profesor", JSON.stringify(oProfe));
            }
        }
    }

}

function limpiarErrores(){
    $("#dni1")[0].classList.remove("error");
    $("#nombre1")[0].classList.remove("error");
    $("#apellidos1")[0].classList.remove("error");
    $("#cuerpo1")[0].classList.remove("error");
    $("#email1")[0].classList.remove("error");
    $("#colegio1")[0].classList.remove("error");
    $("#contrasena")[0].classList.remove("error");
}
/*
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
*/