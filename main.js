$(document).ready(function () {
  var total = 0;
  var id, opcion;
  var arrayObjeto = [];
  var arrayId = [];
  var fila;
  var precio;
  tablaProductosComp=0;
  opcion = 4;


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


  //AGREGAR CLI
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
  // bandu=0;
  var cantidad=1;
  $(document).on("click", ".btnAgregarVenta", function () {

        fila = $(this).closest("tr");
        idv = parseInt(fila.find("td:eq(0)").text());
        codigo = parseInt(fila.find("td:eq(1)").text());
        nombre = fila.find("td:eq(2)").text();
        idMarca = fila.find("td:eq(3)").text();
        precio = parseInt(fila.find("td:eq(4)").text());
        total = total + precio;
        // if (bandu==0)
        // {
          objeto = {
            id: idv,
            nombre: nombre,
            precio: precio,
            cantidad: cantidad,
          };
          agregarProd(idv);
        // }
        // else {
        //   banduint=0;
        //   re=0;
        //   cantidad=1;
        //   while (re<arrayId.length && banduint==0)
        //   {
        //       if(arrayId[re]==idv)
        //       {
        //         banduint=2;
        //       }
        //       re++;
        //   }
        //   if (banduint==2)
        //   {
        //     for (re=0 ; re<arrayId.length ; re++)
        //     {
        //       if(arrayId[re]==idv)
        //       {
        //         cantidad++;
        //       }
        //     }
        //   }
        //   if (bandu==1)
        //   {
        //     objeto = {
        //       id: idv,
        //       nombre: nombre,
        //       precio: precio,
        //     };
            // agregarProd(idv);
        //   }
        // }
      });

      function agregarProd(idv) {
          // arrayId.push(idv);
          valor = $("#target").val(objeto.cantidad);
          arrayObjeto.push(objeto);
          // console.log("esto"+arrayId);
          document.getElementById("total").innerHTML = ""+total;
          tablaProductosComp=document.getElementById("tablaProductosComp").innerHTML +="<tbody id='borra"+cantidad+"'><td>" +objeto.nombre +" </td> <td>" +objeto.precio +"</td><td> <input id='target'> </td> <td> <button class='btn btn-danger btn-sm btnEliminarComp'><i class='material-icons'>remove_shopping_cart</i></button> </td></tr></tbody>";
          valor = $("#target").val(objeto.cantidad);
          console.log(objeto)
        }

//Keyup de cantidad
      $(document).on("keyup", "#target", function () { 
        valor = $("#target").val();
        fila = $(this).closest("tr");
        id = fila.find("td:eq(3)").text();

      });
    
//ELIMINAR CAMPOS TABLA PRODUCTOSCOMP
    $(document).on("click", ".btnEliminarComp", function () { 
    fila = $(this).closest("tr");
    precio2 = parseInt(fila.find("td:eq(1)").text());
    num = fila.find("td:eq(2)").text();
    num2 = fila.find("td:eq(3)").text();
    total = total - precio2;
    document.getElementById("total").innerHTML = ""+total;
    variable = "borrar"+num;
    variable2 = "borra"+num2;
      
      let hijo= document.getElementById(variable2);
      hijo.parentNode.removeChild(hijo);
      arrayId.pop();
    });

  //FINALIZAR
  $(document).on("click", "#btnFinalizarComp", function () {
    let numero = arrayId.length;

    for (let i = 0; i < numero; i++) {
      
      let idProd = arrayId[i];
      
      $.ajax({
        url: "consProd.php",
        type: "POST",
        datatype: "JSON",
        data: {
          idProd: idProd,
        },
        success: function (data) {
          console.log(idProd);
        },
      });
    }

  });


});
