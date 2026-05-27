-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-05-2026 a las 13:52:43
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bdconciertos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actuacion`
--

CREATE TABLE `actuacion` (
  `id` bigint(20) NOT NULL,
  `artista_id` bigint(20) DEFAULT NULL,
  `concierto_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `actuacion`
--

INSERT INTO `actuacion` (`id`, `artista_id`, `concierto_id`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `billete`
--

CREATE TABLE `billete` (
  `id` bigint(20) NOT NULL,
  `fecha_compra` datetime(6) DEFAULT NULL,
  `usuario_id` bigint(20) DEFAULT NULL,
  `transporte_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `billete`
--

INSERT INTO `billete` (`id`, `fecha_compra`, `usuario_id`, `transporte_id`) VALUES
(10, '2026-05-27 11:42:33.000000', 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `concierto`
--

CREATE TABLE `concierto` (
  `id` bigint(20) NOT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `fecha` datetime(6) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `precio_base` double DEFAULT NULL,
  `recinto_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `concierto`
--

INSERT INTO `concierto` (`id`, `estado`, `fecha`, `nombre`, `precio_base`, `recinto_id`) VALUES
(1, 'PROGRAMADO', '2026-05-30 10:55:00.000000', 'concierto1Nombre', 5, 1),
(2, 'CANCELADO', '2026-06-10 12:41:00.000000', 'afsadf', 6, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrada`
--

CREATE TABLE `entrada` (
  `id` bigint(20) NOT NULL,
  `cantidad` bigint(20) DEFAULT NULL,
  `fecha_compra` datetime(6) DEFAULT NULL,
  `usuario_id` bigint(20) DEFAULT NULL,
  `tipo_entrada_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `entrada`
--

INSERT INTO `entrada` (`id`, `cantidad`, `fecha_compra`, `usuario_id`, `tipo_entrada_id`) VALUES
(8, 1, '2026-05-26 10:25:40.000000', 3, 1),
(9, 2, '2026-05-26 10:25:40.000000', 3, 2),
(10, 3, '2026-05-26 10:29:17.000000', 3, 2),
(11, 1, '2026-05-26 10:31:01.000000', 3, 1),
(12, 1, '2026-05-26 10:31:46.000000', 3, 1),
(13, 1, '2026-05-26 10:33:02.000000', 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lineapedido`
--

CREATE TABLE `lineapedido` (
  `id` bigint(20) NOT NULL,
  `cantidad` bigint(20) DEFAULT NULL,
  `pedido_id` bigint(20) DEFAULT NULL,
  `producto_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id` bigint(20) NOT NULL,
  `fecha` datetime(6) DEFAULT NULL,
  `usuario_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `stock` bigint(20) DEFAULT NULL,
  `concierto_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_entrada`
--

CREATE TABLE `tipo_entrada` (
  `id` bigint(20) NOT NULL,
  `cupo_maximo` int(11) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `concierto_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_entrada`
--

INSERT INTO `tipo_entrada` (`id`, `cupo_maximo`, `nombre`, `precio`, `concierto_id`) VALUES
(1, 4, 'tipoEntrada1', 7, 1),
(2, 5, 'otra', 8, 1),
(3, 5, 'CANCELADISIMO', 8, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transporte`
--

CREATE TABLE `transporte` (
  `id` bigint(20) NOT NULL,
  `hora_salida` datetime(6) DEFAULT NULL,
  `lugar_salida` varchar(255) DEFAULT NULL,
  `plazas` int(11) NOT NULL,
  `precio` double DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `concierto_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `transporte`
--

INSERT INTO `transporte` (`id`, `hora_salida`, `lugar_salida`, `plazas`, `precio`, `tipo`, `concierto_id`) VALUES
(1, '2026-05-29 11:25:00.000000', 'LugarDeSalida1', 10, 8, 'Autobus', 1),
(2, '2026-05-27 13:01:10.000000', 'Salida Pako', 14, 3.5, 'Tren', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actuacion`
--
ALTER TABLE `actuacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK1kivq4qgosrjhcw6o9sxp30f0` (`concierto_id`);

--
-- Indices de la tabla `billete`
--
ALTER TABLE `billete`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKfbfpyl4tjjuu1ue43bf0k0yka` (`transporte_id`);

--
-- Indices de la tabla `concierto`
--
ALTER TABLE `concierto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `entrada`
--
ALTER TABLE `entrada`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKanqpsesmkjdx303yh5pvy4gdh` (`tipo_entrada_id`);

--
-- Indices de la tabla `lineapedido`
--
ALTER TABLE `lineapedido`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKqgvv8xe5j3op547echchgu31g` (`pedido_id`),
  ADD KEY `FK930uj76crcr58q7k7v6s26wew` (`producto_id`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKpvga8s6hjwsruvhijjfifsvqc` (`concierto_id`);

--
-- Indices de la tabla `tipo_entrada`
--
ALTER TABLE `tipo_entrada`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKthxieu23jwdecak321lcyib78` (`concierto_id`);

--
-- Indices de la tabla `transporte`
--
ALTER TABLE `transporte`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKkfr001on6nwts18xnpyian2d3` (`concierto_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actuacion`
--
ALTER TABLE `actuacion`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `billete`
--
ALTER TABLE `billete`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `concierto`
--
ALTER TABLE `concierto`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `entrada`
--
ALTER TABLE `entrada`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `lineapedido`
--
ALTER TABLE `lineapedido`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_entrada`
--
ALTER TABLE `tipo_entrada`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `transporte`
--
ALTER TABLE `transporte`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actuacion`
--
ALTER TABLE `actuacion`
  ADD CONSTRAINT `FK1kivq4qgosrjhcw6o9sxp30f0` FOREIGN KEY (`concierto_id`) REFERENCES `concierto` (`id`);

--
-- Filtros para la tabla `billete`
--
ALTER TABLE `billete`
  ADD CONSTRAINT `FKfbfpyl4tjjuu1ue43bf0k0yka` FOREIGN KEY (`transporte_id`) REFERENCES `transporte` (`id`);

--
-- Filtros para la tabla `entrada`
--
ALTER TABLE `entrada`
  ADD CONSTRAINT `FKanqpsesmkjdx303yh5pvy4gdh` FOREIGN KEY (`tipo_entrada_id`) REFERENCES `tipo_entrada` (`id`);

--
-- Filtros para la tabla `lineapedido`
--
ALTER TABLE `lineapedido`
  ADD CONSTRAINT `FK930uj76crcr58q7k7v6s26wew` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`),
  ADD CONSTRAINT `FKqgvv8xe5j3op547echchgu31g` FOREIGN KEY (`pedido_id`) REFERENCES `pedido` (`id`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `FKpvga8s6hjwsruvhijjfifsvqc` FOREIGN KEY (`concierto_id`) REFERENCES `concierto` (`id`);

--
-- Filtros para la tabla `tipo_entrada`
--
ALTER TABLE `tipo_entrada`
  ADD CONSTRAINT `FKthxieu23jwdecak321lcyib78` FOREIGN KEY (`concierto_id`) REFERENCES `concierto` (`id`);

--
-- Filtros para la tabla `transporte`
--
ALTER TABLE `transporte`
  ADD CONSTRAINT `FKkfr001on6nwts18xnpyian2d3` FOREIGN KEY (`concierto_id`) REFERENCES `concierto` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
