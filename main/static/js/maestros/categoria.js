window.onload = function() {
	document.getElementById("menu_categorizacion").setAttribute("class", "submenu active");
    document.getElementById("menu_categorizacion_3").setAttribute("class", "submenu active");
    document.getElementById("menu_categoria").setAttribute("class", "submenu-item active");
};

function categoria_borrar(pk) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/categoria/borrar/',
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
                    confirmButtonText: '<a href="/categoria/">Aceptar</a>'
                });
            }
        }
    });
}

function reiniciar_formulario(){
	$("#nombre").val("");
}

function categoria_ver(pk) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/categoria/ver/',
        type: 'POST',
        headers:{"X-CSRFToken": csrftoken },
        data: { 
            dato:pk
        },
        success: function (data) {
            $("#nombre_ver").val(data[0].fields.nombre);
            $("#codigo_ver").val(data[0].fields.codigo);
            $("#descripcion_ver").val(data[0].fields.descripcion);
        }
    }).always(function() {
        $('#ver_categoria').modal('show');
       });
}

function categoria_editar(pk) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/categoria/ver/',
        type: 'POST',
        headers:{"X-CSRFToken": csrftoken },
        data: { 
            dato:pk
        },
        success: function (data) {
            $("#nombre_editar").val(data[0].fields.nombre);
            $("#pk_editar").val(data[0].pk);
            $("#codigo_editar").val(data[0].fields.codigo);
            $("#descripcion_editar").val(data[0].fields.descripcion);
        }
    }).always(function() {
        $('#editar_categoria').modal('show');
       });
}

function categoria_editar_guardar() {
    const csrftoken = getCookie('csrftoken');
    var nombre = $("#categoria_editar").val();
	if (nombre == "") {
		$( "#categoria_editar" ).addClass( "is-invalid" );
		Swal.fire({
            icon: "error",
            title: "Los campos no pueden estar vacios",
            confirmButtonColor: '#81D4FA',
            confirmButtonText: '<a>Aceptar</a>'
        });
	}else{
        $.ajax({
            url: '/categoria/editar/',
            type: 'POST',
            headers:{"X-CSRFToken": csrftoken },
            data: { 
                pk_editar:document.getElementById("pk_editar").value,
                nombre_editar:document.getElementById("nombre_editar").value,
                codigo_editar:document.getElementById("codigo_editar").value,
                descripcion_editar:document.getElementById("descripcion_editar").value
            },
            success: function (data) {
                if (data.status == "1"){
                    $('#editar_categoria').modal('hide');
                    Swal.fire({
                        icon: "success",
                        title: data.message,
                        confirmButtonColor: '#81D4FA',
                        confirmButtonText: '<a href="/categoria/">Aceptar</a>'
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

function categoria_agregar() {
    const csrftoken = getCookie('csrftoken');
	var nombre = $("#nombre").val();
    var codigo = $("#codigo").val();
	if (nombre == "" && codigo == "") {
		$( "#nombre" ).addClass( "is-invalid" );
        $( "#codigo" ).addClass( "is-invalid" );
		Swal.fire({
            icon: "error",
            title: "Los campos no pueden estar vacios",
            confirmButtonColor: '#81D4FA',
            confirmButtonText: '<a>Aceptar</a>'
        });
	}else{
        $.ajax({
            url: '/categoria/agregar/',
            type: 'POST',
            headers:{"X-CSRFToken": csrftoken },
            data: { 
                nombre:document.getElementById("nombre").value,
                codigo:document.getElementById("codigo").value,
                descripcion:document.getElementById("descripcion").value
            },
            success: function (data) {
                $('#agregar_categoria').modal('hide');
                if (data.status == "1"){
                    Swal.fire({
                        icon: "success",
                        title: data.message,
                        confirmButtonColor: '#81D4FA',
                        confirmButtonText: '<a href="/categoria/">Aceptar</a>'
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: data.message,
                        confirmButtonColor: '#81D4FA',
                        confirmButtonText: '<a href="/categoria/">Aceptar</a>'
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