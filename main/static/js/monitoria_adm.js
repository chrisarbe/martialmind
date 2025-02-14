window.onload = function() {
    document.getElementById("menu_admin").setAttribute("class", "submenu active");
    //document.getElementById("menu_asistencia_admin").setAttribute("class", "submenu active");
    document.getElementById("menu_monitoria_admin").setAttribute("class", "submenu-item active");
    monitoria_estudiantes_traer();
};

// Lista precargada de estudiantes
const estudiantes = [];

// Referencias a los elementos HTML
const inputBuscar = document.getElementById("estudiante");
const inputId = document.getElementById("estudiante_id");
const listaEstudiantes = document.getElementById("listaEstudiantes");

// Evento para detectar cambios en el input
inputBuscar.addEventListener("input", function () {
    let filtro = inputBuscar.value.toLowerCase();
    listaEstudiantes.innerHTML = ""; // Limpiar resultados previos

    // Filtrar estudiantes según el texto ingresado
    let coincidencias = estudiantes.filter(est => est.nombre.toLowerCase().includes(filtro));

    // Si hay coincidencias, agregarlas al dropdown
    if (coincidencias.length > 0) {
        coincidencias.forEach(est => {
            let item = document.createElement("li");
            item.innerHTML = `<a class="dropdown-item" href="#" data-id="${est.id}">${est.nombre} ${est.apellido}</a>`;
            item.addEventListener("click", function () {
                inputId.value = est.id; // Asignar ID al input
                listaEstudiantes.innerHTML = ""; // Ocultar dropdown
            });
            listaEstudiantes.appendChild(item);
        });
    } else {
        listaEstudiantes.innerHTML = `<li><a class="dropdown-item disabled">No encontrado</a></li>`;
    }
});

function monitoria_traer() {
    const csrftoken = getCookie('csrftoken');
    var documento = $("#estudiante_id").val();
    if (documento == "") {
        $.ajax({
            url: '/monitoria/traer/todos/',
            type: 'POST',
            headers:{"X-CSRFToken": csrftoken },
            data: { 
                dato:documento
            },
            success: function (data) {
                console.log(data)
                var cont = document.getElementById("contenido");
                cont2 = document.getElementById("progress-table");
                cont2.innerHTML = "";
                cont2.innerHTML = "<div class='alert alert-info'><h4 class='alert-heading'>Info</h4><p>Se listaron todas las monitorias ordenadas por fecha</p></div>";
                cont.innerHTML = "";
                for (let i = 0; i < data.length; i++) {
                    let estudianteID = data[i].fields.estudiante; // ID del estudiante
                    let estudianteObj = estudiantes.find(est => est.id === estudianteID); // Buscar en la lista
                    let nombreEstudiante = estudianteObj ? estudianteObj.nombre : "Desconocido"; // Si no se encuentra, mostrar "Desconocido"
                    cont.innerHTML += "<tr><td>"+nombreEstudiante+"</td><td>"+data[i].fields.fecha+"</td></tr>";
                }
                $("#estudiante").val("");
                $("#estudiante_id").val("");
            }
        });
    } else {
        $.ajax({
            url: '/monitoria/traer/',
            type: 'POST',
            headers:{"X-CSRFToken": csrftoken },
            data: { 
                dato:documento
            },
            success: function (data) {
                console.log(data)
                porcentaje = ((data.monitorias_realizadas / data.monitorias_necesarias) * 100).toFixed(2);
                var cont = document.getElementById("contenido");
                var cont3 = document.getElementById("progress-table");
                cont3.innerHTML = "";
                cont3.innerHTML = "<tr><td class='col-3'>"+data.monitorias_realizadas + " de " + data.monitorias_necesarias + " monitorias realizadas</td><td class='col-6'><div class='progress progress-info progress-lg'><div class='progress-bar' role='progressbar' style='width:"+porcentaje+"%' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100'></div></div></tr>";
                cont.innerHTML = "";
                for (let i = 0; i < data.monitorias.length; i++) {
                    cont.innerHTML += "<tr><td>"+data.estudiante+"</td><td>"+data.monitorias[i].fecha+"</td></tr>";
                }
                $("#estudiante").val("");
                $("#estudiante_id").val("");
            }
        });
    }
}

function monitoria_estudiantes_traer() {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/monitoria/estudiantes/traer/',
        type: 'POST',
        headers:{"X-CSRFToken": csrftoken },
        success: function (data) {
            console.log(data)
            for (x in data) {
                estudiantes.push({id: data[x].pk, nombre: data[x].fields.nombre, apellido: data[x].fields.apellido});
                console.log(data[x].fields.nombre);
            }
        }
    });
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}