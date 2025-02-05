window.onload = function() {
	document.getElementById("menu_categorizacion").setAttribute("class", "submenu active");
    document.getElementById("menu_escuela").setAttribute("class", "submenu active");
    document.getElementById("menu_fecha_pago").setAttribute("class", "submenu-item active");
};

function fecha_pago_borrar(pk) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/fecha_pago/borrar/',
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
                    confirmButtonText: '<a href="/fecha_pago/">Aceptar</a>'
                });
            }
        }
    });
}

function reiniciar_formulario(){
	$("#valor").val("");
}

function fecha_pago_ver(pk) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/fecha_pago/ver/',
        type: 'POST',
        headers:{"X-CSRFToken": csrftoken },
        data: { 
            dato:pk
        },
        success: function (data) {
            $("#valor_ver").val(data[0].fields.valor);
        }
    }).always(function() {
        $('#ver_fecha_pago').modal('show');
       });
}

function fecha_pago_editar(pk) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/fecha_pago/ver/',
        type: 'POST',
        headers:{"X-CSRFToken": csrftoken },
        data: { 
            dato:pk
        },
        success: function (data) {
            $("valor_editar").val(data[0].fields.valor);
            $("#pk_editar").val(data[0].pk);
        }
    }).always(function() {
        $('#editar_fecha_pago').modal('show');
       });
}

function fecha_pago_editar_guardar() {
    const csrftoken = getCookie('csrftoken');
    var valor = $("#valor_editar").val();
	if (valor == "") {
		$( "#valor_editar" ).addClass( "is-invalid" );
		Swal.fire({
            icon: "error",
            title: "Los campos no pueden estar vacios",
            confirmButtonColor: '#81D4FA',
            confirmButtonText: '<a>Aceptar</a>'
        });
	}else{
        $.ajax({
            url: '/fecha_pago/editar/',
            type: 'POST',
            headers:{"X-CSRFToken": csrftoken },
            data: { 
                pk_editar:document.getElementById("pk_editar").value,
                valor_editar:document.getElementById("valor_editar").value
            },
            success: function (data) {
                if (data.status == "1"){
                    $('#editar_fecha_pago').modal('hide');
                    Swal.fire({
                        icon: "success",
                        title: data.message,
                        confirmButtonColor: '#81D4FA',
                        confirmButtonText: '<a href="/fecha_pago/">Aceptar</a>'
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

function fecha_pago_agregar() {
    const csrftoken = getCookie('csrftoken');
	var valor = $("#valor").val();
	if (valor == "") {
		$( "#valor" ).addClass( "is-invalid" );
		Swal.fire({
            icon: "error",
            title: "Los campos no pueden estar vacios",
            confirmButtonColor: '#81D4FA',
            confirmButtonText: '<a>Aceptar</a>'
        });
	}else{
        $.ajax({
            url: '/fecha_pago/agregar/',
            type: 'POST',
            headers:{"X-CSRFToken": csrftoken },
            data: { 
                valor:document.getElementById("valor").value
            },
            success: function (data) {
                $('#agregar_fecha_pago').modal('hide');
                if (data.status == "1"){
                    Swal.fire({
                        icon: "success",
                        title: data.message,
                        confirmButtonColor: '#81D4FA',
                        confirmButtonText: '<a href="/fecha_pago/">Aceptar</a>'
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: data.message,
                        confirmButtonColor: '#81D4FA',
                        confirmButtonText: '<a href="/fecha_pago/">Aceptar</a>'
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