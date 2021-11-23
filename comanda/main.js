$(document).ready(function () {
 
  reloadCard(1, "#valor1", "card1");
  reloadCard(2, "#valor2", "card3");
  reloadCard(3, "#valor3", "card5");


  function reloadCard(num, id, idN,  ){

  var opcion = num;
  $.ajax({
    url:"consProd.php",
    type:"POST",
    datatype:"JSON",
    data: {
      opcion:opcion
    },
    success: function (data) {
      result = JSON.parse(data);
      console.log(result[0].fvid)

      $(id).val(result[0].fvid);
      // $(id).before(tablaProductosComp=document.getElementById(idN).innerHTML +=`
      // <p class="card-text">Numero de orden: <input id="valor" value=" `+result[0].fvid+`"></p><h5 class="card-title">Productos a realizar</h5>`)
      for (let i = 0; i < result.length; i++) {
        tablaProductosComp=document.getElementById(idN).innerHTML +=`
        <p class="card-text">`+result[i].pronombre+`</p>`
      }
    }

  });
}

$(document).on("click", "#completar", function () { 
  fila = $(this).closest("#valor");
  valor = fila.find("#valor").val();
  console.log(valor)
  // var opcion = 4;
  // $.ajax({
  //   url:"consProd.php",
  //   type:"POST",
  //   datatype:"JSON",
  //   data: {
  //     opcion:opcion,

  //   },
  //   success: function (data) {
  //     result = JSON.parse(data);
  //     console.log(result)
  //     $(id).before(tablaProductosComp=document.getElementById(idN).innerHTML +=`
  //     <p class="card-text">Numero de orden: <input value=" `+result[0].fvid+`"></p><h5 class="card-title">Productos a realizar</h5>`)
  //     for (let i = 0; i < result.length; i++) {
  //       tablaProductosComp=document.getElementById(idN).innerHTML +=`
  //       <p class="card-text">`+result[i].pronombre+`</p>`
  //     }
  //   }
  // })
})

});