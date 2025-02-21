window.onload = function() {
    document.getElementById("menu_admin").setAttribute("class", "submenu active");
    //document.getElementById("menu_asistencia_admin").setAttribute("class", "submenu active");
    document.getElementById("menu_asistencia_admin").setAttribute("class", "submenu-item active");
    asistencia_estudiantes_traer();
};

$(document).ready(function() {
    dataTable = $('#table1').DataTable(); // Inicializa correctamente
});

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

function asistencia_traer() {
    const csrftoken = getCookie('csrftoken');
    let documento = $("#estudiante_id").val();

    if (!dataTable) {
        console.error("DataTable no ha sido inicializado aún.");
        return;
    }

    dataTable.clear().draw(); // Limpia y redibuja la tabla

    let url = documento === "" ? '/asistencia/traer/todos/' : '/asistencia/traer/';

    $.ajax({
        url: url,
        type: 'POST',
        headers: { "X-CSRFToken": csrftoken },
        data: { dato: documento },
        success: function (data) {
            console.log(data);

            let rows = data.map(item => [
                (estudiantes.find(est => est.id === item.fields.estudiante) || { nombre: "Desconocido" }).nombre,
                item.fields.fecha,
                item.fields.hora
            ]);

            dataTable.rows.add(rows).draw();
            $("#estudiante, #estudiante_id").val(""); // Limpia los inputs
        }
    });
}

function asistencia_estudiantes_traer() {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/asistencia/estudiantes/traer/',
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
