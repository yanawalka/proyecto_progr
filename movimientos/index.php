<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="#">
    <title>CRUD</title>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <!-- CSS personalizado -->
    <!-- <link rel="stylesheet" href="../../src/crudsTable.css"> -->
    <link rel="stylesheet" href="index.css">
    <!-- navbar -->
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <!--datables CSS básico-->
    <link rel="stylesheet" type="text/css" href="../datatables/datatables.min.css" />
    <!--datables estilo bootstrap 4 CSS-->
    <link rel="stylesheet" type="text/css" href="../datatables/DataTables-1.10.18/css/dataTables.bootstrap4.min.css">
    <!-- Google Icon API -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>

<body>

<div id="backModal">
    <div class="drower">
        <div class="headerModal" >
            <h1 class="text-secondary mt-2"><u>Caja</u></h1>

            <h6 style="margin-top: 1%; color: gray">Recuerde que debe iniciar Caja para poder continuar</h6>
            <hr style="color: gray">
        </div>
        <div class="inputBox" style="margin-top: 3%; margin-buttom: 2%;">
            <span class="input-group-text" id="basic-addon1">Fecha y Hora:  </span>
            <input type="text" class="form-control" placeholder="Monto inicial" id="fechaHora" aria-label="Username" aria-describedby="basic-addon1">
        </div>

        <div class="inputBox"style="margin-top: 3%; margin-bottom: 2%;">
            <span class="input-group-text" id="basic-addon1">Cajero: </span>
            <input type="text" class="form-control" placeholder="Monto inicial" id="nombreCajero" aria-label="Cajero: GuilleBlandito@trololo.com" aria-describedby="basic-addon1">
        </div>
        <div class="inputBox">
            <span class="input-group-text" id="basic-addon1">Monto Inicial: </span>
            <input type="text" class="form-control" placeholder="Monto inicial" id="inputApertura" aria-label="Username" aria-describedby="basic-addon1">
        </div>
        <hr style="color: gray">
        <div class="footerModalDos">
            <div class="d-flex justify-content-end">
                <button id="subirCaja" class="btn btn-success">Actuaizar</button>
            </div>
        </div>
    </div>
</div>

<h1 class="text-secondary mt-3">Movimientos diarios</h1>

<div class="inputBox">
        <input type="text" class="form-control inputMovimiento" placeholder="Tipo de Movimiento" id="tipoMovimiento" aria-label="Tipo de Movimiento" aria-describedby="basic-addon1">
        <input type="text" class="form-control inputMovimiento" placeholder="Dinero de Movimiento" id="dineroMovimiento" aria-label="Dinero de Movimiento" aria-describedby="basic-addon1">
        <input type="text" class="form-control inputMovimiento" placeholder="Descripcion de Movimiento" id="descripcionMovimiento" aria-label="Descripcion de Movimiento" aria-describedby="basic-addon1">
        <button id="addMovimiento" class="btn btn-success">Añadir Movimiento</button>
    </div>

<div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
    <div class="p-2 flex-grow-1 bd-highlight">
        <div class="row">
            <div class="col-lg-12">
                <div class="table-responsive">
                    <table id="tablaMovimientos"
                        class="table table-striped table-bordered table-condensed" style="width:100%">
                        <thead class="text-center">
                            <tr>
                                <th>Id</th>
                                <th>Tipo</th>
                                <th>Dinero</th>
                                <th>Descripcion</th>
                                <th style="width: 10px">Acciones</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>



<div class="inputBox">
    <div class="saldoBox">
        <span class="input-group-text" id="basic-addon1">Saldo: $</span>
        <input type="text" class="form-control inputSaldo" placeholder="Monto inicial" id="inputCierre" aria-label="Username" aria-describedby="basic-addon1">
    </div>
    <button id="cajaDetalle" class="btn btn-info">Arqueo cajas</button>
</div>


<div id="arqueoCaja">
    <div class="drowerArqueo">
        <div class="headerModal" >
            <div class="d-flex justify-content-between">
                <h3 class="tituloTicket">Arqueo de caja</h3>
                <button id="cerrarArqueo" class="btn btn-danger">X</button>
            </div>
        </div>
        <div class="tab-pane fade show active" id="tablaCajas" role="tabpanel" aria-labelledby="home-tab">
            <div class="p-2 flex-grow-1 bd-highlight">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="table-responsive">
                            <table id="tablaCaja"
                                class="table table-striped table-bordered table-condensed" style="width:100%">
                                <thead class="text-center">
                                    <tr>
                                        <th>Id</th>
                                        <th>Fecha</th>
                                        <th>Monto Inicial</th>
                                        <th>Cierre</th>
                                        <th>Saldo</th>
                                        <th>Ingreso</th>
                                        <th>Egreso</th>
                                        <th>Hora Cierre</th>
                                        <th>Empleado</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    </div>
</div>

    <!-- JavaScript Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous">
    </script>
    <!-- navbar Script -->
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>


    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous">
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous">
    </script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous">
    </script>
    <!-- jQuery, Popper.js, Bootstrap JS -->
    <script src="../jquery/jquery-3.3.1.min.js"></script>
    <script src="../popper/popper.min.js"></script>
    <script src="../bootstrap/js/bootstrap.min.js"></script>

    <!-- datatables JS -->
    <script type="text/javascript" src="../datatables/datatables.min.js"></script>

    <script type="text/javascript" src="main.js"></script>

</body>

</html>