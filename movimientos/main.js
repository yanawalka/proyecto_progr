$(document).ready(function () {
  tablaProductosComp=0
  var fechadeldia = new Date();
  var fechadeldia = fechadeldia.toLocaleDateString("es-ES");
  var currentdate = new Date(); 
  var datetime = currentdate.getDate() + "/"
              + (currentdate.getMonth()+1)  + "/" 
              + currentdate.getFullYear() + " -- "  
              + currentdate.getHours() + ":"  
              + currentdate.getMinutes() + ":" 
              + currentdate.getSeconds();
  var result;
  var caja= {
    cjid: 0,
    cjcierre: 0,
    cjmontoincial: 0,
    cjsaldo: 0,
  }
  $("#inputCierre").prop("readonly", true);
  $('#fechaHora').val(datetime);
  $('#fechaHora').prop("readonly", true);
  $('#nombreCajero').val("MricaGuillitoEltragasable");
  $('#nombreCajero').prop("readonly", true);

  reloadApertura();


function reloadApertura(){
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
    console.log(caja.cjid)
    $('#inputCierre').val(caja.cjsaldo);
    $('#inputApertura').val(caja.cjmontoincial)
    console.log(caja.cjmontoincial)
    if(caja.cjmontoincial == 0){
      $("#backModal").css('display', 'flex');
      console.log('aquitoy')
    }
    tablaMovimientos();
  }
})

}
 
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

  $(document).on("click", "#cajaDetalle", function () {
    $('#tablaCaja').DataTable().destroy();
    opcion = 3;
    tablaProductos = $("#tablaCaja").DataTable({
      lengthMenu: [[5], [5]],
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
    $("#arqueoCaja").css('display', 'flex');
  });

  function tablaMovimientos() {
    opcion = 4;
    tablaProductos = $("#tablaMovimientos").DataTable({
      lengthMenu: [[5], [5]],
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
        data: { 
          opcion: opcion,
          cjid: caja.cjid
        }, //enviamos opcion 3
        dataSrc: "",
      },
      columns: [
        { data: "movid" },
        { data: "movtipo" },
        { data: "movdinero" },
        { data: "movdesc" },
        { defaultContent:
          "<div class='text-center'><button class='btn btn-danger btn-sm btnAgregarVenta'><i class='material-icons'>remove_shopping_cart</i></button></div>",
      }
      ],
    });
  }

  $(document).on("click", "#cerrarArqueo", function () {
    $("#arqueoCaja").css('display', 'none');
    })


    $(document).on("click", "#addMovimiento", function () {
      tipo =  $('#tipoMovimiento').val();
      dinero =  $('#dineroMovimiento').val();
      descripcion =  $('#descripcionMovimiento').val();
      opcion = 5;
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
          tipo: tipo,
          dinero:dinero,
          descripcion:descripcion,
          cjid: caja.cjid
        },
        success: function (data) {
        console.log(data);
        $('#tablaMovimientos').DataTable().destroy();
        tablaMovimientos();
      }
    })
    });
})
