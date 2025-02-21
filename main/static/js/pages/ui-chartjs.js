
var chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    info: '#41B1F9',
    blue: '#3245D1',
    purple: 'rgb(153, 102, 255)',
    grey: '#EBEFF6'
};

var config1 = {
    type: "line",
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "Balance",
                backgroundColor: "#fff",
                borderColor: "#fff",
                data: [20, 40, 20, 70, 10, 50, 20],
                fill: false,
                pointBorderWidth: 100,
                pointBorderColor: "transparent",
                pointRadius: 3,
                pointBackgroundColor: "transparent",
                pointHoverBackgroundColor: "rgba(63,82,227,1)",
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: -10,
                top: 10,
            },
        },
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
        tooltips: {
            mode: "index",
            intersect: false,
        },
        hover: {
            mode: "nearest",
            intersect: true,
        },
        scales: {
            xAxes: [
                {
                    gridLines: {
                        drawBorder: false,
                        display: false,
                    },
                    ticks: {
                        display: false,
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false,
                        drawBorder: false,
                    },
                    ticks: {
                        display: false,
                    },
                },
            ],
        },
    },
};
var config2 = {
    type: "line",
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "Revenue",
                backgroundColor: "#fff",
                borderColor: "#fff",
                data: [20, 800, 300, 400, 10, 50, 20],
                fill: false,
                pointBorderWidth: 100,
                pointBorderColor: "transparent",
                pointRadius: 3,
                pointBackgroundColor: "transparent",
                pointHoverBackgroundColor: "rgba(63,82,227,1)",
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: -10,
                top: 10,
            },
        },
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
        tooltips: {
            mode: "index",
            intersect: false,
        },
        hover: {
            mode: "nearest",
            intersect: true,
        },
        scales: {
            xAxes: [
                {
                    gridLines: {
                        drawBorder: false,
                        display: false,
                    },
                    ticks: {
                        display: false,
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false,
                        drawBorder: false,
                    },
                    ticks: {
                        display: false,
                    },
                },
            ],
        },
    },
};
var config3 = {
    type: "line",
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "Orders",
                backgroundColor: "#fff",
                borderColor: "#fff",
                data: [20, 40, 20, 200, 10, 540, 723],
                fill: false,
                pointBorderWidth: 100,
                pointBorderColor: "transparent",
                pointRadius: 3,
                pointBackgroundColor: "transparent",
                pointHoverBackgroundColor: "rgba(63,82,227,1)",
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: -10,
                top: 10,
            },
        },
        legend: {
            display: false,
        },
        title: {
            display: false,
            text: "Chart.js Line Chart",
        },
        tooltips: {
            mode: "index",
            intersect: false,
        },
        hover: {
            mode: "nearest",
            intersect: true,
        },
        scales: {
            xAxes: [
                {
                    gridLines: {
                        drawBorder: false,
                        display: false,
                    },
                    ticks: {
                        display: false,
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false,
                        drawBorder: false,
                    },
                    ticks: {
                        display: false,
                    },
                },
            ],
        },
    },
};
var config4 = {
    type: "line",
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: "#fff",
                borderColor: "#fff",
                data: [20, 40, 20, 70, 10, 5, 23],
                fill: false,
                pointBorderWidth: 100,
                pointBorderColor: "transparent",
                pointRadius: 3,
                pointBackgroundColor: "transparent",
                pointHoverBackgroundColor: "rgba(63,82,227,1)",
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: -10,
                top: 10,
            },
        },
        legend: {
            display: false,
        },
        title: {
            display: false,
            text: "Chart.js Line Chart",
        },
        tooltips: {
            mode: "index",
            intersect: false,
        },
        hover: {
            mode: "nearest",
            intersect: true,
        },
        scales: {
            xAxes: [
                {
                    gridLines: {
                        drawBorder: false,
                        display: false,
                    },
                    ticks: {
                        display: false,
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false,
                        drawBorder: false,
                    },
                    ticks: {
                        display: false,
                    },
                },
            ],
        },
    },
};
//----------------------------------------------------------
var year = new Date().getFullYear();
var ene = 0;
var feb = 0;
var mar = 0;
var abr = 0;
var may = 0;
var jun = 0;
var jul = 0;
var ago = 0;
var sep = 0;
var oct = 0;
var nov = 0;
var dic = 0;
function obtenerAsistenciasPorMes(){
    fetch('/asistencia/meses/traer/')  // Ajusta la URL según tu configuración
    .then(response => response.json()) // Convertir la respuesta en JSON
    .then(data => {
        console.log("Asistencias por mes:", data);

        // Guardar valores en variables
        ene = data[1] || 0;
        feb = data[2] || 0;
        mar = data[3] || 0;
        abr = data[4] || 0;
        may = data[5] || 0;
        jun = data[6] || 0;
        jul = data[7] || 0;
        ago = data[8] || 0;
        sep = data[9] || 0;
        oct = data[10] || 0;
        nov = data[11] || 0;
        dic = data[12] || 0;

        // Puedes usar estos valores para gráficos, reportes, etc.
        console.log(`Enero: ${ene}, Febrero: ${feb}, Marzo: ${mar}, Abril: ${abr}, Mayo: ${may}, Junio: ${jun}, Julio: ${jul}, Agosto: ${ago}, Septiembre: ${sep}, Octubre: ${oct}, Noviembre: ${nov}, Diciembre: ${dic}`);
        var ctxBar = document.getElementById("bar").getContext("2d");
        var myBar = new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
                datasets: [{
                    label: 'Estudiantes',
                    backgroundColor: [chartColors.grey, chartColors.grey, chartColors.grey, chartColors.grey, chartColors.info, chartColors.blue, chartColors.grey],
                    data: [
                        ene, feb, mar, abr, may, jun, jul, ago, sep, oct, nov, dic
                    ]
                }]
            },
            options: {
                responsive: true,
                barRoundness: 1,
                title: {
                    display: true,
                    text: "Estudiantes año " + year,
                },
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            suggestedMax: 40 + 20,
                            padding: 10,
                        },
                        gridLines: {
                            drawBorder: false,
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false,
                            drawBorder: false
                        }
                    }]
                }
            }
        });
    })
    .catch(error => console.error("Error al obtener asistencias:", error));
}
$(document).ready(obtenerAsistenciasPorMes);

