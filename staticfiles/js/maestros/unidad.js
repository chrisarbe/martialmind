window.onload = function() {
	document.getElementById("menu_categorizacion").setAttribute("class", "submenu active");
    document.getElementById("menu_categorizacion_3").setAttribute("class", "submenu active");
    document.getElementById("menu_unidad").setAttribute("class", "submenu-item active");
};

function unidad_borrar(pk) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/unidad/borrar/',
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
                    confirmButtonText: '<a href="/unidad/">Aceptar</a>'
                });
            }
        }
    });
}

function reiniciar_formulario(){
	$("#nombre").val("");
}

function unidad_ver(pk) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/unidad/ver/',
        type: 'POST',
        headers:{"X-CSRFToken": csrftoken },
        data: { 
            dato:pk
        },
        success: function (data) {
            $("#nombre_ver").val(data[0].fields.nombre);
            $("#magnitud_ver").val(data[0].fields.magnitud);
            $("#simbolo_ver").val(data[0].fields.simbolo);
        }
    }).always(function() {
        $('#ver_unidad').modal('show');
       });
}

function unidad_editar(pk) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/unidad/ver/',
        type: 'POST',
        headers:{"X-CSRFToken": csrftoken },
        data: { 
            dato:pk
        },
        success: function (data) {
            $("#nombre_editar").val(data[0].fields.nombre);
            $("#pk_editar").val(data[0].pk);
            $("#magnitud_editar").val(data[0].fields.magnitud);
            $("#simbolo_editar").val(data[0].fields.simbolo);
        }
    }).always(function() {
        $('#editar_unidad').modal('show');
       });
}

function unidad_editar_guardar() {
    const csrftoken = getCookie('csrftoken');
    var nombre = $("#unidad_editar").val();
	if (nombre == "") {
		$( "#unidad_editar" ).addClass( "is-invalid" );
		Swal.fire({
            icon: "error",
            title: "Los campos no pueden estar vacios",
            confirmButtonColor: '#81D4FA',
            confirmButtonText: '<a>Aceptar</a>'
        });
	}else{
        $.ajax({
            url: '/unidad/editar/',
            type: 'POST',
            headers:{"X-CSRFToken": csrftoken },
            data: { 
                pk_editar:document.getElementById("pk_editar").value,
                nombre_editar:document.getElementById("nombre_editar").value,
                magnitud_editar:document.getElementById("magnitud_editar").value,
                simbolo_editar:document.getElementById("simbolo_editar").value
            },
            success: function (data) {
                if (data.status == "1"){
                    $('#editar_unidad').modal('hide');
                    Swal.fire({
                        icon: "success",
                        title: data.message,
                        confirmButtonColor: '#81D4FA',
                        confirmButtonText: '<a href="/unidad/">Aceptar</a>'
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

function unidad_agregar() {
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
            url: '/unidad/agregar/',
            type: 'POST',
            headers:{"X-CSRFToken": csrftoken },
            data: { 
                nombre:document.getElementById("nombre").value,
                magnitud:document.getElementById("magnitud").value,
                simbolo:document.getElementById("simbolo").value
            },
            success: function (data) {
                $('#agregar_unidad').modal('hide');
                if (data.status == "1"){
                    Swal.fire({
                        icon: "success",
                        title: data.message,
                        confirmButtonColor: '#81D4FA',
                        confirmButtonText: '<a href="/unidad/">Aceptar</a>'
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: data.message,
                        confirmButtonColor: '#81D4FA',
                        confirmButtonText: '<a href="/unidad/">Aceptar</a>'
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