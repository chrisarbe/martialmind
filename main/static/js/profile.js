window.onload = function() {
	estudiante_profile($("#username_pk").val());
};
$(document).ready(function() {
    var panels = $('.user-infos');
    var panelsButton = $('.dropdown-user');
    panels.hide();

    //Click dropdown
    panelsButton.click(function() {
        //get data-for attribute
        var dataFor = $(this).attr('data-for');
        var idFor = $(dataFor);

        //current button
        var currentButton = $(this);
        idFor.slideToggle(400, function() {
            //Completed slidetoggle
            if(idFor.is(':visible'))
            {
                currentButton.html('<i class="glyphicon glyphicon-chevron-up text-muted"></i>');
            }
            else
            {
                currentButton.html('<i class="glyphicon glyphicon-chevron-down text-muted"></i>');
            }
        })
    });


    $('[data-toggle="tooltip"]').tooltip();

    $('button').click(function(e) {
        e.preventDefault();
        alert("This is a demo.\n :-)");
    });
});

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
            console.log(data)
            document.getElementById("documento").innerText = data[0].fields.documento;
            document.getElementById("fecha_nacimiento").innerText = data[0].fields.fecha_nacimiento;
            document.getElementById("edad").innerText = calcularEdad(data[0].fields.fecha_nacimiento);
            document.getElementById("direccion").innerText = data[0].fields.direccion;
            document.getElementById("telefono").innerText = data[0].fields.telefono;
            document.getElementById("carnet").innerText = data[0].fields.codigo_carnet;
            if (data[0].fields.aldia == true) {
                document.getElementById("aldia").innerText = "✅";
            } else {
                document.getElementById("aldia").innerText = "❌";
            }
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

function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    
    // Restar un año si el cumpleaños aún no ha ocurrido este año
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
    }

    return edad;
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