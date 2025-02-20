window.onload = function() {
	document.getElementById("menu_monitoria").setAttribute("class", "sidebar-item active");
    const inputField = document.getElementById('codigo');
    inputField.addEventListener('input', detectarCaracteres);
    document.getElementById('codigo').focus();
};

// Función que detecta el número de caracteres en el input
function detectarCaracteres() {
    const inputField = document.getElementById('codigo');  // Obtén el campo de entrada
    if (inputField.value.length === 8) {  // Verifica si tiene 8 caracteres
        console.log(inputField.value)
        //monitoria_agregar(inputField.value);  // Ejecuta la función si tiene 8 caracteres
        document.getElementById('horas').focus();
    }
}

async function monitoria_agregar() {
    const csrftoken = getCookie('csrftoken'); 
    const { value: password } = await Swal.fire({
        title: 'Ingrese Código de Autorización',
        input: 'password',
        inputPlaceholder: 'Ingrese Código de Autorización',
        inputAttributes: {
        maxlength: 8,
        autocapitalize: 'off',
        autocorrect: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Autorizar',
    })
    if (password == "98632170") {
        $.ajax({
            url: '/monitoria/agregar/',
            type: 'POST',
            headers:{"X-CSRFToken": csrftoken },
            data: { 
                estudiante: $("#codigo").val(),
                horas: $("#horas").val()
            },
            success: function (data) {
                console.log(data)
                if(data.status != "1") {
                    Swal.fire({
                        icon: "error",
                        title: data.message,
                        timer: 5000,  // 5000 milisegundos = 5 segundos
                        showConfirmButton: false,  // Oculta el botón de "OK"
                        willClose: () => {
                            $("#codigo").val("");
                            $("#horas").val("");
                            document.getElementById('codigo').focus();
                        }
                    });
                }else{
                    Swal.fire({
                        icon: "success",
                        title: data.message,
                        timer: 5000,  // 5000 milisegundos = 5 segundos
                        confirmButtonColor: '#81D4FA',
                        showConfirmButton: false,  // Oculta el botón de "OK"
                        willClose: () => {
                            $("#codigo").val("");
                            $("#horas").val("");
                            document.getElementById('codigo').focus();
                        }
                    });
                }
            }
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Código de Autorización Incorrecto",
            timer: 5000,  // 5000 milisegundos = 5 segundos
            showConfirmButton: false,  // Oculta el botón de "OK"
            willClose: () => {
                $("#codigo").val("");
                $("#horas").val("");
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

