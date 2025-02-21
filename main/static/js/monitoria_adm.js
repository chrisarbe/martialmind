window.onload = function() {
    document.getElementById("menu_admin").setAttribute("class", "submenu active");
    //document.getElementById("menu_asistencia_admin").setAttribute("class", "submenu active");
    document.getElementById("menu_monitoria_admin").setAttribute("class", "submenu-item active");
    monitoria_estudiantes_traer();
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

function monitoria_traer() {
    const csrftoken = getCookie('csrftoken');
    const documento = $("#estudiante_id").val();
    const url = documento ? '/monitoria/traer/' : '/monitoria/traer/todos/';
    const requestData = { dato: documento };

    dataTable.clear().draw(); // Limpia la tabla

    $.ajax({
        url: url,
        type: 'POST',
        headers: { "X-CSRFToken": csrftoken },
        data: requestData,
        success: function (data) {
            console.log(data);

            // Actualizar mensajes de progreso
            let contProgress = document.getElementById("progress-table");
            contProgress.innerHTML = documento
                ? `<tr><td class='col-3'>${data.monitorias_realizadas} de ${data.monitorias_necesarias} horas</td>
                    <td class='col-6'><div class='progress progress-info progress-lg'>
                    <div class='progress-bar' role='progressbar' style='width:${((data.monitorias_realizadas / data.monitorias_necesarias) * 100).toFixed(2)}%' 
                    aria-valuenow='0' aria-valuemin='0' aria-valuemax='100'></div></div></td></tr>`
                : `<div class='alert alert-info'><h4 class='alert-heading'>Info</h4><p>Se listaron todas las monitorias ordenadas por fecha</p></div>`;

            // Obtener las filas para DataTable
            let rows = documento 
                ? data.monitorias.map(item => [data.estudiante, item.fecha]) 
                : data.map(item => [
                    (estudiantes.find(est => est.id === item.fields.estudiante) || { nombre: "Desconocido" }).nombre,
                    item.fields.fecha
                ]);

            // Agregar filas a la tabla y refrescar
            dataTable.rows.add(rows).draw();

            // Limpiar campos de entrada
            $("#estudiante, #estudiante_id").val("");
        }
    });
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