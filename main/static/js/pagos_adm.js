window.onload = function() {
    document.getElementById("menu_admin").setAttribute("class", "submenu active");
    //document.getElementById("menu_asistencia_admin").setAttribute("class", "submenu active");
    document.getElementById("menu_pagos_admin").setAttribute("class", "submenu-item active");
};

function pagos_traer() {
    const csrftoken = getCookie('csrftoken');
    pk = $("#fecha_pago").val();
    $.ajax({
        url: '/pagos/traer/',
        type: 'POST',
        headers:{"X-CSRFToken": csrftoken },
        data: { 
            dato:pk
        },
        success: function (data) {
            console.log(data)
            var cont = document.getElementById("contenido");
            cont.innerHTML = "";
            for (let i = 0; i < data.length; i++) {
                if (data[i].fields.aldia == true) {
                    cont.innerHTML += "<tr><td>"+data[i].fields.nombre+"</td><td>"+data[i].fields.apellido+"</td><td><div class='checkbox'><input type='checkbox' id='checkbox"+data[i].pk+"' class='form-check-input' checked></div></td><td><a href='#' onclick='actualizar_pago_estudiante("+data[i].pk+")' class='btn btn-primary'>Actualizar</a></td></tr>";
                } else {
                    cont.innerHTML += "<tr><td>"+data[i].fields.nombre+"</td><td>"+data[i].fields.apellido+"</td><td><div class='checkbox'><input type='checkbox' id='checkbox"+data[i].pk+"' class='form-check-input'></div></td><td><a href='#' onclick='actualizar_pago_estudiante("+data[i].pk+")' class='btn btn-primary'>Actualizar</a></td></tr>";
                }
            }
        }
    });
}

function actualizar_pago_estudiante(pk) {
    console.log(pk)
    const csrftoken = getCookie('csrftoken');
    if ($("#checkbox"+pk).is(':checked')) {
        console.log("Está marcado")
        $.ajax({
            url: '/pagos/actualizar/',
            type: 'POST',
            headers:{"X-CSRFToken": csrftoken },
            data: { 
                estudiante:pk,
                aldia:true
            },
            success: function (data) {
                console.log(data)
                Swal.fire({
                    icon: "success",
                    title: "Pago actualizado",
                    timer: 5000,  // 5000 milisegundos = 5 segundos
                    confirmButtonColor: '#81D4FA',
                    //confirmButtonText: '<a href="/asistencia/">Aceptar</a>',
                    showConfirmButton: false,  // Oculta el botón de "OK"
                    willClose: () => {
                        pagos_traer();
                    }
                });
            }
        });
    } else {
        console.log("No está marcado")
        $.ajax({
            url: '/pagos/actualizar/',
            type: 'POST',
            headers:{"X-CSRFToken": csrftoken },
            data: { 
                estudiante:pk,
                aldia:false
            },
            success: function (data) {
                console.log(data)
                Swal.fire({
                    icon: "success",
                    title: "Pago actualizado",
                    timer: 5000,  // 5000 milisegundos = 5 segundos
                    confirmButtonColor: '#81D4FA',
                    //confirmButtonText: '<a href="/asistencia/">Aceptar</a>',
                    showConfirmButton: false,  // Oculta el botón de "OK"
                    willClose: () => {
                        pagos_traer();
                    }
                });
            }
        });
    }
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