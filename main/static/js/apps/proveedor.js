window.onload = function() {
	document.getElementById("menu_pos").setAttribute("class", "submenu active");
    document.getElementById("menu_pos_2").setAttribute("class", "submenu active");
    document.getElementById("menu_proveedor").setAttribute("class", "submenu-item active");
};

function proveedor_borrar(pk) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/proveedor/borrar/',
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
                    confirmButtonText: '<a href="/proveedor/">Aceptar</a>'
                });
            }
        }
    });
}

function reiniciar_formulario(){
	$("#nombre").val("");
}

function proveedor_ver(pk) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/proveedor/ver/',
        type: 'POST',
        headers:{"X-CSRFToken": csrftoken },
        data: { 
            dato:pk
        },
        success: function (data) {
            $("#tipo_proveedor_ver").val(data[0].fields.tipo_proveedor);
            $("#tipo_documento_ver").val(data[0].fields.tipo_documento);
            $("#numero_documento_ver").val(data[0].fields.numero_documento);
            $("#primer_nombre_ver").val(data[0].fields.primer_nombre);
            $("#segundo_nombre_ver").val(data[0].fields.segundo_nombre);
            $("#primer_apellido_ver").val(data[0].fields.primer_apellido);
            $("#segundo_apellido_ver").val(data[0].fields.segundo_apellido);
            $("#celular_ver").val(data[0].fields.celular);
            $("#fijo_ver").val(data[0].fields.fijo);
            $("#email_ver").val(data[0].fields.email);
            $("#direccion_ver").val(data[0].fields.direccion);
            $("#pais_ver").val(data[0].fields.pais);
            $("#departamento_ver").val(data[0].fields.departamento);
            $("#municipio_ver").val(data[0].fields.municipio);
            $("#codigo_postal_ver").val(data[0].fields.codigo_postal);
            $("#numero_impuesto_ver").val(data[0].fields.numero_impuesto);
            $("#saldo_ver").val(data[0].fields.saldo);
            $("#termino_pago_ver").val(data[0].fields.termino_pago);
        }
    }).always(function() {
        $('#ver_proveedor').modal('show');
       });
}

function proveedor_editar(pk) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/proveedor/ver/',
        type: 'POST',
        headers:{"X-CSRFToken": csrftoken },
        data: { 
            dato:pk
        },
        success: function (data) {
            $("#pk_editar").val(data[0].pk);
            $("#tipo_proveedor_editar").val(data[0].fields.tipo_proveedor);
            $("#tipo_documento_editar").val(data[0].fields.tipo_documento);
            $("#numero_documento_editar").val(data[0].fields.numero_documento);
            $("#primer_nombre_editar").val(data[0].fields.primer_nombre);
            $("#segundo_nombre_editar").val(data[0].fields.segundo_nombre);
            $("#primer_apellido_editar").val(data[0].fields.primer_apellido);
            $("#segundo_apellido_editar").val(data[0].fields.segundo_apellido);
            $("#celular_editar").val(data[0].fields.celular);
            $("#fijo_editar").val(data[0].fields.fijo);
            $("#email_editar").val(data[0].fields.email);
            $("#direccion_editar").val(data[0].fields.direccion);
            $("#pais_editar").val(data[0].fields.pais);
            $("#departamento_editar").val(data[0].fields.departamento);
            $("#municipio_editar").val(data[0].fields.municipio);
            $("#codigo_postal_editar").val(data[0].fields.codigo_postal);
            $("#numero_impuesto_editar").val(data[0].fields.numero_impuesto);
            $("#saldo_editar").val(data[0].fields.saldo);
            $("#termino_pago_editar").val(data[0].fields.termino_pago);
        }
    }).always(function() {
        $('#editar_proveedor').modal('show');
       });
}

