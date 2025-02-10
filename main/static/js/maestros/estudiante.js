window.onload = function() {
	document.getElementById("menu_categorizacion").setAttribute("class", "submenu active");
    document.getElementById("menu_escuela").setAttribute("class", "submenu active");
    document.getElementById("menu_estudiante").setAttribute("class", "submenu-item active");
};

function estudiante_borrar(pk) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/estudiante/borrar/',
        type: 'POST',
        headers:{"X-CSRFToken": csrftoken },
        data: { 
            dato:pk
        },
        success: function (data) {
            if(data.status != "1") {
                Swal.fire({
                    icon: "error",
                    title: data.message
                });
            }else{
                Swal.fire({
                    icon: "success",
                    title: data.message,
                    confirmButtonColor: '#81D4FA',
                    confirmButtonText: '<a href="/estudiante/">Aceptar</a>'
                });
            }
        }
    });
}

function reiniciar_formulario(){
    $("#nombre").val("");
}

function estudiante_ver(pk) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/estudiante/ver/',
        type: 'POST',
        headers:{"X-CSRFToken": csrftoken },
        data: { 
            dato:pk
        },
        success: function (data) {
            console.log(data)
            $("#nombre_ver").val(data[0].fields.nombre);
            $("#apellido_ver").val(data[0].fields.apellido);
            $("#tipo_documento_ver").val(data[0].fields.tipo_documento);
            $("#documento_ver").val(data[0].fields.documento);
            $("#fecha_nacimiento_ver").val(data[0].fields.fecha_nacimiento);
            $("#direccion_ver").val(data[0].fields.direccion);
            $("#telefono_ver").val(data[0].fields.telefono);
            $("#correo_ver").val(data[0].fields.correo);
            $("#municipio_ver").val(data[0].fields.municipio);
            $("#eps_ver").val(data[0].fields.eps);
            $("#profesion_ver").val(data[0].fields.profesion);
            $("#cinturon_ver").val(data[0].fields.cinturon);
            $("#acudiente_ver").val(data[0].fields.acudiente);
            $("#academia_ver").val(data[0].fields.academia);
            $("#codigo_carnet_ver").val(data[0].fields.codigo_carnet);
            $("#fecha_pago_ver").val(data[0].fields.fecha_pago);
            $("#usuario_ver").val(data[0].fields.usuario);
            document.getElementById("aldia_ver").value = (data[0].fields.aldia);
        }
    }).always(function() {
        $('#ver_estudiante').modal('show');
       });
}

function estudiante_editar(pk) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/estudiante/ver/',
        type: 'POST',
        headers:{"X-CSRFToken": csrftoken },
        data: { 
            dato:pk
        },
        success: function (data) {
            $("#nombre_editar").val(data[0].fields.nombre);
            $("#apellido_editar").val(data[0].fields.apellido);
            $("#tipo_documento_editar").val(data[0].fields.tipo_documento);
            $("#documento_editar").val(data[0].fields.documento);
            $("#fecha_nacimiento_editar").val(data[0].fields.fecha_nacimiento);
            $("#direccion_editar").val(data[0].fields.direccion);
            $("#telefono_editar").val(data[0].fields.telefono);
            $("#correo_editar").val(data[0].fields.correo);
            $("#municipio_editar").val(data[0].fields.municipio);
            $("#eps_editar").val(data[0].fields.eps);
            $("#profesion_editar").val(data[0].fields.profesion);
            $("#cinturon_editar").val(data[0].fields.cinturon);
            $("#acudiente_editar").val(data[0].fields.acudiente);
            $("#academia_editar").val(data[0].fields.academia);
            $("#codigo_carnet_editar").val(data[0].fields.codigo_carnet);
            $("#fecha_pago_editar").val(data[0].fields.fecha_pago);
            $("#usuario_editar").val(data[0].fields.usuario);
            document.getElementById("aldia_editar").value = (data[0].fields.aldia);
            $("#pk_editar").val(data[0].pk);
        }
    }).always(function() {
        $('#editar_estudiante').modal('show');
       });
}

