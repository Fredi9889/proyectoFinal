"use strict";
//# sourceURL=nuevaActividad.js;
modificarActividadJS = true;
//Cargar select con un get y localstorage
if(localStorage["tiposActividad"] != null){
    let datos = JSON.parse(localStorage["tiposActividad"]);
    cargarOptions(datos);
}else{
    $.get("../nuevaActividad/getTipo.php", respuestaAltaProfe, 'json');
    function respuestaAltaProfe(datos){
        cargarOptions(datos);
        localStorage["tiposActividad"] = JSON.stringify(datos);
    }
}

function cargarOptions(datos){
    datos.datos.forEach(element => {
        let option = document.createElement("option");
        option.textContent = element.nombre;
        option.value = element.idTipo;
        $("#tipoActividad1")[0].appendChild(option);
    });
}
$("#btnAceptarActividad").click(pulsarBtnAceptarActividad);
//let idLocalS = localStorage.getItem("idAct");
$.get("../sesionEncargado/getActividadPorId.php",{idAct:localStorage.getItem("idAct")} ,fDeRespuesta, 'json');
function fDeRespuesta(datos){
    $("#nombreActividad1")[0].value = datos.nombre;
    $("#tipoActividad1")[0].value = datos.idTipo;
    $("#direccionActividad1")[0].value = datos.lugar;
    $("#fechaActividad1")[0].value = datos.fecha;
    $("#horaActividad1")[0].value = datos.hora;
}

function pulsarBtnAceptarActividad(){
    let nombreActividad = $("#nombreActividad1")[0].value.trim();
    let tipoActividad = $("#tipoActividad1")[0].value;
    let direccionActividad = $("#direccionActividad1")[0].value.trim();
    let fechaActividad = $("#fechaActividad1")[0].value.trim();
    let horaActividad = $("#horaActividad1")[0].value.trim();
    limpiarErrores1();
    let sinErrores = true;
    let mensajeError = "ERROR:";

    let expNombre = /[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,64}/;
    if(expNombre.test(nombreActividad) == false){
        sinErrores = false;
        $("#nombreActividad1")[0].classList.add("error");
        $("#nombreActividad1")[0].focus();
        mensajeError += "\nEl nombre es incorrecto";
    }
    if(tipoActividad == "-1"){
        $("#tipoActividad1")[0].classList.add("error");
        mensajeError += "\nDebe seleccionar un tipo de actividad";
        if(sinErrores){
            $("#tipoActividad1")[0].focus();
            sinErrores = false;
        }
    }
    if(direccionActividad == ""){
        $("#direccionActividad1")[0].classList.add("error");
        mensajeError += "\nDebe rellenar la dirección de la actividad";
        if(sinErrores){
            sinErrores = false;
            $("#direccionActividad1")[0].focus(); 
        }
    }
    if(fechaActividad == ""){
        $("#fechaActividad1")[0].classList.add("error");
        mensajeError += "\nDebe rellenar la fecha de la actividad";
        if(sinErrores){
            sinErrores = false;
            $("#fechaActividad1")[0].focus(); 
        }
    }
    if(horaActividad == ""){
        $("#horaActividad1")[0].classList.add("error");
        mensajeError += "\nDebe rellenar la hora de la actividad";
        if(sinErrores){
            sinErrores = false;
            $("#horaActividad1")[0].focus(); 
        }
    }
    if(!sinErrores){
        alert(mensajeError);
    }else{
        let hora = horaActividad + ":00";
        let oActividad = {
            idAct : localStorage.getItem("idAct"),
            nombreActividad:nombreActividad,
            tipoActividad:tipoActividad,
            direccionActividad:direccionActividad,
            fechaActividad:fechaActividad,
            horaActividad:hora
        };
        $.post("../modificarActividad/postModificarActividad.php", oActividad, respuestaModificarActividad, 'json');
        function respuestaModificarActividad(datos){
            if(datos.error){
                alert(datos.mensaje);
            }else{
                alert(datos.mensaje);
                limpiarErrores1();
            }
        }
    }
}
function limpiarErrores1(){
    $("#nombreActividad1")[0].classList.remove("error");
    $("#tipoActividad1")[0].classList.remove("error");
    $("#direccionActividad1")[0].classList.remove("error");
    $("#fechaActividad1")[0].classList.remove("error");
    $("#horaActividad1")[0].classList.remove("error");
}