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
        monitoria_agregar(inputField.value);  // Ejecuta la función si tiene 8 caracteres
    }
}

function monitoria_agregar(codigo_carnet) {
    const csrftoken = getCookie('csrftoken'); 
    $.ajax({
        url: '/monitoria/agregar/',
        type: 'POST',
        headers:{"X-CSRFToken": csrftoken },
        data: { 
            estudiante:codigo_carnet
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
                    }
                });
            }
        }
    });
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