var line = document.getElementById("line").getContext("2d");
var gradient = line.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(50, 69, 209,1)');
gradient.addColorStop(1, 'rgba(265, 177, 249,0)');

var gradient2 = line.createLinearGradient(0, 0, 0, 400);
gradient2.addColorStop(0, 'rgba(255, 91, 92,1)');
gradient2.addColorStop(1, 'rgba(265, 177, 249,0)');

$(document).ready(obtenerAsistenciasDia);
function obtenerAsistenciasDia (){
    fetch("/asistencias/dias/traer/")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la respuesta de la API");
            }
            return response.json();
        })
        .then(data => {
            var labels = [];
            var asistenciasData = [];
            data.forEach(item => {
                labels.push(item.fecha); // Fecha en formato "YYYY-MM-DD"
                asistenciasData.push(parseInt(item.total_asistencias, 10)); // Convertir a número
            });
            var myline = new Chart(line, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Balance del Mes',
                        data: asistenciasData,
                        backgroundColor: "rgba(50, 69, 209,.6)",
                        borderWidth: 3,
                        borderColor: 'rgba(63,82,227,1)',
                        pointBorderWidth: 0,
                        pointBorderColor: 'transparent',
                        pointRadius: 3,
                        pointBackgroundColor: 'transparent',
                        pointHoverBackgroundColor: 'rgba(63,82,227,1)',
                    }]
                },
                options: {
                    responsive: true,
                    layout: {
                        padding: {
                            top: 10,
                        },
                    },
                    tooltips: {
                        intersect: false,
                        titleFontFamily: 'Helvetica',
                        titleMarginBottom: 10,
                        xPadding: 10,
                        yPadding: 10,
                        cornerRadius: 3,
                    },
                    legend: {
                        display: true,
                    },
                    scales: {
                        yAxes: [
                            {
                                gridLines: {
                                    display: true,
                                    drawBorder: true,
                                },
                                ticks: {
                                    display: true,
                                },
                            },
                        ],
                        xAxes: [
                            {
                                gridLines: {
                                    drawBorder: false,
                                    display: false,
                                },
                                ticks: {
                                    display: false,
                                },
                            },
                        ],
                    },
                }
            });

            // Mostrar los datos en consola (para depuración)
            console.log("Asistencias por fecha:", asistenciasPorFecha);

            // Aquí puedes utilizar los datos (graficar, mostrar en una tabla, etc.)
        })
        .catch(error => {
            console.error("Error al obtener las asistencias:", error);
        });
}

// let ctx1 = document.getElementById("canvas1").getContext("2d");
// let ctx2 = document.getElementById("canvas2").getContext("2d");
// let ctx3 = document.getElementById("canvas3").getContext("2d");
// let ctx4 = document.getElementById("canvas4").getContext("2d");
// var lineChart1 = new Chart(ctx1, config1);
// var lineChart2 = new Chart(ctx2, config2);
// var lineChart3 = new Chart(ctx3, config3);
// var lineChart4 = new Chart(ctx4, config4);
