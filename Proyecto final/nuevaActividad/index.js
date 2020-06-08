"use strict";
//#sourceURL=nuevaActividad.js;
nuevaActividadJS = true;
//Cargar select con un get y localstorage
if(localStorage["tiposActividad"] != null){
    let datos = JSON.parse(localStorage["tiposActividad"]);
    cargarOptions(datos);
}else{
    $.get("getTipo.php", respuestaAltaProfe, 'json');
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
        $("#tipoActividad")[0].appendChild(option);
    });
}

function cargarSelect(){
    
}


$("#btnAnadirActividad").click(pulsarBtnAnadirActividad);

function pulsarBtnAnadirActividad(){
    let nombreActividad = $("#nombreActividad")[0].value.trim();
    let tipoActividad = $("#tipoActividad")[0].value;
    let direccionActividad = $("#direccionActividad")[0].value.trim();
    let fechaActividad = $("#fechaActividad")[0].value.trim();
    let horaActividad = $("#horaActividad")[0].value.trim();
    limpiarErrores();
    let sinErrores = true;
    let mensajeError = "ERROR:";

    let expNombre = /[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,64}/;
    if(expNombre.test(nombreActividad) == false){
        sinErrores = false;
        $("#nombreActividad")[0].classList.add("error");
        $("#nombreActividad")[0].focus();
        mensajeError += "\nEl nombre es incorrecto";
    }
    if(tipoActividad == "-1"){
        $("#tipoActividad")[0].classList.add("error");
        mensajeError += "\nDebe seleccionar un tipo de actividad";
        if(sinErrores){
            $("#tipoActividad")[0].focus();
            sinErrores = false;
        }
    }
    if(direccionActividad == ""){
        $("#direccionActividad")[0].classList.add("error");
        mensajeError += "\nDebe rellenar la dirección de la actividad";
        if(sinErrores){
            sinErrores = false;
            $("#direccionActividad")[0].focus(); 
        }
    }
    if(fechaActividad == ""){
        $("#fechaActividad")[0].classList.add("error");
        mensajeError += "\nDebe rellenar la fecha de la actividad";
        if(sinErrores){
            sinErrores = false;
            $("#fechaActividad")[0].focus(); 
        }
    }
    if(horaActividad == ""){
        $("#horaActividad")[0].classList.add("error");
        mensajeError += "\nDebe rellenar la hora de la actividad";
        if(sinErrores){
            sinErrores = false;
            $("#horaActividad")[0].focus(); 
        }
    }
    if(!sinErrores){
        alert(mensajeError);
    }else{
        let hora = horaActividad + ":00";
        let oActividad = {
            nombreActividad:nombreActividad,
            tipoActividad:tipoActividad,
            direccionActividad:direccionActividad,
            fechaActividad:fechaActividad,
            horaActividad:hora
        };
        $.post("../nuevaActividad/postActividad.php", oActividad, respuestaNuevaActividad, 'json');
        function respuestaNuevaActividad(datos){
            if(datos.error){
                alert(datos.mensaje);
            }else{
                alert(datos.mensaje);
                limpiarErrores();
                $("#formNuevaActividad")[0].reset();
            }
        }
    }
}
function limpiarErrores(){
    $("#nombreActividad")[0].classList.remove("error");
    $("#tipoActividad")[0].classList.remove("error");
    $("#direccionActividad")[0].classList.remove("error");
    $("#fechaActividad")[0].classList.remove("error");
    $("#horaActividad")[0].classList.remove("error");
}