function proveedor_editar_guardar() {
    const csrftoken = getCookie('csrftoken');
    var nombre = $("#numero_documento_editar").val();
	if (nombre == "") {
		$( "#numero_documento_editar" ).addClass( "is-invalid" );
		Swal.fire({
            icon: "error",
            title: "Los campos no pueden estar vacios",
            confirmButtonColor: '#81D4FA',
            confirmButtonText: '<a>Aceptar</a>'
        });
	}else{
        $.ajax({
            url: '/proveedor/editar/',
            type: 'POST',
            headers:{"X-CSRFToken": csrftoken },
            data: { 
                pk_editar:document.getElementById("pk_editar").value,
                tipo_proveedor_editar:document.getElementById("tipo_proveedor_editar").value,
                tipo_documento_editar:document.getElementById("tipo_documento_editar").value,
                numero_documento_editar:document.getElementById("numero_documento_editar").value,
                primer_nombre_editar:document.getElementById("primer_nombre_editar").value,
                segundo_nombre_editar:document.getElementById("segundo_nombre_editar").value,
                primer_apellido_editar:document.getElementById("primer_apellido_editar").value,
                segundo_apellido_editar:document.getElementById("segundo_apellido_editar").value,
                celular_editar:document.getElementById("celular_editar").value,
                fijo_editar:document.getElementById("fijo_editar").value,
                email_editar:document.getElementById("email_editar").value,
                direccion_editar:document.getElementById("direccion_editar").value,
                pais_editar:document.getElementById("pais_editar").value,
                departamento_editar:document.getElementById("departamento_editar").value,
                municipio_editar:document.getElementById("municipio_editar").value,
                codigo_postal_editar:document.getElementById("codigo_postal_editar").value,
                numero_impuesto_editar:document.getElementById("numero_impuesto_editar").value,
                saldo_editar:document.getElementById("saldo_editar").value,
                termino_pago_editar:document.getElementById("termino_pago_editar").value
            },
            success: function (data) {
                if (data.status == "1"){
                    $('#editar_proveedor').modal('hide');
                    Swal.fire({
                        icon: "success",
                        title: data.message,
                        confirmButtonColor: '#81D4FA',
                        confirmButtonText: '<a href="/proveedor/">Aceptar</a>'
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

function proveedor_agregar() {
    const csrftoken = getCookie('csrftoken');
	var nombre = $("#numero_documento").val();
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
            url: '/proveedor/agregar/',
            type: 'POST',
            headers:{"X-CSRFToken": csrftoken },
            data: {
                tipo_proveedor:document.getElementById("tipo_proveedor").value,
                tipo_documento:document.getElementById("tipo_documento").value,
                numero_documento:document.getElementById("numero_documento").value,
                primer_nombre:document.getElementById("primer_nombre").value,
                segundo_nombre:document.getElementById("segundo_nombre").value,
                primer_apellido:document.getElementById("primer_apellido").value,
                segundo_apellido:document.getElementById("segundo_apellido").value,
                celular:document.getElementById("celular").value,
                fijo:document.getElementById("fijo").value,
                email:document.getElementById("email").value,
                direccion:document.getElementById("direccion").value,
                pais:document.getElementById("pais").value,
                departamento:document.getElementById("departamento").value,
                municipio:document.getElementById("municipio").value,
                codigo_postal:document.getElementById("codigo_postal").value,
                numero_impuesto:document.getElementById("numero_impuesto").value,
                saldo:document.getElementById("saldo").value,
                termino_pago:document.getElementById("termino_pago").value
            },
            success: function (data) {
                $('#agregar_proveedor').modal('hide');
                if (data.status == "1"){
                    Swal.fire({
                        icon: "success",
                        title: data.message,
                        confirmButtonColor: '#81D4FA',
                        confirmButtonText: '<a href="/proveedor/">Aceptar</a>'
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: data.message,
                        confirmButtonColor: '#81D4FA',
                        confirmButtonText: '<a href="/proveedor/">Aceptar</a>'
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