-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-10-2021 a las 00:59:32
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `avenida`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cajas`
--

CREATE TABLE `cajas` (
  `cjid` int(11) NOT NULL,
  `cjfechahora` timestamp NOT NULL DEFAULT current_timestamp(),
  `cjmontoincial` double NOT NULL,
  `cjcierre` tinyint(1) NOT NULL,
  `cjsaldo` double NOT NULL,
  `cjtoting` double NOT NULL,
  `cjtotegr` double NOT NULL,
  `cjfechahoracierre` date NOT NULL,
  `empid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cajas`
--

INSERT INTO `cajas` (`cjid`, `cjfechahora`, `cjmontoincial`, `cjcierre`, `cjsaldo`, `cjtoting`, `cjtotegr`, `cjfechahoracierre`, `empid`) VALUES
(1, '2021-10-26 15:28:00', 0, 1, 1, 1, 1, '2021-10-27', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `clid` int(11) NOT NULL,
  `clnom` varchar(50) NOT NULL,
  `clemail` varchar(50) NOT NULL,
  `cldire` varchar(60) NOT NULL,
  `cltele` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`clid`, `clnom`, `clemail`, `cldire`, `cltele`) VALUES
(1, 'Guille', 'guillito@gmail.com', 'Sin cliente 333', '33333333'),
(2, 'Ana', 'anitabana@gmail.com', 'Los Laureles 414', '2222222222222'),
(3, 'Niko', 'niquito@gmail.com', 'Cerro', '56666666666'),
(4, 'Mati', 'matisuli@gmail.com', 'Embaracion', '444444');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallescompras`
--

CREATE TABLE `detallescompras` (
  `dcorden` int(11) NOT NULL,
  `fcid` int(11) NOT NULL,
  `proid` int(11) NOT NULL,
  `dccantidad` int(11) NOT NULL,
  `dcpreciounitario` double NOT NULL,
  `dcpreciototal` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallesventas`
--

CREATE TABLE `detallesventas` (
  `dvorden` int(11) NOT NULL,
  `fvid` int(11) NOT NULL,
  `proid` int(11) NOT NULL,
  `dvcantidad` int(11) NOT NULL,
  `dvpreciounitario` double NOT NULL,
  `dcpreciototal` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `detallesventas`
--

INSERT INTO `detallesventas` (`dvorden`, `fvid`, `proid`, `dvcantidad`, `dvpreciounitario`, `dcpreciototal`) VALUES
(1, 58, 35, 1, 200, 200),
(1, 59, 35, 1, 200, 200),
(1, 60, 27, 3, 60, 180),
(2, 58, 27, 2, 60, 120),
(2, 59, 26, 1, 70, 70);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `empid` int(11) NOT NULL,
  `empnom` varchar(50) NOT NULL,
  `empemail` varchar(50) NOT NULL,
  `emptag` varchar(50) NOT NULL,
  `empkey` varchar(50) NOT NULL,
  `emprol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`empid`, `empnom`, `empemail`, `emptag`, `empkey`, `emprol`) VALUES
