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
        confirmButtonText: 'Autorizar',
        allowOutsideClick: false, // Evita que se cierre al hacer clic fuera
        allowEscapeKey: false, // Evita que se cierre con la tecla ESC
        preConfirm: (password) => {
            if (!password) {
                Toastify({
                    text: "Por favor ingrese el código de autorización",
                    duration: 5000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "red"
                }).showToast();
                return false; // Evita que Swal se cierre
            }
            return password;
        }
    });

    if (!password) return; // Evita que el resto del código se ejecute si no se ingresó nada

    if (password === "98632170") {
        $.ajax({
            url: '/monitoria/agregar/',
            type: 'POST',
            headers: { "X-CSRFToken": csrftoken },
            data: {
                estudiante: $("#codigo").val(),
                horas: $("#horas").val()
            },
            success: function (data) {
                if (data.status != "1") {
                    Swal.fire({
                        icon: "error",
                        title: data.message,
                        timer: 5000,
                        showConfirmButton: false,
                        willClose: () => {
                            $("#codigo").val("");
                            $("#horas").val("");
                            document.getElementById('codigo').focus();
                        }
                    });
                } else {
                    porcentaje = ((data.monitorias_realizadas / data.monitorias_necesarias) * 100).toFixed(2);
                    Swal.fire({
                        icon: "success",
                        title: data.message,
                        html: "<table class='table table-borderless' id='progress-table'><tr><td class='col-3'>"+data.monitorias_realizadas + " de " + data.monitorias_necesarias + " horas</td><td class='col-6'><div class='progress progress-info progress-lg'><div class='progress-bar' role='progressbar' style='width:"+porcentaje+"%' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100'></div></div></tr></table>",
                        timer: 10000,
                        confirmButtonColor: '#81D4FA',
                        showConfirmButton: false,
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
            timer: 5000,
            showConfirmButton: false,
            willClose: () => {
                $("#codigo").val("");
                $("#horas").val("");
                document.getElementById('codigo').focus();
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