function estudiante_editar_guardar() {
    const csrftoken = getCookie('csrftoken');
    var nombre = $("#nombre_editar").val();
    var apellido = $("#apellido_editar").val();
    var tipo_documento = $("#tipo_documento_editar").val();
    var documento = $("#documento_editar").val();
    var fecha_nacimiento = $("#fecha_nacimiento_editar").val();
    var direccion = $("#direccion_editar").val();
    var telefono = $("#telefono_editar").val();
    var correo = $("#correo_editar").val();
    var municipio = $("#municipio_editar").val();
    var eps = $("#eps_editar").val();
    var profesion = $("#profesion_editar").val();
    var cinturon = $("#cinturon_editar").val();
    var acudiente = $("#acudiente_editar").val();
    var academia = $("#academia_editar").val();
    var codigo_carnet = $("#codigo_carnet_editar").val();
    var fecha_pago = $("#fecha_pago_editar").val();
    var usuario = $("#usuario_editar").val();
    var pk = $("#pk_editar").val();
    if (nombre == "") {
		$( "#nombre_editar" ).addClass( "is-invalid" );
		Swal.fire({
            icon: "error",
            title: "Los campos no pueden estar vacios",
            confirmButtonColor: '#81D4FA',
            confirmButtonText: '<a>Aceptar</a>'
        });
    }else if (apellido == "") {
        $( "#apellido_editar" ).addClass( "is-invalid" );
        Swal.fire({
            icon: "error",
            title: "Los campos no pueden estar vacios",
            confirmButtonColor: '#81D4FA',
            confirmButtonText: '<a>Aceptar</a>'
        });
    }else if (documento == "") {
        $( "#documento_editar" ).addClass( "is-invalid" );
        Swal.fire({
            icon: "error",
            title: "Los campos no pueden estar vacios",
            confirmButtonColor: '#81D4FA',
            confirmButtonText: '<a>Aceptar</a>'
        });
	}else{
        $.ajax({
            url: '/estudiante/editar/',
            type: 'POST',
            headers:{"X-CSRFToken": csrftoken },
            data: { 
                nombre_editar:document.getElementById("nombre_editar").value,
                apellido_editar:document.getElementById("apellido_editar").value,
                tipo_documento_editar:document.getElementById("tipo_documento_editar").value,
                documento_editar:document.getElementById("documento_editar").value,
                fecha_nacimiento_editar:document.getElementById("fecha_nacimiento_editar").value,
                direccion_editar:document.getElementById("direccion_editar").value,
                telefono_editar:document.getElementById("telefono_editar").value,
                correo_editar:document.getElementById("correo_editar").value,
                municipio_editar:document.getElementById("municipio_editar").value,
                eps_editar:document.getElementById("eps_editar").value,
                profesion_editar:document.getElementById("profesion_editar").value,
                cinturon_editar:document.getElementById("cinturon_editar").value,
                acudiente_editar:document.getElementById("acudiente_editar").value,
                academia_editar:document.getElementById("academia_editar").value,
                codigo_carnet_editar:document.getElementById("codigo_carnet_editar").value,
                fecha_pago_editar:document.getElementById("fecha_pago_editar").value,
                usuario_editar:document.getElementById("usuario_editar").value,
                aldia_editar:document.getElementById("aldia_editar").value,
                pk_editar:document.getElementById("pk_editar").value
            },
            success: function (data) {
                if(data.status != "1") {
                    Swal.fire({
                        icon: "error",
                        title: data.message
                    });
                }else{
                    Swal.fire({
                        icon: "success",
                        title: data.message,
                        confirmButtonColor: '#81D4FA',
                        confirmButtonText: '<a href="/estudiante/">Aceptar</a>'
                    });
                }
            }
        });
    }
}

