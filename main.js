$(document).ready(function () {
  var total = 0;
  var id, opcion;
  var arrayObjeto = [];
  var arrayId = [];
  var fila;
  var precio;
  tablaProductosComp=0;
  opcion = 4;
  var objeto = {
    id: 0,
    nombre: 'nombre',
    precio: 'precio',
    cantidad: 'cantidad',
  };
  var totalPorProducto = 0;
  var banderita = true;

  tablaProductos = $("#tablaProductos").DataTable({
      ajax: {
        url: "consProd.php",
        method: "POST", //usamos el metodo POST
        data: { opcion: opcion }, //enviamos opcion 4 para que haga un SELECT
        dataSrc: "",
      },
      columns: [
        { data: "id" },
        { data: "codigo" },
        { data: "nombre" },
        { data: "idMarca" },
        { data: "precio" },
        { defaultContent:
            "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btn-sm btnAgregarVenta'><i class='material-icons'>add_shopping_cart</i></button>",
        },

      ],
    });

    opcion = 4;
    tablaPersonas = $("#tablaPersonas").DataTable({
      ajax: {
        url: "consCliente.php",
        method: "POST", //usamos el metodo POST
        data: { opcion: opcion }, //enviamos opcion 4 para que haga un SELECT
        dataSrc: "",
      },
      columns: [
        { data: "id" },
        { data: "nombre" },
        { data: "usuario" },
        { data: "email" },
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
    document.getElementById("tablaClientesCli").innerHTML ="<tbody> <tr id='trTabla1'> <td><h3 style='color:gray'>"+cliente +" </h3></td> </tr> </tbody>";
  }

  //AGREGAR PROD
  var cantidad = 1;
  var numerofila = 1;
  $(document).on("click", ".btnAgregarVenta", function () {


        fila = $(this).closest("tr");
        idv = parseInt(fila.find("td:eq(0)").text());
        codigo = parseInt(fila.find("td:eq(1)").text());
        nombre = fila.find("td:eq(2)").text();
        idMarca = fila.find("td:eq(3)").text();
        precio = parseInt(fila.find("td:eq(4)").text());

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
        console.log(arrayObjeto);
        reloadTable();
        reloadTotal()
      }
    }
    reloadTable();
    });


  //FINALIZAR
  $(document).on("click", "#btnFinalizarComp", function () {
    let numero = arrayObjeto.length;
      //CABECERA
      $.ajax({
        url: "consProd.php",
        type: "POST",
        datatype: "JSON",
        data: {
          id: id,
          cantidad:cantidad
        },
        success: function (data) {
          
          //DETALLE
          for (let i = 0; i < numero; i++) {
            let id = arrayObjeto[i].id;
            let cantidad = arrayObjeto[i].cantidad;
            $.ajax({
              url: "consProd.php",
              type: "POST",
              datatype: "JSON",
              data: {
                id: id,
                cantidad:cantidad
              },
              success: function (data) {
                console.log(idProd);
              },
            });
          }
        },
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
      tablaProductosComp=document.getElementById("tablaProductosComp").innerHTML +="<tr class='borrarfila' id='borrarfila"+numerofila+"'><td>" +arrayObjeto[i].nombre +" </td> <td>" +arrayObjeto[i].precio +"</td><td> <input id='target' value='"+arrayObjeto[i].cantidad+"'> </td> <td>"+numerofila+"</td> <td style='display: none'>" +arrayObjeto[i].id +" </td> <td> <button class='btn btn-danger btn-sm btnEliminarComp'><i class='material-icons'>remove_shopping_cart</i></button> </td></tr>";
    }
  }

  //FUNCION PARA CARGAR EL TOTAL DE LA VENTA
  function reloadTotal(){
    $("total").remove();
    totalPorProducto = 0;
    for (i= 0 ; i < arrayObjeto.length ; i++)
    {
      totalPorProducto = totalPorProducto + (arrayObjeto[i].precio * arrayObjeto[i].cantidad);
    }
    document.getElementById("total").innerHTML = ""+totalPorProducto;
    console.log(totalPorProducto+ '      ' + arrayObjeto.length);
  }
});
