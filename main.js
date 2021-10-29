$(document).ready(function () {
  $("#backModal").hide();
  var total = 0;
  var id, opcion;
  var arrayObjeto = [];
  var fila;
  var precio;
  tablaProductosComp=0
  var cliente = '';
  var objeto = {
    id: 0,
    nombre: 'nombre',
    precio: 'precio',
    cantidad: 'cantidad',
  };
  var banderita = true;
  var valordescuento = 1;
  var totalPorProducto = 0;

  opcion = 4;
  tablaProductos = $("#tablaProductos").DataTable({
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
        url: "consProd.php",
        method: "POST", //usamos el metodo POST
        data: { opcion: opcion }, //enviamos opcion 4 para que haga un SELECT
        dataSrc: "",
      },
      columns: [
        { data: "proid" },
        { data: "procodigo" },
        { data: "pronombre" },
        { data: "maid" },
        { data: "prostockactual" },
        { data: "proprecio" },
        { defaultContent:
            "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btn-sm btnAgregarVenta'><i class='material-icons'>add_shopping_cart</i></button>",
        },

      ],
    });

  opcion = 4;
  tablaPersonas = $("#tablaPersonas").DataTable({
      language: {
        "decimal": "",
        "emptyTable": "No hay información",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ Clientes",
        "infoEmpty": "Mostrando 0 to 0 of 0 Clientes",
        "infoFiltered": "(Filtrado de _MAX_ total Cliente)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "Mostrar _MENU_ Clientes",
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
        url: "consCliente.php",
        method: "POST", //usamos el metodo POST
        data: { opcion: opcion }, //enviamos opcion 4 para que haga un SELECT
        dataSrc: "",
      },
      columns: [
        { data: "clid" },
        { data: "clnom" },
        { data: "clemail" },
        { data: "cldire" },
        { data: "cltele" },
        { defaultContent:
            "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btn-sm btnAgregarCli'><i class='material-icons'>done</i></button>",
        },

      ],
    });

  $(document).on("click", ".btnAgregarCli", function () {

    fila = $(this).closest("tr");
    id = parseInt(fila.find("td:eq(0)").text());
    nombre = fila.find("td:eq(1)").text();
    cliente=nombre;
    clienteId=id;
    agregarCli();
  })
  // REEMPLAZAR CLI
  function agregarCli() {
    document.getElementById("tablaClientesCli").innerHTML =""+cliente+"";
  }

  //AGREGAR PROD
  var cantidad = 1;
  var numerofila = 1;
  $(document).on("click", ".btnAgregarVenta", function () {
        fila = $(this).closest("tr");
        idv = parseInt(fila.find("td:eq(0)").text());
        nombre = fila.find("td:eq(2)").text();
        precio = parseInt(fila.find("td:eq(5)").text());

          objeto = {
            id: idv,
            nombre: nombre,
            precio: precio,
            cantidad: cantidad,
          };


          if(arrayObjeto.length === 0){
            agregarProd(idv)
            banderita = false;
          }else{
            for(i = 0; i < arrayObjeto.length ; i++){
              if(arrayObjeto[i].id === objeto.id){
                alert('Tu objeto ya existe en la tabla');
                banderita = false;
              }
            }
          }
          if(banderita){
            agregarProd(idv)
          }          
          banderita = true;
      });
    
//ELIMINAR CAMPOS TABLA PRODUCTOSCOMP
    $(document).on("click", ".btnEliminarComp", function () { 
    fila = $(this).closest("tr");
    precio2 = parseInt(fila.find("td:eq(1)").text());
    numeroparaborrarfila = fila.find("td:eq(3)").text();
    total = total - precio2;
    document.getElementById("total").innerHTML = ""+total;
    borrarfila = "borrarfila"+numeroparaborrarfila;

    idproducto = parseInt(fila.find("td:eq(4)").text());
    for (i= 0 ; i < arrayObjeto.length ; i++)
    {
      if(arrayObjeto[i].id == idproducto)
      {
        if (arrayObjeto.length == 1)
        {
          arrayObjeto = [];
        }
        arrayObjeto.splice(i,1);
        reloadTable();
        reloadTotal();
      }
    }
    reloadTable();
    });

  //FINALIZAR
  $(document).on("click", "#botoncModal", function () {
    $("#backModal").hide();

    //CREACION DE CABEZA DE VENTA
    var opcion = 5;
    $.ajax({
      url:"consProd.php",
      type:"POST",
      datatype:"JSON",
      data: {
        opcion:opcion,
      },
      success: function (data) {
        //CREACION DE DETALLE DE VENTA
        result = JSON.parse(data);
        factura = result[0].factura;
        let orden = 1;
        for (let i = 0; i < arrayObjeto.length; i++) {

          let id = arrayObjeto[i].id;
          let precio = arrayObjeto[i].precio;
          let cantidad = arrayObjeto[i].cantidad;

          opcion = 6;
            $.ajax({
              url: "consProd.php",
              type: "POST",
              datatype: "JSON",
              data: {
                opcion:opcion,
                id:id,
                precio:precio,
                cantidad:cantidad,
                orden:orden,
                factura:factura
              },
              success: function (data) {
                //ACTUALIZACION DEL TOTAL DE LA CABEZA DE LA VENTA
                opcion = 7;
                $.ajax({
                  url: "consProd.php",
                  type: "POST",
                  datatype: "JSON",
                  data: {
                    opcion:opcion,
                    factura:factura
                  },
                  success: function (data) {
                    location.reload();
                  }
                })
              },
            });
            orden++;
        }
      }
    });

  });

  //Keyup de cantidad
  $(document).on("keyup", "#target", function () { 
    fila = $(this).closest("tr");
    valor = parseInt(fila.find("#target").val());
    idproducto = parseInt(fila.find("td:eq(4)").text());
    for (i= 0 ; i < arrayObjeto.length ; i++)
    {
      if(arrayObjeto[i].id == idproducto)
      {
        arrayObjeto[i].cantidad = valor;
      }
    }
    reloadTotal();
  });

  //FUNCION PARA AGREGAR PRODUCTO
  function agregarProd(idv) {
    arrayObjeto.push(objeto);
    reloadTotal();
    reloadTable();
    }

    //FUNCION PARA CARGAR LA TABLA
  function reloadTable(){
    $(".borrarfila").remove();
    for (i= 0 ; i < arrayObjeto.length ; i++)
    {
      tablaProductosComp=document.getElementById("tablaProductosComp").innerHTML +="<tr class='borrarfila' id='borrarfila"+numerofila+"'><td>" +arrayObjeto[i].nombre +" </td> <td>" +arrayObjeto[i].precio +"</td><td> <input id='target' class='form-control' value='"+arrayObjeto[i].cantidad+"'> </td> <td>"+numerofila+"</td> <td style='display: none'>" +arrayObjeto[i].id +" </td> <td> <button class='btn btn-danger btn-sm btnEliminarComp'><i class='material-icons'>remove_shopping_cart</i></button> </td></tr>";
    }
  }

  //modal tabla
  $(document).on("click", "#btnFinalizarComp", function () {
    if(cliente === '' || arrayObjeto == 0){
      alert('Ingrese producto o cliente')
    }else{
      $("#backModal").show();
      $("#clienteModal").html("<div class='totalt col-6'><div class='input-group-prepend'><span class='input-group-text'>CLIENTE:</span></div><label id='clienteModalLabel' class='form-control'>"+cliente+"</label></div>");
      $("#totalModal").html("<div class='d-flex justify-content-end'><div class='totalDivCol'><div class='input-group-prepend'><span class='input-group-text'>TOTAL:</span></div><label id='totalModalLabel' class='form-control'>"+totalPorProducto+"</label></div></div>");
      for (i= 0 ; i < arrayObjeto.length ; i++)
      {
        idModalBody=document.getElementById("idModal").innerHTML +="<tr class='modalCerrar'><td>" +arrayObjeto[i].nombre +" </td> <td>" +arrayObjeto[i].precio +"</td><td> <p>"+arrayObjeto[i].cantidad+"</p> </td><td> <p>"+arrayObjeto[i].cantidad * arrayObjeto[i].precio +"</p> </td></tr>";
      }
    }

  })

  //Cerrar drower
  $(document).on("click", "#cerrarDrawer", function () {
    $("#backModal").hide();
    $(".modalCerrar").remove();
  })

  //FUNCION PARA CARGAR EL TOTAL DE LA VENTA
  function reloadTotal(valordescuento){
    $("total").remove();
    totalPorProducto = 0;
    for (i= 0 ; i < arrayObjeto.length ; i++)
    {
      totalPorProducto = totalPorProducto + (arrayObjeto[i].precio * arrayObjeto[i].cantidad);
    }
    if(valordescuento != undefined){    
      valordescuento = (valordescuento*totalPorProducto)/100;
      totalPorProducto = totalPorProducto - valordescuento;
      document.getElementById("total").innerHTML = totalPorProducto;
    }
    if(isNaN(totalPorProducto)){
      reloadTotalVacio()
    }else{
      document.getElementById("total").innerHTML = totalPorProducto;
    }
  }

     //Keyup de descuento
    $(document).on("keyup", "#descuentito", function () {
      valordescuento = parseInt($("#descuentito").val());
      descuento = valordescuento;
      reloadTotal(descuento);
    });

    function reloadTotalVacio() {
      document.getElementById("total").innerHTML = '0';
    }
});