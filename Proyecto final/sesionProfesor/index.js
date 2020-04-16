//Función para cargar el numerito de "mis actividades"
window.onload = function(){
    let datosProfe = JSON.parse(sessionStorage.getItem("profesor"));
    $.get("getNumeroAct.php", {dniProfe : datosProfe.dni}, function(datos){
        $(".badge-light")[0].textContent = datos.suma;
    }, 'json');
    
}
$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
});
if(sessionStorage.getItem("profesor") == null){
    window.open("../index.html", "_self");
}


$('a[href="../index.html"]').click(function(){
    sessionStorage.clear();
});
$("#verActividades").click(verActividades);
$("#misActividades").click(misActividades);
$("#misDatos").click(misDatos);
function verActividades(){
    //Ocultar lo que haya por ahí
    $("form").hide("normal");
    //Cagar las actividades
    $.ajax({
        url: "getActividades.php",
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

function respuestaVerActividades(datos){
        //Si esta activado hay que borrar u ocultar las cartas
        if($("#content")[0].querySelectorAll(".parrafo").length != 0){
            $("#content")[0].querySelectorAll(".parrafo")[0].remove();
        }
        let cartas = document.querySelectorAll('.card-columns > *');
        if(cartas.length > 0){
            cartas.forEach(hijo=>{
                hijo.remove();
            });
       }else{
            let contenedor = $(".card-columns")[0];
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
                a.textContent = "Inscribirse";
                a.classList.add("inscribirse");
                a.dataset.idActividad = element.idAct;
                ul.appendChild(li1);
                ul.appendChild(li2);
                ul.appendChild(li3);
                div3.appendChild(ul);
                div2.appendChild(div3);
                div1.appendChild(div2);
                div3.appendChild(a);
                contenedor.appendChild(div1);
            });
            let btnInscribirse = document.querySelectorAll('.inscribirse');
            btnInscribirse.forEach(boton=>{
                boton.addEventListener("click", fInscribirse);
            });
        
       }
function fInscribirse(oEvento){
    var oE = oEvento || window.event;
    //Hacer un post enviando el dni del profesor y el id de la actividad
    let idAct = oE.target.dataset.idActividad;
    let datosProfe = JSON.parse(sessionStorage.getItem("profesor"));
    $.ajax({
        url: "postInscripcion.php",
        method: "POST",
        async: true,
        success: function(datos){
            alert(datos.mensaje);
            if(datos.datos != undefined){
                $(".badge-light")[0].textContent = datos.datos;
            }
        },
        data: { idAct: idAct,
                dniProfe: datosProfe.dni
            },
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
function misActividades(){
    //Ocultar lo que haya por ahí
    $("form").hide("normal");
    //Cagar las mis actividades
    let datosProfe = JSON.parse(sessionStorage.getItem("profesor"));
    $.ajax({
        url: "getActividadesPorProfesor.php",
        type: "post",
        async: true,
        data: {dniProfe: datosProfe.dni},
        dataType: "json",
        success: respuestaMisActividades
    });
}
function respuestaMisActividades(datos){
    let cartas = document.querySelectorAll('.card-columns > *');
    if($("#content")[0].querySelectorAll(".parrafo").length != 0){
        $("#content")[0].querySelectorAll(".parrafo")[0].remove();
    }
    if(cartas.length > 0){
        cartas.forEach(hijo=>{
            hijo.remove();
        });
    }else{
        if(datos.datos.length == 0){
            let p = document.createElement("p");
            p.classList.add("parrafo");
            p.textContent = "No te has inscrito aun en ninguna actividad";
            if($("#content")[0].querySelectorAll(".parrafo").length == 0){
                $("#content")[0].appendChild(p);
            }
            
        }else{
            let contenedor = $(".card-columns")[0];
            datos.datos.forEach(element => {
                let div1 = document.createElement("div");
                div1.classList.add("col");
                div1.classList.add("mb-4");

                let div2 = document.createElement("div");
                div2.classList.add("card");
                if(element.confirmado == 1){
                    div2.classList.add("confirmado");
                }
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
                if(element.confirmado == 1){
                    li1.classList.add("confirmado");
                    li2.classList.add("confirmado");
                    li3.classList.add("confirmado");
                }
                if(element.confirmado == 0){
                    var a = document.createElement("a");
                    a.classList.add("btn");
                    a.classList.add("btn-success");
                    a.textContent = "Confirmar asistencia";
                    a.classList.add("inscribirse");
                    a.dataset.idActividad = element.idAct;

                    var a2 = document.createElement("a");
                    a2.classList.add("btn");
                    a2.classList.add("btn-danger");
                    a2.textContent = "Cancelar inscripción";
                    a2.classList.add("cancelarInscripcion");
                    a2.dataset.idActividad = element.idAct;

                    
                }
                

                ul.appendChild(li1);
                ul.appendChild(li2);
                ul.appendChild(li3);
                div3.appendChild(ul);
                if(element.confirmado == 0){
                    div3.appendChild(a);
                    div3.appendChild(a2);
                }
                div2.appendChild(div3);
                div1.appendChild(div2);

                contenedor.appendChild(div1);
            });
        }
        
        let btnInscribirse = document.querySelectorAll('.inscribirse');
        btnInscribirse.forEach(boton=>{
            boton.addEventListener("click", fConfirmarAsistencia);
        });
        let btnCancelar = document.querySelectorAll('.cancelarInscripcion');
        btnCancelar.forEach(boton=>{
            boton.addEventListener("click", fCancelarInscripcion);
        });
    }
}
function fConfirmarAsistencia(oEvento){
    var oE = oEvento || window.event;
    let idAct = oE.target.dataset.idActividad;
    let dniProfe = JSON.parse(sessionStorage.getItem("profesor")).dni;
    $.ajax({
        url: "postConfirmarInscripcion.php",
        method: "POST",
        async: true,
        success: function(datos){
            alert(datos.mensaje);
            oE.target.nextElementSibling.remove();
            oE.target.parentNode.parentNode.classList.add("confirmado");
            let lis = oE.target.parentNode.querySelectorAll("li");
            lis.forEach(li =>{
                li.classList.add("confirmado");
            })
            oE.target.remove();
        },
        data: { idAct: idAct,
                dniProfe: dniProfe
            },
        dataType : 'json'
    });


}
function fCancelarInscripcion(oEvento){
    var oE = oEvento || window.event;
    let idAct = oE.target.dataset.idActividad;
    let dniProfe = JSON.parse(sessionStorage.getItem("profesor")).dni;
    $.ajax({
        url: "postCancelarInscripcion.php",
        method: "POST",
        async: true,
        success: function(datos){
            alert(datos.mensaje);
            oE.target.parentNode.parentNode.parentNode.remove();
            //Actualizar el numerito de "mis actividades"
            let datosProfe = JSON.parse(sessionStorage.getItem("profesor"));
            $.get("getNumeroAct.php", {dniProfe : datosProfe.dni}, function(datos){
                $(".badge-light")[0].textContent = datos.suma;
            }, 'json');
        },
        data: { idAct: idAct,
                dniProfe: dniProfe
            },
        dataType : 'json'
    });
}
function misDatos(){
    //Ver mis datos
    //Ocultar lo que haya por ahí

    let cartas = document.querySelectorAll('.card-columns > *');
    if(cartas.length > 0){
        cartas.forEach(hijo=>{
            hijo.remove();
        });
    }
    if($("#content")[0].querySelectorAll(".parrafo").length != 0){
        $("#content")[0].querySelectorAll(".parrafo")[0].remove();
    }
    //Cargar el formulario
    // Oculto todos los formularios menos este
    $("form:not('#formMisDatos')").hide("normal");

    // Verifico si ya he cargado el formulario antes
    if ($('#formMisDatos').length == 0) {
        $("<div>").appendTo('#content').load("../misDatosProfe/index.html",
            function() {
                $.getScript("../misDatosProfe/modificarProfe.js");
            });
    }else{
        // Lo muestro si está oculto
        $('#formMisDatos').show("normal");
    }
}
