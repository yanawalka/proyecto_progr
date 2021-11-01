$(document).ready(function () {
  tablaProductosComp=0
  var fechadeldia = new Date();
  var fechadeldia = fechadeldia.toLocaleDateString("es-ES");
  var result;
  var caja= {
    cjid: 0,
    cjcierre: 0,
    cjmontoincial: 0,
    cjsaldo: 0,
  }

  opcion = 3;
  tablaProductos = $("#tablaCaja").DataTable({
    language: {
      "decimal": "",
      "emptyTable": "No hay información",
      "info": "Mostrando _START_ a _END_ de _TOTAL_ Productos",
      "infoEmpty": "Mostrando 0 to 0 of 0 Productos",
      "infoFiltered": "(Filtrado de _MAX_ total Productos)",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "Mostrar _MENU_ Productos",
      "loadingRecords": "Cargando...",
      "processing": "Procesando...",
      "search": "Buscar:",
      "zeroRecords": "Sin resultados encontrados",
      "paginate": {
          "first": "Primero",
          "last": "Ultimo",
          "next": "Siguiente",
          "previous": "Anterior"
        }
    },
    ajax: {
      url: "consCaja.php",
      method: "POST", //usamos el metodo POST
      data: { opcion: opcion }, //enviamos opcion 3
      dataSrc: "",
    },
    columns: [
      { data: "cjid" },
      { data: "cjfecha" },
      { data: "cjmontoincial" },
      { data: "cjcierre" },
      { data: "cjsaldo" },
      { data: "cjtoting" },
      { data: "cjtotegr" },
      { data: "cjfechahoracierre" },
      { data: "empid" },    
    ],
  });
  


  opcion = 1;
  $.ajax({
    url:"consCaja.php",
    type:"POST",
    datatype:"JSON",
    data: {
      opcion: opcion,
    },
    success: function (data) {
    result = JSON.parse(data);
    console.log(result)
    caja.cjid = result[0].cjid;
    caja.cjcierre = result[0].cjcierre;
    caja.cjmontoincial = result[0].cjmontoincial ;
    caja.cjsaldo = result[0].cjsaldo;
    $('#inputCierre').val(caja.cjsaldo);
    $('#inputApertura').val(caja.cjmontoincial)
    if(caja.cjcierre == 1){
      $("#inputCierre").prop("readonly", true);
      $("#inputApertura").prop("readonly", true);
    }
  }
})



  $(document).on("click", "#subirCaja", function () {
    opcion = 2;
    if ( caja.cjsaldo > 0){
      caja.cjcierre = 1;
      alert("usted esta cerrando la caja");
    }

    $.ajax({
      url:"consCaja.php",
      type:"POST",
      datatype:"JSON",
      data: {
        opcion: opcion,
        cjid: caja.cjid,
        cjcierre: caja.cjcierre,
        cjmontoincial: caja.cjmontoincial,
        cjsaldo: caja.cjsaldo,
      },
      success: function (data) {
      // result = JSON.parse(data);
      location.reload();
    }
  })
  });

  $(document).on("keyup", "#inputApertura", function () { 
    caja.cjmontoincial =  $('#inputApertura').val();
  });
  
  $(document).on("keyup", "#inputCierre", function () { 
    caja.cjsaldo =  $('#inputCierre').val();
  });
  

})




 
    // function esInicio (){
  //     $.ajax({
  //       url:"consCaja.php",
  //       type:"POST",
  //       datatype:"JSON",
  //       data: {
  //       },
  //       success: function (data) {
  //         //CREACION DE DETALLE DE VENTA
  //         result = JSON.parse(data);
  //       //  console.log(result[0].cjcierre);
  //        estadoCaja = result[0].cjcierre;
  //     }
  //   })
  // //  }

  //  console.log(estadoCaja);

  // })