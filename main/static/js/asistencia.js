window.onload = function() {
	document.getElementById("menu_asistencia").setAttribute("class", "sidebar-item active");
    const inputField = document.getElementById('codigo');
    inputField.addEventListener('input', detectarCaracteres);
    document.getElementById('codigo').focus();
};

// Función que detecta el número de caracteres en el input
function detectarCaracteres() {
    const inputField = document.getElementById('codigo');  // Obtén el campo de entrada
    if (inputField.value.length === 8) {  // Verifica si tiene 8 caracteres
        console.log(inputField.value)
        asistencia_agregar(inputField.value);  // Ejecuta la función si tiene 8 caracteres
    }
}

function asistencia_estudiante(codigo_carnet) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/asistencia_estudiante/',
        type: 'POST',
        headers:{"X-CSRFToken": csrftoken },
        data: { 
            dato:codigo_carnet
        },
        success: function (data) {
            console.log(data)
            if (data[0].fields.aldia == true) {
                Swal.fire({
                    icon: "success",
                    title: "Hola " + data[0].fields.nombre,
                    timer: 5000,  // 5000 milisegundos = 5 segundos
                    confirmButtonColor: '#81D4FA',
                    //confirmButtonText: '<a href="/asistencia/">Aceptar</a>',
                    showConfirmButton: false,  // Oculta el botón de "OK"
                    willClose: () => {
                        $("#codigo").val("");
                        //location.reload();  // Recargar la página después de cerrar la alerta
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Hola " + data[0].fields.nombre + " ponte al día con el pago",
                    timer: 5000,  // 5000 milisegundos = 5 segundos
                    confirmButtonColor: '#81D4FA',
                    //confirmButtonText: '<a href="/asistencia/">Aceptar</a>',
                    showConfirmButton: false,  // Oculta el botón de "OK"
                    willClose: () => {
                        $("#codigo").val("");
                        //location.reload();  // Recargar la página después de cerrar la alerta
                    }
                });
            }
        }
    });
}

function asistencia_agregar(codigo_carnet) {
    const csrftoken = getCookie('csrftoken'); 
    $.ajax({
        url: '/asistencia/agregar/',
        type: 'POST',
        headers:{"X-CSRFToken": csrftoken },
        data: { 
            estudiante:codigo_carnet
        },
        success: function (data) {
            console.log(data)
            if(data.status != "1") {
                Swal.fire({
                    icon: "error",
                    title: data.message,
                    timer: 5000,  // 5000 milisegundos = 5 segundos
                    showConfirmButton: false,  // Oculta el botón de "OK"
                    willClose: () => {
                        $("#codigo").val("");
                    }
                });
            }else{
                Swal.fire({
                    icon: "success",
                    title: data.message,
                    timer: 7000,  // 5000 milisegundos = 5 segundos
                    confirmButtonColor: '#81D4FA',
                    showConfirmButton: false,  // Oculta el botón de "OK"
                    willClose: () => {
                        $("#codigo").val("");
                    }
                });
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

function refreshCSRF() {
    fetch('/refresh-csrf/', {
        method: 'GET',
        credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector('[name=csrfmiddlewaretoken]').value = data.csrfToken;
    });
}
setInterval(refreshCSRF, 10 * 60 * 1000);