(1, 'Ro Guille', '3871234233', 'guille@gmail.com', 'Los Laureles 413', 1),
(2, 'Nico', '41234123', 'nico@gmail.com', 'nico 123', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas`
--

CREATE TABLE `empresas` (
  `emsid` int(11) NOT NULL,
  `emsnombre` varchar(50) NOT NULL,
  `emssocial` varchar(50) NOT NULL,
  `emsemail` varchar(50) NOT NULL,
  `emsdireccion` varchar(50) NOT NULL,
  `emstelefono` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturacompxobligaciones`
--

CREATE TABLE `facturacompxobligaciones` (
  `fcid` int(11) NOT NULL,
  `oblid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturascompras`
--

CREATE TABLE `facturascompras` (
  `fcid` int(11) NOT NULL,
  `provid` int(11) NOT NULL,
  `cjid` int(11) NOT NULL,
  `fcfechahora` timestamp NOT NULL DEFAULT current_timestamp(),
  `fctotal` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturasventas`
--

CREATE TABLE `facturasventas` (
  `fvid` int(11) NOT NULL,
  `clid` int(11) NOT NULL,
  `cjid` int(11) NOT NULL,
  `fvfechahora` timestamp NOT NULL DEFAULT current_timestamp(),
  `fvtotal` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `facturasventas`
--

INSERT INTO `facturasventas` (`fvid`, `clid`, `cjid`, `fvfechahora`, `fvtotal`) VALUES
(58, 1, 1, '2021-10-26 15:12:00', 320),
(59, 1, 1, '2021-10-26 15:12:00', 270),
(60, 1, 1, '2021-10-26 15:12:00', 180);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcas`
--

CREATE TABLE `marcas` (
  `maid` int(11) NOT NULL,
  `manom` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `marcas`
--

INSERT INTO `marcas` (`maid`, `manom`) VALUES
(1, 'Arcor'),
(4, 'Arcosito'),
(6, 'Gabi'),
(9, 'bersito');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientos`
--

CREATE TABLE `movimientos` (
  `movid` int(11) NOT NULL,
  `movtipo` int(11) NOT NULL,
  `movdinero` double NOT NULL,
  `movdesc` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `movimientos`
--

INSERT INTO `movimientos` (`movid`, `movtipo`, `movdinero`, `movdesc`) VALUES
(1, 1, 200, 'Algo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientosxcajas`
--

CREATE TABLE `movimientosxcajas` (
  `cjid` int(11) NOT NULL,
  `cjfechahora` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `movid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obligaciones`
--

CREATE TABLE `obligaciones` (
  `oblid` int(11) NOT NULL,
  `emsid` int(11) NOT NULL,
  `oblmonto` int(11) NOT NULL,
  `oblfechainicio` timestamp NOT NULL DEFAULT current_timestamp(),
  `oblfechavencimiento` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `proid` int(11) NOT NULL,
  `procodigo` varchar(50) NOT NULL,
  `pronombre` varchar(50) NOT NULL,
  `maid` int(11) NOT NULL,
  `prostockactual` int(11) NOT NULL,
  `proprecio` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`proid`, `procodigo`, `pronombre`, `maid`, `prostockactual`, `proprecio`) VALUES
(26, '23234444', 'Arrozito', 1, 122, 70),
(27, '23236666', 'Galletita', 1, 37, 60),
(35, '43256345', 'Papita', 1, 49, 200);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productosxproveedores`
--

CREATE TABLE `productosxproveedores` (
  `proid` int(11) NOT NULL,
  `provid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `provid` int(11) NOT NULL,
  `provnom` varchar(50) NOT NULL,
  `provemail` varchar(50) NOT NULL,
  `provdire` varchar(50) NOT NULL,
  `provtele` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `rolid` int(11) NOT NULL,
  `rolnom` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`rolid`, `rolnom`) VALUES
(1, 'Administrador'),
(2, 'Usuario');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cajas`
--
ALTER TABLE `cajas`
  ADD PRIMARY KEY (`cjid`,`cjfechahora`),
  ADD KEY `idEmpleado` (`empid`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`clid`);

--
-- Indices de la tabla `detallescompras`
--
ALTER TABLE `detallescompras`
  ADD PRIMARY KEY (`dcorden`),
  ADD KEY `idFacturaCompras` (`fcid`),
  ADD KEY `idProductos` (`proid`);

--
-- Indices de la tabla `detallesventas`
--
ALTER TABLE `detallesventas`
  ADD PRIMARY KEY (`dvorden`,`fvid`),
  ADD KEY `idFacturaVentas` (`fvid`),
  ADD KEY `idProductos` (`proid`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`empid`),
  ADD KEY `fk_roles` (`emprol`);

--
-- Indices de la tabla `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`emsid`);

--
-- Indices de la tabla `facturacompxobligaciones`
--
ALTER TABLE `facturacompxobligaciones`
  ADD KEY `idFacturaCompras` (`fcid`),
  ADD KEY `idObligaciones` (`oblid`);

--
-- Indices de la tabla `facturascompras`
--
ALTER TABLE `facturascompras`
  ADD PRIMARY KEY (`fcid`),
  ADD KEY `idProveedor` (`provid`),
  ADD KEY `fk_cajascompras` (`cjid`);

--
-- Indices de la tabla `facturasventas`
--
ALTER TABLE `facturasventas`
  ADD PRIMARY KEY (`fvid`),
  ADD KEY `idUsuario` (`clid`),
  ADD KEY `fk_cajasventas` (`cjid`);

--
-- Indices de la tabla `marcas`
--
ALTER TABLE `marcas`
  ADD PRIMARY KEY (`maid`);

--
-- Indices de la tabla `movimientos`
--
ALTER TABLE `movimientos`
  ADD PRIMARY KEY (`movid`);

--
-- Indices de la tabla `movimientosxcajas`
--
ALTER TABLE `movimientosxcajas`
  ADD UNIQUE KEY `idMovimientos` (`movid`),
  ADD KEY `movimientosXcajas_ibfk_3` (`cjid`);

--
-- Indices de la tabla `obligaciones`
--
ALTER TABLE `obligaciones`
  ADD PRIMARY KEY (`oblid`),
  ADD KEY `fk_empresas` (`emsid`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`proid`),
  ADD KEY `idMarca` (`maid`);

--
-- Indices de la tabla `productosxproveedores`
--
ALTER TABLE `productosxproveedores`
  ADD KEY `idProductos` (`proid`),
  ADD KEY `idProveedores` (`provid`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`provid`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`rolid`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cajas`
--
ALTER TABLE `cajas`
  MODIFY `cjid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `clid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `detallescompras`
--
ALTER TABLE `detallescompras`
  MODIFY `dcorden` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `empid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `empresas`
--
ALTER TABLE `empresas`
  MODIFY `emsid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `facturascompras`
--
ALTER TABLE `facturascompras`
  MODIFY `fcid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `facturasventas`
--
ALTER TABLE `facturasventas`
  MODIFY `fvid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `marcas`
--
ALTER TABLE `marcas`
  MODIFY `maid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `movimientos`
--
ALTER TABLE `movimientos`
  MODIFY `movid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `obligaciones`
--
ALTER TABLE `obligaciones`
  MODIFY `oblid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `proid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `provid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `rolid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cajas`
--
ALTER TABLE `cajas`
  ADD CONSTRAINT `cajas_ibfk_1` FOREIGN KEY (`empid`) REFERENCES `empleados` (`empid`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `detallescompras`
--
ALTER TABLE `detallescompras`
  ADD CONSTRAINT `detallesCompras_ibfk_1` FOREIGN KEY (`fcid`) REFERENCES `facturascompras` (`fcid`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `detallesCompras_ibfk_2` FOREIGN KEY (`proid`) REFERENCES `productos` (`proid`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `detallesventas`
--
ALTER TABLE `detallesventas`
  ADD CONSTRAINT `detallesVentas_ibfk_1` FOREIGN KEY (`fvid`) REFERENCES `facturasventas` (`fvid`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `detallesVentas_ibfk_2` FOREIGN KEY (`proid`) REFERENCES `productos` (`proid`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD CONSTRAINT `fk_roles` FOREIGN KEY (`emprol`) REFERENCES `roles` (`rolid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `facturacompxobligaciones`
--
ALTER TABLE `facturacompxobligaciones`
  ADD CONSTRAINT `facturacompXobligaciones_ibfk_1` FOREIGN KEY (`fcid`) REFERENCES `facturascompras` (`fcid`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `facturacompXobligaciones_ibfk_2` FOREIGN KEY (`oblid`) REFERENCES `obligaciones` (`oblid`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `facturascompras`
--
ALTER TABLE `facturascompras`
  ADD CONSTRAINT `facturasCompras_ibfk_1` FOREIGN KEY (`provid`) REFERENCES `proveedores` (`provid`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_cajascompras` FOREIGN KEY (`cjid`) REFERENCES `cajas` (`cjid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `facturasventas`
--
ALTER TABLE `facturasventas`
  ADD CONSTRAINT `facturasVentas_ibfk_1` FOREIGN KEY (`clid`) REFERENCES `clientes` (`clid`),
  ADD CONSTRAINT `fk_cajasventas` FOREIGN KEY (`cjid`) REFERENCES `cajas` (`cjid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `movimientosxcajas`
--
ALTER TABLE `movimientosxcajas`
  ADD CONSTRAINT `movimientosXcajas_ibfk_2` FOREIGN KEY (`movid`) REFERENCES `movimientos` (`movid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `movimientosXcajas_ibfk_3` FOREIGN KEY (`cjid`) REFERENCES `cajas` (`cjid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `obligaciones`
--
ALTER TABLE `obligaciones`
  ADD CONSTRAINT `fk_empresas` FOREIGN KEY (`emsid`) REFERENCES `empresas` (`emsid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`maid`) REFERENCES `marcas` (`maid`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `productosxproveedores`
--
ALTER TABLE `productosxproveedores`
  ADD CONSTRAINT `productosXproveedores_ibfk_1` FOREIGN KEY (`proid`) REFERENCES `productos` (`proid`),
  ADD CONSTRAINT `productosXproveedores_ibfk_2` FOREIGN KEY (`provid`) REFERENCES `proveedores` (`provid`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
