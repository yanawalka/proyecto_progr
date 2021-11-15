$(document).ready(function () { 


    $(document).on("click", ".enviarFecha", function () {
        // $('#tablaCaja').DataTable().destroy();
        desde = $('.desde').val();
        hasta = $('.hasta').val();
        opcion = $('.form').val();
        console.log(desde)
        console.log(hasta)
        console.log(opcion)
        loadChart(desde, hasta,opcion);
      });
    



    function loadChart(desde, hasta, op) {
    var opcion = op;
    
    $.ajax({
        url: "chart.php",
        type: "POST",
        datatype: "JSON",
        data: {
          desde:desde,
          hasta:hasta,
          opcion:opcion
         
        },
        success: function (data) {
        console.log(data);
        respuesta=JSON.parse(data);
        if(opcion == 'cliente'){
            respuesta.forEach(element => {
                myChart.data['labels'].push(element.created_at);
                myChart.data['datasets'][0].data.push(element.total);
        });}
        if(opcion == 'producto'){
                    respuesta.forEach(element => {
                    myChart.data['labels'].push(element.nombre);
                    myChart.data['datasets'][0].data.push(element.total);
                    });
                }
        if(opcion == 'caja'){
                respuesta.forEach(element => {
                myChart.data['labels'].push(element.cjfecha);
                myChart.data['datasets'][0].data.push(element.total);
                });
                


        }
        
        }
        
      });
      
      const ctx = $('#myChart');
      const myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              datasets: [{
                  label: '',
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  },
                  x: {
                      beginAtZero: true
                  }
              }
          }
      });





    } 




});


