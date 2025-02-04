window.onload = function() {
	document.getElementById("menu_categorizacion").setAttribute("class", "submenu active");
    document.getElementById("menu_animales").setAttribute("class", "submenu active");
    document.getElementById("menu_estado_productivo_animal").setAttribute("class", "submenu-item active");
};

function estado_productivo_animal_borrar(pk) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/estado_productivo_animal/borrar/',
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
                    confirmButtonText: '<a href="/estado_productivo_animal/">Aceptar</a>'
                });
            }
        }
    });
}

function reiniciar_formulario(){
	$("#descripcion").val("");
}

function estado_productivo_animal_ver(pk) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/estado_productivo_animal/ver/',
        type: 'POST',
        headers:{"X-CSRFToken": csrftoken },
        data: { 
            dato:pk
        },
        success: function (data) {
            $("#descripcion_ver").val(data[0].fields.descripcion);
        }
    }).always(function() {
        $('#ver_estado_productivo_animal').modal('show');
       });
}

function estado_productivo_animal_editar(pk) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/estado_productivo_animal/ver/',
        type: 'POST',
        headers:{"X-CSRFToken": csrftoken },
        data: { 
            dato:pk
        },
        success: function (data) {
            $("#descripcion_editar").val(data[0].fields.descripcion);
            $("#pk_editar").val(data[0].pk);
        }
    }).always(function() {
        $('#editar_estado_productivo_animal').modal('show');
       });
}

function estado_productivo_animal_editar_guardar() {
    const csrftoken = getCookie('csrftoken');
    var descripcion = $("#descripcion_editar").val();
	if (descripcion == "") {
		$( "#descripcion_editar" ).addClass( "is-invalid" );
		Swal.fire({
            icon: "error",
            title: "Los campos no pueden estar vacios",
            confirmButtonColor: '#81D4FA',
            confirmButtonText: '<a>Aceptar</a>'
        });
	}else{
        $.ajax({
            url: '/estado_productivo_animal/editar/',
            type: 'POST',
            headers:{"X-CSRFToken": csrftoken },
            data: { 
                pk_editar:document.getElementById("pk_editar").value,
                descripcion_editar:document.getElementById("descripcion_editar").value
            },
            success: function (data) {
                if (data.status == "1"){
                    $('#editar_estado_productivo_animal').modal('hide');
                    Swal.fire({
                        icon: "success",
                        title: data.message,
                        confirmButtonColor: '#81D4FA',
                        confirmButtonText: '<a href="/estado_productivo_animal/">Aceptar</a>'
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

function estado_productivo_animal_agregar() {
    const csrftoken = getCookie('csrftoken');
	var descripcion = $("#descripcion").val();
	if (descripcion == "") {
		$( "#descripcion" ).addClass( "is-invalid" );
		Swal.fire({
            icon: "error",
            title: "Los campos no pueden estar vacios",
            confirmButtonColor: '#81D4FA',
            confirmButtonText: '<a>Aceptar</a>'
        });
	}else{
        $.ajax({
            url: '/estado_productivo_animal/agregar/',
            type: 'POST',
            headers:{"X-CSRFToken": csrftoken },
            data: { 
                descripcion:document.getElementById("descripcion").value
            },
            success: function (data) {
                $('#agregar_estado_productivo_animal').modal('hide');
                if (data.status == "1"){
                    Swal.fire({
                        icon: "success",
                        title: data.message,
                        confirmButtonColor: '#81D4FA',
                        confirmButtonText: '<a href="/estado_productivo_animal/">Aceptar</a>'
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: data.message,
                        confirmButtonColor: '#81D4FA',
                        confirmButtonText: '<a href="/estado_productivo_animal/">Aceptar</a>'
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