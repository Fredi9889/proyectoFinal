
$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
    $(".share").hide();

});
if(sessionStorage.getItem("encargado") == null){
    window.open("../index.html", "_self");
}
var nuevaActividadJS = false;
var modificarActividadJS = false;
$('a[href="../index.html"]').click(function(){
    sessionStorage.clear();
});

$("#actividades").click(actividades);
$("#misDatos").click(misDatos);
function actividades(){
    //Ocultar lo que haya por ahí
    $("form").hide();
    $("table").hide();
    $("h4").remove();
    //Cagar las actividades
    $.ajax({
        url: "../sesionProfesor/getActividades.php",
        type: "get",
        async: true,
        data: null,
        dataType: "json",
        success: respuestaVerActividades
    });
}

/*
<div class="col mb-4">
    <div class="card">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Dirección: Calle Florentino, nº3</li>
                <li class="list-group-item">Fecha: 03/04/2020</li>
                <li class="list-group-item">Hora: 12:00</li>
            </ul>
            <a href="#" id="x"class="btn btn-primary">Go somewhere</a>                            
        </div>
    </div>
</div>*/
$(".share").click(anadir);
function anadir(){
    //Ver mis datos
    //Ocultar lo que haya por ahí

    let cartas = document.querySelectorAll('.card-columns > *');
    if(cartas.length > 0){
        cartas.forEach(hijo=>{
            hijo.remove();
        });
    }
    //Cargar el formulario
    // Oculto todos los formularios menos este
    $("form:not('#formNuevaActividad')").hide();
    $(".share").hide();

    // Verifico si ya he cargado el formulario antes
    if ($('#formNuevaActividad').length == 0) {
        $("<div>").appendTo('#content').load("../nuevaActividad/index.html",
            function() {
                if(!nuevaActividadJS){
                    $.getScript("../nuevaActividad/index.js");
                }
            });
    }else{
        // Lo muestro si está oculto
        $('#formNuevaActividad').show("normal");
        $('#formNuevaActividad')[0].reset();
        limpiarErrores();
        //$.getScript("../nuevaActividad/index.js");
    }
}
    

