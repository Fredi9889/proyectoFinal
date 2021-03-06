"use strict";

// Carga dinámica de formularios

//Registro de profesor
$("#registro").click(abrirRegistroProfe);
$("#verActividades").click(verActividades);
function verActividades(){
    // Debería no hacer la llamada si ya se ha cargado previamente. Para eso hay que modificar el codigo
    // para que no borre las cartas, si no que las oculte. Si estan cargadas y ocultas, en vez de 
    // hacer la llamada ajax, sería mas conveniente simplemente mostrarlo de nuevo.
    if($(".x").length > 1){
        for(let i = 0 ; i <= $(".x").length-1 ; i++){
            [].slice.call($(".x"))[i].remove();
        }
    }
    $.ajax({
        url: "sesionProfesor/getActividades.php",
        type: "get",
        async: true,
        data: null,
        dataType: "json",
        success: respuestaVA
    });
    //Cargar options
if($("#selecTipoEvento > *").length < 2){
    if(localStorage["tiposActividad"] != null){
        let datos = JSON.parse(localStorage["tiposActividad"]);
        cargarOptionssss(datos);
    }else{
        $.get("nuevaActividad/getTipo.php", function(datos){
            cargarOptionssss(datos);
            localStorage["tiposActividad"] = JSON.stringify(datos);
        }, 'json');
    }
}

}
function respuestaVA(datos){
    $("form").hide("normal");
    let contenedor = $("section")[0];
    let otroDivMas = document.createElement("div");
    contenedor.appendChild(otroDivMas);
    otroDivMas.classList.add("x");
    otroDivMas.appendChild($("#formFiltro1")[0])
    $("#formFiltro1").show("normal")

    let div = document.createElement("div");
    div.classList.add("card-columns");
            datos.datos.forEach(element => {
                let div1 = document.createElement("div");
                div1.classList.add("col");
                div1.classList.add("mb-4");

                let div2 = document.createElement("div");
                div2.classList.add("card");
                let imagen = document.createElement("img");
                imagen.classList.add("img-fluid");
                switch(element.idTipo){
                    case "1":
                        imagen.setAttribute("src", "img/Conferencia.jpg");
                        break;
                    case "2":
                        imagen.setAttribute("src", "img/Seminario.jpg");
                        break;
                    case "3":
                        imagen.setAttribute("src", "img/mesaTrabajo.jpg");
                        break;
                    case "4":
                        imagen.setAttribute("src", "img/exposicion.jpg");
                        break;
                }
                //Ajustar el tamaño de imagen
                div2.appendChild(imagen);

                let div3 = document.createElement("div");
                div3.classList.add("card-body");

                let h5 = document.createElement("h5");
                h5.textContent = element.nombre;
                div3.appendChild(h5);

                let p = document.createElement("p");
                switch(element.idTipo){
                    case "1":
                        p.textContent = "Conferencia";
                        break;
                    case "2":
                        p.textContent = "Seminario";
                        break;
                    case "3":
                        p.textContent = "Mesa de trabajo";
                        break;
                    case "4":
                        p.textContent = "Exposición";
                        break;
                }
                div3.appendChild(p);

                let ul = document.createElement("ul");
                ul.classList.add("list-group");
                ul.classList.add("list-group-flush");


                let li1 = document.createElement("li");
                let li2 = document.createElement("li");
                let li3 = document.createElement("li");
                li1.classList.add("list-group-item");
                li2.classList.add("list-group-item");
                li3.classList.add("list-group-item");
                li1.textContent = "Dirección: " + element.lugar;
                li2.textContent = "Fecha: " + element.fecha;
                li3.textContent = "Hora: " + element.hora.substring(0,5);

                
                ul.appendChild(li1);
                ul.appendChild(li2);
                ul.appendChild(li3);
                div3.appendChild(ul);
                div2.appendChild(div3);
                div1.appendChild(div2);
                div.appendChild(div1);
                contenedor.appendChild(div);
            });
}

