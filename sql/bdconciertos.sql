-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-05-2026 a las 14:49:29
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
(1, 'concierto1Estado', '2026-05-31 09:55:53.000000', 'concierto1Nombre', 5, 1),
(2, 'PAKOOOO', '2026-06-10 12:41:51.000000', 'afsadf', 6, 1);

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
(2, 1, '2026-05-25 10:56:05.000000', 2, 1),
(3, 1, '2026-05-25 11:49:20.000000', 2, 1);

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
(2, 5, 'otra', 8, 1);

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
-- Indices de la tabla `tipo_entrada`
--
ALTER TABLE `tipo_entrada`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKthxieu23jwdecak321lcyib78` (`concierto_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actuacion`
--
ALTER TABLE `actuacion`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `concierto`
--
ALTER TABLE `concierto`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `entrada`
--
ALTER TABLE `entrada`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipo_entrada`
--
ALTER TABLE `tipo_entrada`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actuacion`
--
ALTER TABLE `actuacion`
  ADD CONSTRAINT `FK1kivq4qgosrjhcw6o9sxp30f0` FOREIGN KEY (`concierto_id`) REFERENCES `concierto` (`id`);

--
-- Filtros para la tabla `entrada`
--
ALTER TABLE `entrada`
  ADD CONSTRAINT `FKanqpsesmkjdx303yh5pvy4gdh` FOREIGN KEY (`tipo_entrada_id`) REFERENCES `tipo_entrada` (`id`);

--
-- Filtros para la tabla `tipo_entrada`
--
ALTER TABLE `tipo_entrada`
  ADD CONSTRAINT `FKthxieu23jwdecak321lcyib78` FOREIGN KEY (`concierto_id`) REFERENCES `concierto` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
