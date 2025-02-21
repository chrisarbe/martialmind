window.onload = function() {
	document.getElementById("menu_categorizacion").setAttribute("class", "submenu active");
    document.getElementById("menu_escuela").setAttribute("class", "submenu active");
    document.getElementById("menu_acudiente").setAttribute("class", "submenu-item active");
};

$(document).ready(function() {
    dataTable = $('#table1').DataTable(); // Inicializa correctamente
});

function acudiente_borrar(pk) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/acudiente/borrar/',
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
                    confirmButtonText: '<a href="/acudiente/">Aceptar</a>'
                });
            }
        }
    });
}

function reiniciar_formulario(){
    $("#nombre").val("");
}

function acudiente_ver(pk) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/acudiente/ver/',
        type: 'POST',
        headers:{"X-CSRFToken": csrftoken },
        data: { 
            dato:pk
        },
        success: function (data) {
            $("#nombre_ver").val(data[0].fields.nombre);
            $("#apellido_ver").val(data[0].fields.apellido);
            $("#tipo_documento_ver").val(data[0].fields.tipo_documento);
            $("#documento_ver").val(data[0].fields.documento);
            $("#direccion_ver").val(data[0].fields.direccion);
            $("#telefono_ver").val(data[0].fields.telefono);
            $("#correo_ver").val(data[0].fields.correo);
            $("#municipio_ver").val(data[0].fields.municipio);
        }
    }).always(function() {
        $('#ver_acudiente').modal('show');
       });
}

function acudiente_editar(pk) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/acudiente/ver/',
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
            $("#direccion_editar").val(data[0].fields.direccion);
            $("#telefono_editar").val(data[0].fields.telefono);
            $("#correo_editar").val(data[0].fields.correo);
            $("#municipio_editar").val(data[0].fields.municipio);
            $("#pk_editar").val(data[0].pk);
        }
    }).always(function() {
        $('#editar_acudiente').modal('show');
       });
}

function acudiente_editar_guardar() {
    const csrftoken = getCookie('csrftoken');
    var nombre = $("#nombre_editar").val();
    var apellido = $("#apellido_editar").val();
    var tipo_documento = $("#tipo_documento_editar").val();
    var documento = $("#documento_editar").val();
    var direccion = $("#direccion_editar").val();
    var telefono = $("#telefono_editar").val();
    var correo = $("#correo_editar").val();
    var municipio = $("#municipio_editar").val();
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
            url: '/acudiente/editar/',
            type: 'POST',
            headers:{"X-CSRFToken": csrftoken },
            data: { 
                nombre_editar:document.getElementById("nombre_editar").value,
                apellido_editar:document.getElementById("apellido_editar").value,
                tipo_documento_editar:document.getElementById("tipo_documento_editar").value,
                documento_editar:document.getElementById("documento_editar").value,
                direccion_editar:document.getElementById("direccion_editar").value,
                telefono_editar:document.getElementById("telefono_editar").value,
                correo_editar:document.getElementById("correo_editar").value,
                municipio_editar:document.getElementById("municipio_editar").value,
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
                        confirmButtonText: '<a href="/acudiente/">Aceptar</a>'
                    });
                }
            }
        });
    }
}

function acudiente_agregar() {
    const csrftoken = getCookie('csrftoken');
    var nombre = $("#nombre").val();
    var apellido = $("#apellido").val();
    var tipo_documento = $("#tipo_documento").val();
    var documento = $("#documento").val();
    var direccion = $("#direccion").val();
    var telefono = $("#telefono").val();
    var correo = $("#correo").val();
    var municipio = $("#municipio").val();
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
            url: '/acudiente/agregar/',
            type: 'POST',
            headers:{"X-CSRFToken": csrftoken },
            data: { 
                nombre:document.getElementById("nombre").value,
                apellido:document.getElementById("apellido").value,
                tipo_documento:document.getElementById("tipo_documento").value,
                documento:document.getElementById("documento").value,
                direccion:document.getElementById("direccion").value,
                telefono:document.getElementById("telefono").value,
                correo:document.getElementById("correo").value,
                municipio:document.getElementById("municipio").value
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
                        confirmButtonText: '<a href="/acudiente/">Aceptar</a>'
                    });
                }
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