function estudiante_agregar() {
    const csrftoken = getCookie('csrftoken');
    var nombre = $("#nombre").val();
    var apellido = $("#apellido").val();
    var tipo_documento = $("#tipo_documento").val();
    var documento = $("#documento").val();
    var fecha_nacimiento = $("#fecha_nacimiento").val();
    var direccion = $("#direccion").val();
    var telefono = $("#telefono").val();
    var correo = $("#correo").val();
    var municipio = $("#municipio").val();
    var eps = $("#eps").val();
    var profesion = $("#profesion").val();
    var cinturon = $("#cinturon").val();
    var acudiente = $("#acudiente").val();
    var academia = $("#academia").val();
    var codigo_carnet = $("#codigo_carnet").val();
    var fecha_pago = $("#fecha_pago").val();
    var usuario = $("#usuario").val();
    if (nombre == "") {
        $( "#nombre" ).addClass( "is-invalid" );
        Swal.fire({
            icon: "error",
            title: "Los campos no pueden estar vacios",
            confirmButtonColor: '#81D4FA',
            confirmButtonText: '<a>Aceptar</a>'
        });
    }else if (apellido == "") {
        $( "#apellido" ).addClass( "is-invalid" );
        Swal.fire({
            icon: "error",
            title: "Los campos no pueden estar vacios",
            confirmButtonColor: '#81D4FA',
            confirmButtonText: '<a>Aceptar</a>'
        });
    }else if (documento == "") {
        $( "#documento" ).addClass( "is-invalid" );
        Swal.fire({
            icon: "error",
            title: "Los campos no pueden estar vacios",
            confirmButtonColor: '#81D4FA',
            confirmButtonText: '<a>Aceptar</a>'
        }); 
    }else{
        $.ajax({
            url: '/estudiante/agregar/',
            type: 'POST',
            headers:{"X-CSRFToken": csrftoken },
            data: { 
                nombre:document.getElementById("nombre").value,
                apellido:document.getElementById("apellido").value,
                tipo_documento:document.getElementById("tipo_documento").value,
                documento:document.getElementById("documento").value,
                fecha_nacimiento:document.getElementById("fecha_nacimiento").value,
                direccion:document.getElementById("direccion").value,
                telefono:document.getElementById("telefono").value,
                correo:document.getElementById("correo").value,
                municipio:document.getElementById("municipio").value,
                eps:document.getElementById("eps").value,
                profesion:document.getElementById("profesion").value,
                cinturon:document.getElementById("cinturon").value,
                acudiente:document.getElementById("acudiente").value,
                academia:document.getElementById("academia").value,
                codigo_carnet:document.getElementById("codigo_carnet").value,
                fecha_pago:document.getElementById("fecha_pago").value,
                usuario:document.getElementById("usuario").value,
                aldia:document.getElementById("aldia").value
            },
            success: function (data) {
                if(data.status != "1") {
                    Swal.fire({
                        icon: "error",
                        title: data.message
                    });
                }else{
                    Swal.fire({
                        icon: "success",
                        title: data.message,
                        confirmButtonColor: '#81D4FA',
                        confirmButtonText: '<a href="/estudiante/">Aceptar</a>'
                    });
                }
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const fechaNacimientoInput = document.getElementById("fecha_nacimiento");
    const otroInput = document.getElementById("acudiente");

    fechaNacimientoInput.addEventListener("change", function () {
        const fechaNacimiento = new Date(this.value);
        
        // Validar si la fecha es válida
        if (isNaN(fechaNacimiento.getTime())) {
            otroInput.setAttribute("disabled", "true");
            return;
        }

        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mesDiferencia = hoy.getMonth() - fechaNacimiento.getMonth();
        const diaDiferencia = hoy.getDate() - fechaNacimiento.getDate();

        // Ajuste de edad si aún no ha pasado el cumpleaños este año
        if (mesDiferencia < 0 || (mesDiferencia === 0 && diaDiferencia < 0)) {
            edad--;
        }

        // Habilitar o deshabilitar el otro input según la edad
        if (edad >= 18) {
            otroInput.removeAttribute("disabled");
        } else {
            otroInput.setAttribute("disabled", "true");
        }
    });
});

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