function abrirRegistroProfe() {
    // Oculto todos los formularios menos este
    $("form:not('#registroProfe')").hide("normal");

    // Verifico si ya he cargado el formulario antes
    if ($('#registroProfe').size() == 0) {
        $("<div>").appendTo('section').load("registroProfe/registroProfe.html",
            function() {
                $.getScript("registroProfe/registroProfe.js");
            });
            

    } else {
        // Lo muestro si está oculto
        $('#registroProfe').show("normal");
        //Muestro el botón de volver
        $('#volver').show("normal");
        //$("#volver")[0].style.display="block";
        
    }
    //$("#registroProfe").reset();
    //limpiarCampos();
    //limpiarErrores();
}

window.onload=function(){
    $("#login")[0].reset();
}

//Pulsar acceder
//Comprobar que exista el usurio insertado
$("#acceso").click(pulsarAcceder);
function pulsarAcceder(){
    let contrasena =$("#password1")[0].value.trim();
    let usuario =$("#nombre1")[0].value.trim();
    let bValido = true;
    let sError = "";
    limpiarErrores();
    let expUsuario = /[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}/;
    if(expUsuario.test(usuario)==false){
        if(bValido){
            $("#nombre1")[0].focus();
            bValido = false;
        }
        sError += "\nEl nombre de usurio debe estar compredido solo de letras entre 2 y 48 caracteres";
        $("#nombre1")[0].classList.add("error");
    }
    if(contrasena == ""){
        sError += "\nDebe rellenar la contraseña";
        $("#password1")[0].classList.add("error");
        bValido = false;
    }
    if(!bValido){
        alert(sError);
    }else{
        //Se hace la llamada al servidor para comprobar que exista ese usuario y la contraseña
        //$.get("php/login.php", {usuario:usuario,contrasena:contrasena}, respuestaLogin, "json");
        $.ajax({
            url: "php/login.php",
            type: "get",
            async: true,
            data: {usuario:usuario,contrasena:contrasena},
            dataType: "json",
            success: respuestaLogin
        });

        function respuestaLogin(datos){
            if(datos.encargado){
                //Cargar la sesión de encargado y su html
                sessionStorage.clear();
                sessionStorage.setItem('encargado', JSON.stringify(datos.datos));
                window.open("sesionEncargado/index.html", "_self");
            }else
            if(datos.profesor){
                //Cargar la sesión de profesor y su html
                sessionStorage.clear();
                sessionStorage.setItem('profesor', JSON.stringify(datos.datos));
                window.open("sesionProfesor/index.html", "_self");
            }else{
                alert(datos.mensaje)
            }
            
        }
    }
    
}
function limpiarErrores(){
    if($("#nombre1")[0].classList.contains("error")){
        $("#nombre1")[0].classList.remove("error");
    }
    if($("#password1")[0].classList.contains("error")){
        $("#password1")[0].classList.remove("error");
    } 
}
function limpiarCampos(){
    $("#nombre1")[0].value = "";
    $("#password1")[0].value= "";
}
function fPulsarVolver(){
    let cartas = document.querySelector('.card-columns');
    cartas.remove();
    $("#formFiltro1").hide();
    $("#login").show("normal");
}
$("#btnFiltrar2").click(fBtnFiltrar2Pulsado);

function fBtnFiltrar2Pulsado(){
    let cartas = document.querySelector('.card-columns');
    if(cartas != null){
        cartas.remove();
    }
    let tipoAct = $("#selecTipoEvento")[0].value;
    let desde = $("#desde1")[0].value;
    let hasta = $("#hasta1")[0].value;
    if(desde == undefined){
        desde = 0;
    }
    if(hasta == undefined){
        hasta = 0;
    }

    $.ajax({
        url: "php/actividadesFiltradas.php",
        method: "GET",
        async: false,
        data: {tipoAct:tipoAct, desde:desde, hasta:hasta},
        success: respuestaVA,
        dataType:'json'
    })
}

function cargarOptionssss(datos){
    let select = $("#selecTipoEvento")[0];
    datos.datos.forEach(o => {
        let option = document.createElement("option");
        option.value = o.idTipo;
        option.textContent = o.nombre;
        select.appendChild(option)
    })
}