function respuestaVerActividades(datos){
        //Si esta activado hay que borrar u ocultar las cartas
        /*if($("#content")[0].querySelectorAll(".parrafo").length != 0){
            $("#content")[0].querySelectorAll(".parrafo")[0].remove();
        }*/
        let cartas = document.querySelectorAll('.card-columns > *');
        if(cartas.length > 0){
            cartas.forEach(hijo=>{
                hijo.remove();
            });
            $(".share").hide();
       }else{
        $(".share").show("normal");
            /*let divBotonAnadir = document.createElement("div");
            divBotonAnadir.classList.add("share");
            let i = document.createElement("i");
            i.classList.add("fa");
            i.classList.add("fa-plus");
            divBotonAnadir.appendChild(i);
            $("#content")[0].appendChild(divBotonAnadir);
            */
            let contenedor = $(".card-columns")[0];
            datos.datos.forEach(element => {
                let div1 = document.createElement("div");
                div1.classList.add("col");
                div1.classList.add("mb-4");

                let div2 = document.createElement("div");
                div2.classList.add("card");
                div2.classList.add("h-100");
                let imagen = document.createElement("img");
                imagen.classList.add("img-fluid");
                switch(element.idTipo){
                    case "1":
                        imagen.setAttribute("src", "../img/Conferencia.jpg");
                        break;
                    case "2":
                        imagen.setAttribute("src", "../img/Seminario.jpg");
                        break;
                    case "3":
                        imagen.setAttribute("src", "../img/mesaTrabajo.jpg");
                        break;
                    case "4":
                        imagen.setAttribute("src", "../img/exposicion.jpg");
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

                let a = document.createElement("a");
                a.classList.add("btn");
                a.classList.add("btn-primary");
                a.textContent = "Modificar actividad";
                a.classList.add("inscribirse");
                a.dataset.idActividad = element.idAct;
                let a2 = document.createElement("a");
                a2.classList.add("btn");
                a2.classList.add("btn-danger");
                a2.classList.add("delete");
                a2.textContent = "Eliminar actividad";
                a2.dataset.idActividad = element.idAct;
                ul.appendChild(li1);
                ul.appendChild(li2);
                ul.appendChild(li3);
                div3.appendChild(ul);
                div2.appendChild(div3);
                div1.appendChild(div2);
                div3.appendChild(a);
                div3.appendChild(a2);
                contenedor.appendChild(div1);
            });
            let btnInscribirse = document.querySelectorAll('.inscribirse');
            btnInscribirse.forEach(boton=>{
                boton.addEventListener("click", fModificar);
            });
            let btnDelete = document.querySelectorAll('.delete');
            btnDelete.forEach(boton=>{
                boton.addEventListener("click", fDelete);
            });
        
       }
function fDelete(oEvento){
    //Requiere confirmación
    let oE = oEvento || window.event;
    //Id de actividad
    let idAct = oE.target.dataset.idActividad;
    let confirmacion = window.confirm("Debe tener cuidado ya que puede dejar a algunos usuarios sin su actividad.\n ¿Está seguro de querer eliminar la activiadd con id: "+idAct+" ?");
    if(confirmacion){
        $.post("delete.php", {idAct:idAct}, function(datosRespuesta){
            if(datosRespuesta.error == 0){
                alert(datosRespuesta.mensaje);
                oE.target.parentNode.parentNode.parentNode.remove();
            }
            
        },'json');
    }
}
function fModificar(oEvento){
    let oE = oEvento || window.event;
    //Id de actividad
    let idAct = oE.target.dataset.idActividad;
    $.ajax({
        url: "getActividadPorId.php",
        method: "GET",
        async: false,
        success: function(datos){
            //guardar el id en el localStorage
            localStorage.setItem('idAct', datos.idAct);
            let cartas = document.querySelectorAll('.card-columns > *');
            if(cartas.length > 0){
                cartas.forEach(hijo=>{
                    hijo.remove();
                });
                $(".share").hide();
            }
            //Cargar el formulario
            // Oculto todos los formularios menos este
            $("form:not('#formModificarActividad')").hide();
            // Verifico si ya he cargado el formulario antes
            if ($('#formModificarActividad').length == 0) {
                $("<div>").appendTo('#content').load("../modificarActividad/index.html",
                    function() {
                        if(!modificarActividadJS){
                            $.getScript("../modificarActividad/index.js");

                        }
                    });
                    //$("#formModificarActividad").reset();
            }else{
                // Lo muestro si está oculto
                $('#formModificarActividad').show("normal");
                //$.getScript("../modificarActividad/index.js");
                //$("#formModificarActividad").reset();
                $.ajax({
                    url: "getActividadPorId.php",
                    method: "GET",
                    async: false,
                    success:fDeRespuesta,
                    data:{idAct:idAct},
                    dataType:'json'
                });
                function fDeRespuesta(datos){
                    $("#nombreActividad1")[0].value = datos.nombre;
                    $("#tipoActividad1")[0].value = datos.idTipo;
                    $("#direccionActividad1")[0].value = datos.lugar;
                    $("#fechaActividad1")[0].value = datos.fecha;
                    $("#horaActividad1")[0].value = datos.hora;
                    limpiarErrores1();
                }
            }
        },
        data: { idAct: idAct},
        dataType : 'json'
    });
}



/*function respuestaInsertInscripcion(datos){
    alert(datos.mensaje);
}*/
    
    /*$( ".inscribirse" ).hover(
        function() {
            console.log($(this));
          $(this).addClass("shadow");
        }, function() {
          $( this ).removeClass("shadow");
        }
      );*/
}

function misDatos(){
    //Ver los datos del encargado
    //Ocultar lo que haya por ahí
    let cartas = document.querySelectorAll('.card-columns > *');
    if(cartas.length > 0){
        cartas.forEach(hijo=>{
            hijo.remove();
        });
    }
    $("form").hide();
    $(".share").hide();
    $("table").hide();
    $("h4").remove();
    //////////////
    //Creo la tabla con la información del encargado en cuestión si no se ha cargado ya
    if($("#tablaDatosEmpleado").length == 0){
        let datosEncargado = JSON.parse(sessionStorage.getItem("encargado"));
    let tabla = document.createElement("table");
    tabla.classList.add("table");
    tabla.id = "tablaDatosEmpleado";

    let cabeceraT = document.createElement("thead");
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    th.textContent = "ID";
    tr.appendChild(th);
    let th1 = document.createElement("th");
    th1.textContent = "NOMBRE";
    tr.appendChild(th1);
    let th2 = document.createElement("th");
    th2.textContent = "CONTRASEÑA";
    tr.appendChild(th2);
    cabeceraT.appendChild(tr);
    tabla.appendChild(cabeceraT);

    let cuerpoT = document.createElement("tbody");
    let tr1 = document.createElement("tr");
    let td = document.createElement("td");
    td.textContent = datosEncargado.idEncargado;
    tr1.appendChild(td);
    let td1 = document.createElement("td");
    td1.textContent = datosEncargado.nombre;
    tr1.appendChild(td1);
    let td2 = document.createElement("td");
    td2.textContent = datosEncargado.contrasena;
    tr1.appendChild(td2);
    cuerpoT.appendChild(tr1);
    tabla.appendChild(cuerpoT);
    $("#content")[0].appendChild(tabla);
    }else{
        $("#tablaDatosEmpleado").show("normal");
    }
    

    // Verifico si ya he cargado el formulario antes
    /*if ($('#formMisDatos').length == 0) {
        $("<div>").appendTo('#content').load("../misDatosProfe/index.html",
            function() {
                $.getScript("../misDatosProfe/modificarProfe.js");
            });
    }else{
        // Lo muestro si está oculto
        $('#formMisDatos').show("normal");
    }*/
}
////
// Listados:
////
$("#listPxA, #listAxT, #listAxF").click(listPxAPulsado)

function listPxAPulsado(){
    //Ocultar lo que haya por ahí
    let cartas = document.querySelectorAll('.card-columns > *');
    if(cartas.length > 0){
        cartas.forEach(hijo=>{
            hijo.remove();
        });
    }
    $("h4").remove();
    $("form:not(#formFiltro)").hide();
    $(".share").hide();
    $("table:not(#tablaListadoActividades)").hide();
    if($("#tablaListadoActividades tbody > *").length != 0){
        [].slice.call($("#tablaListadoActividades tbody > *")).forEach((el) => el.remove());
    }
    // Reset de variables del formulario de filtro
    $("#formFiltro")[0].reset();
    // Crear Options con otra llamada
    // Sólo si no se han cargado ya
    if($("#inlineFormCustomSelect > *").length < 2){
        if(localStorage["tiposActividad"] != null){
            let datos = JSON.parse(localStorage["tiposActividad"]);
            cargarOptionss(datos);
        }else{
            $.get("../nuevaActividad/getTipo.php", function(datos){
                cargarOptionss(datos);
                localStorage["tiposActividad"] = JSON.stringify(datos);
            }, 'json');
        }
    }

    
    $.ajax({
        url: "getActividades.php",
        method: "GET",
        async: false,
        success: cargarTablaYFiltro,
        dataType:'json'
    })
}
function cargarOptionss(datos){
    let select = $("#inlineFormCustomSelect")[0];
    datos.datos.forEach(o => {
        let option = document.createElement("option");
        option.value = o.idTipo;
        option.textContent = o.nombre;
        select.appendChild(option)
    })
}
function cargarTablaYFiltro(datos){
    //Crear cuerpo de tabla
    let cuerpoTabla = $("#tablaListadoActividades tbody")[0];
    datos.forEach(filaDatos => {
        let fila = cuerpoTabla.insertRow(0);
        fila.dataset.id = filaDatos.idAct;
        fila.insertCell(0).textContent = filaDatos.nombreAct;
        fila.insertCell(1).textContent = filaDatos.nombre;
        fila.insertCell(2).textContent = filaDatos.lugar;
        fila.insertCell(3).textContent = filaDatos.fecha + ", " + filaDatos.hora.substring(0,5);
        let i = document.createElement("input");
        i.type = "button";
        i.classList.add("btn");
        i.style.background = "#FAAC58";
        i.style.color = "white";
        i.value = "Consultar asistentes";
        i.addEventListener("click", consultarAsistentesALaActividad);
        fila.insertCell(4).appendChild(i);
    
    })
    
    $("#tablaListadoActividades").show("normal");
    $("#formFiltro").show("normal");
    
    //Mostrarla cuando este todo creado
}
function consultarAsistentesALaActividad(oEvento){
    var oE = oEvento || window.event;
    $.ajax({
        url: "getProfesPorActividad.php",
        method: "GET",
        async: false,
        data: {idAct:oE.target.parentNode.parentNode.dataset.id},
        success: pintarTablaProfes,
        dataType:'json'
    })
}
function pintarTablaProfes(datos){
    //Ocultarlo todo y mostrar el listado con los profesores
    $("table").hide();
    $("form").hide();
    let cartas = document.querySelectorAll('.card-columns > *');
    if(cartas.length > 0){
        cartas.forEach(hijo=>{
            hijo.remove();
        });
    }
    // Pintarlo todo, tabla etc...
    // Asistentes a X actividad
    // Pero sólo si la respuesta ha recibido algún dato
    if(datos.length > 0){
        let titulo = document.createElement("h4");
        titulo.textContent = 'Datos de asistentes a la actividad  "' + datos[0].nombreAct + '"  con id "' + datos[0].idAct + '":';
        $("#content")[0].prepend($("#sidebarCollapse")[0], titulo);
        let cuerpoTabla = $("#tablaListadoProfesPorAct tbody")[0];
        [].slice.call($("#tablaListadoProfesPorAct tbody > *")).forEach(el =>{el.remove()})
        datos.forEach(filaDatos =>{
            let fila = cuerpoTabla.insertRow(0);
            fila.insertCell(0).textContent = filaDatos.dni;
            fila.insertCell(1).textContent = filaDatos.nombreProf + " " + filaDatos.apellidos;
            fila.insertCell(2).textContent = filaDatos.nombreCuerpo;
            fila.insertCell(3).textContent = filaDatos.mail;
            fila.insertCell(4).textContent = filaDatos.colegio;
            if(filaDatos.confirmado == "1"){
                fila.insertCell(5).textContent = "Confirmada";
            }else{
                fila.insertCell(5).textContent = "No confirmada";
            }
        })
        $("#tablaListadoProfesPorAct").show("normal");
    }else{
        let titulo = document.createElement("h4");
        titulo.style.marginTop = "30px";
        titulo.textContent = 'La actividad  "' + datos.nombre + '"  con id  "' + datos.idAct + '"  no tiene ningún asistente';
        $("#content")[0].prepend($("#sidebarCollapse")[0], titulo);
    
    }
    

}
$("#btnFiltrar").click(btnFiltrarPulsado)

function btnFiltrarPulsado(){
    let tipoAct = $("#inlineFormCustomSelect")[0].value;
    let desde = $("#desde")[0].value;
    let hasta = $("#hasta")[0].value;
    if(desde == undefined){
        desde = 0;
    }
    if(hasta == undefined){
        hasta = 0;
    }

    $.ajax({
        url: "getFiltrado.php",
        method: "GET",
        async: false,
        data: {tipoAct:tipoAct, desde:desde, hasta:hasta},
        success: sacarTablaFiltrada,
        dataType:'json'
    })
}

function sacarTablaFiltrada(datosFiltrados){
    [].slice.call($("#tablaListadoActividades tbody > *")).forEach(el => el.remove());
    let cuerpoTabla = $("#tablaListadoActividades tbody")[0];
    datosFiltrados.forEach(filaDatos => {
        let fila = cuerpoTabla.insertRow(0);
        fila.dataset.id = filaDatos.idAct;
        fila.insertCell(0).textContent = filaDatos.nombreAct;
        fila.insertCell(1).textContent = filaDatos.nombre;
        fila.insertCell(2).textContent = filaDatos.lugar;
        fila.insertCell(3).textContent = filaDatos.fecha + ", " + filaDatos.hora.substring(0,5);
        let i = document.createElement("input");
        i.type = "button";
        i.classList.add("btn");
        i.style.background = "#FAAC58";
        i.style.color = "white";
        i.value = "Consultar asistentes";
        i.addEventListener("click", consultarAsistentesALaActividad);
        fila.insertCell(4).appendChild(i);
    
    })
    
}

var doc = new jsPDF();
doc.text("Hello world", 10, 10);
doc.save('pdf.pdf')


