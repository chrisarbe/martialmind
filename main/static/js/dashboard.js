window.onload = function() {
	document.getElementById("menu_dashboard").setAttribute("class", "sidebar-item active");
	estudiante_profile($("#username_pk").val());
};

function estudiante_profile(username) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/estudiante_profile/ver/',
        type: 'POST',
        headers:{"X-CSRFToken": csrftoken },
        data: { 
            dato:username
        },
        success: function (data) {
            cinturon_traer(data[0].fields.cinturon);
        }
    });
}

function cinturon_traer(pk) {
    const cont = document.getElementById("grado_cinturon");
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/cinturon/ver/',
        type: 'POST',
        headers:{"X-CSRFToken": csrftoken },
        data: { 
            dato:pk
        },
        success: function (data) {
            cont.innerHTML = '<img src= "/static/images/faces/cinta_'+data[0].fields.nombre.toLowerCase()+'.png" alt="Cinturón '+data[0].fields.nombre.toLowerCase()+'">'
            if (data[0].fields.nombre.toLowerCase() == "dan4" || data[0].fields.nombre.toLowerCase() == "dan5" || data[0].fields.nombre.toLowerCase() == "dan6") {
                document.getElementById("eres").innerText = "Maestro";
            } else if (data[0].fields.nombre.toLowerCase() == "dan1" || data[0].fields.nombre.toLowerCase() == "dan2" || data[0].fields.nombre.toLowerCase() == "dan3") {
                document.getElementById("eres").innerText = "Profesor";
            }else {
                document.getElementById("eres").innerText = "Estudiante";
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