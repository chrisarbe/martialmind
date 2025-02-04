window.onload = function() {
	document.getElementById("menu_categorizacion").setAttribute("class", "submenu active");
    document.getElementById("menu_geografia").setAttribute("class", "submenu active");
    document.getElementById("menu_municipio").setAttribute("class", "submenu-item active");
};

function municipio_borrar(pk) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/municipio/borrar/',
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
                    confirmButtonText: '<a href="/municipio/">Aceptar</a>'
                });
            }
        }
    });
}

function reiniciar_formulario(){
	$("#nombre").val("");
}

function municipio_ver(pk) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/municipio/ver/',
        type: 'POST',
        headers:{"X-CSRFToken": csrftoken },
        data: { 
            dato:pk
        },
        success: function (data) {
            $("#nombre_ver").val(data[0].fields.nombre);
            $("#departamento_ver").val(data[0].fields.departamento);
        }
    }).always(function() {
        $('#ver_municipio').modal('show');
       });
}

function municipio_editar(pk) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/municipio/ver/',
        type: 'POST',
        headers:{"X-CSRFToken": csrftoken },
        data: { 
            dato:pk
        },
        success: function (data) {
            $("#nombre_editar").val(data[0].fields.nombre);
            $("#pk_editar").val(data[0].pk);
            $("#departamento_editar").val(data[0].fields.departamento);
        }
    }).always(function() {
        $('#editar_municipio').modal('show');
       });
}

function municipio_editar_guardar() {
    const csrftoken = getCookie('csrftoken');
    var nombre = $("#municipio_editar").val();
	if (nombre == "") {
		$( "#municipio_editar" ).addClass( "is-invalid" );
		Swal.fire({
            icon: "error",
            title: "Los campos no pueden estar vacios",
            confirmButtonColor: '#81D4FA',
            confirmButtonText: '<a>Aceptar</a>'
        });
	}else{
        $.ajax({
            url: '/municipio/editar/',
            type: 'POST',
            headers:{"X-CSRFToken": csrftoken },
            data: { 
                pk_editar:document.getElementById("pk_editar").value,
                nombre_editar:document.getElementById("nombre_editar").value,
                departamento_editar:document.getElementById("departamento_editar").value
            },
            success: function (data) {
                if (data.status == "1"){
                    $('#editar_municipio').modal('hide');
                    Swal.fire({
                        icon: "success",
                        title: data.message,
                        confirmButtonColor: '#81D4FA',
                        confirmButtonText: '<a href="/municipio/">Aceptar</a>'
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: data.message,
                        confirmButtonColor: '#81D4FA',
                        confirmButtonText: 'Aceptar'
                    });
                }
                
            }
        });
    }
}

function municipio_agregar() {
    const csrftoken = getCookie('csrftoken');
	var nombre = $("#nombre").val();
	if (nombre == "") {
		$( "#nombre" ).addClass( "is-invalid" );
		Swal.fire({
            icon: "error",
            title: "Los campos no pueden estar vacios",
            confirmButtonColor: '#81D4FA',
            confirmButtonText: '<a>Aceptar</a>'
        });
	}else{
        $.ajax({
            url: '/municipio/agregar/',
            type: 'POST',
            headers:{"X-CSRFToken": csrftoken },
            data: { 
                nombre:document.getElementById("nombre").value,
                departamento:document.getElementById("departamento").value
            },
            success: function (data) {
                $('#agregar_municipio').modal('hide');
                if (data.status == "1"){
                    Swal.fire({
                        icon: "success",
                        title: data.message,
                        confirmButtonColor: '#81D4FA',
                        confirmButtonText: '<a href="/municipio/">Aceptar</a>'
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: data.message,
                        confirmButtonColor: '#81D4FA',
                        confirmButtonText: '<a href="/municipio/">Aceptar</a>'
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