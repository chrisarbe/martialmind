window.onload = function() {
	document.getElementById("menu_categorizacion").setAttribute("class", "submenu active");
    document.getElementById("menu_categorizacion_2").setAttribute("class", "submenu active");
    document.getElementById("menu_cinturon").setAttribute("class", "submenu-item active");
};

function cinturon_borrar(pk) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/cinturon/borrar/',
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
                    confirmButtonText: '<a href="/cinturon/">Aceptar</a>'
                });
            }
        }
    });
}

function reiniciar_formulario(){
	$("#nombre").val("");
}

function cinturon_ver(pk) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/cinturon/ver/',
        type: 'POST',
        headers:{"X-CSRFToken": csrftoken },
        data: { 
            dato:pk
        },
        success: function (data) {
            $("#nombre_ver").val(data[0].fields.nombre);
        }
    }).always(function() {
        $('#ver_cinturon').modal('show');
       });
}

function cinturon_editar(pk) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/cinturon/ver/',
        type: 'POST',
        headers:{"X-CSRFToken": csrftoken },
        data: { 
            dato:pk
        },
        success: function (data) {
            $("#nombre_editar").val(data[0].fields.nombre);
            $("#pk_editar").val(data[0].pk);
        }
    }).always(function() {
        $('#editar_cinturon').modal('show');
       });
}

function cinturon_editar_guardar() {
    const csrftoken = getCookie('csrftoken');
    var nombre = $("#nombre_editar").val();
	if (nombre == "") {
		$( "#nombre_editar" ).addClass( "is-invalid" );
		Swal.fire({
            icon: "error",
            title: "Los campos no pueden estar vacios",
            confirmButtonColor: '#81D4FA',
            confirmButtonText: '<a>Aceptar</a>'
        });
	}else{
        $.ajax({
            url: '/cinturon/editar/',
            type: 'POST',
            headers:{"X-CSRFToken": csrftoken },
            data: { 
                pk_editar:document.getElementById("pk_editar").value,
                nombre_editar:document.getElementById("nombre_editar").value
            },
            success: function (data) {
                if (data.status == "1"){
                    $('#editar_cinturon').modal('hide');
                    Swal.fire({
                        icon: "success",
                        title: data.message,
                        confirmButtonColor: '#81D4FA',
                        confirmButtonText: '<a href="/cinturon/">Aceptar</a>'
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

function cinturon_agregar() {
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
            url: '/cinturon/agregar/',
            type: 'POST',
            headers:{"X-CSRFToken": csrftoken },
            data: { 
                nombre:document.getElementById("nombre").value
            },
            success: function (data) {
                $('#agregar_cinturon').modal('hide');
                if (data.status == "1"){
                    Swal.fire({
                        icon: "success",
                        title: data.message,
                        confirmButtonColor: '#81D4FA',
                        confirmButtonText: '<a href="/cinturon/">Aceptar</a>'
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: data.message,
                        confirmButtonColor: '#81D4FA',
                        confirmButtonText: '<a href="/cinturon/">Aceptar</a>'
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