-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: sql103.byetcluster.com
-- Tiempo de generación: 12-06-2020 a las 06:14:57
-- Versión del servidor: 5.6.47-87.0
-- Versión de PHP: 7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `epiz_25994339_eventos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividad`
--

CREATE TABLE `actividad` (
  `idAct` int(10) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `idTipo` int(10) NOT NULL,
  `lugar` varchar(25) NOT NULL,
  `fecha` varchar(10) NOT NULL,
  `hora` varchar(5) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `actividad`
--

INSERT INTO `actividad` (`idAct`, `nombre`, `idTipo`, `lugar`, `fecha`, `hora`) VALUES
(20, 'Internet en la educación', 4, 'Calle internet,  nº 2', '2020-06-15', '15:00'),
(21, 'Los hijos enseñan a sus padres', 2, 'Calle padres e hijos, nº5', '2020-06-18', '15:00'),
(22, 'Descubriendo mundos virtuales', 3, 'Calle virtual, nº 3', '2020-06-20', '11:00'),
(23, 'Hogar conectado a internet', 1, 'Calle satélite, nº12', '2020-06-10', '14:00'),
(24, 'El laberinto de internet', 4, 'Calle laberinto, nº80', '2020-06-22', '21:00'),
(25, 'Orientación para el alumnado', 3, 'Calle alumno, nº 34', '2020-06-29', '17:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuerpoprofesor`
--

CREATE TABLE `cuerpoprofesor` (
  `idCuerpo` int(10) NOT NULL,
  `nombre` varchar(15) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cuerpoprofesor`
--

INSERT INTO `cuerpoprofesor` (`idCuerpo`, `nombre`) VALUES
(1, 'infantil'),
(2, 'primaria'),
(3, 'E.S.O'),
(4, 'bachillerato'),
(5, 'fp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encargado`
--

CREATE TABLE `encargado` (
  `idEncargado` int(11) NOT NULL,
  `nombre` varchar(15) NOT NULL,
  `contrasena` varchar(15) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `encargado`
--

INSERT INTO `encargado` (`idEncargado`, `nombre`, `contrasena`) VALUES
(1, 'encargado1', 'encargado1'),
(2, 'encargada2', 'encargada2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripcion`
--

CREATE TABLE `inscripcion` (
  `dni` varchar(10) NOT NULL,
  `idAct` int(10) NOT NULL,
  `fecha` date NOT NULL,
  `confirmado` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `inscripcion`
--

INSERT INTO `inscripcion` (`dni`, `idAct`, `fecha`, `confirmado`) VALUES
('11111111A', 22, '2020-06-10', 0),
('11111111A', 24, '2020-06-12', 1),
('11111111A', 25, '2020-06-12', 1),
('22222222B', 21, '2020-06-09', 0),
('33333333C', 16, '2020-06-11', 1),
('33333333C', 20, '2020-06-02', 1),
('33333333C', 24, '2020-06-09', 1),
('44444444D', 21, '2020-06-01', 1),
('44444444D', 25, '2020-06-01', 1),
('55555555E', 20, '2020-06-01', 1),
('55555555E', 22, '2020-06-11', 0),
('55555555E', 23, '2020-06-13', 1),
('22222222B', 20, '2020-06-12', 1),
('66666666F', 21, '2020-06-14', 0),
('66666666F', 22, '2020-06-01', 0),
('66666666F', 25, '2020-06-02', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor`
--

CREATE TABLE `profesor` (
  `dni` varchar(10) NOT NULL,
  `contrasena` varchar(15) NOT NULL,
  `idCuerpo` int(10) NOT NULL,
  `nombre` varchar(15) NOT NULL,
  `apellidos` varchar(30) NOT NULL,
  `mail` varchar(30) NOT NULL,
  `colegio` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `profesor`
--

INSERT INTO `profesor` (`dni`, `contrasena`, `idCuerpo`, `nombre`, `apellidos`, `mail`, `colegio`) VALUES
('11111111A', 'antonia', 2, 'Antonia', 'Lorenzo Vargas', 'antoLoreVargas@gmail.com', 'IES Antonia'),
('22222222B', 'maria', 2, 'Maria', 'Lopez Marinez', 'maLoMa@gmail.com', 'IES Mari'),
('33333333C', 'alejandra', 3, 'Alejandra', 'Fernandez Palomo', 'aleFerPalo@gmail.com', 'IES Alejandrino'),
('44444444D', 'anselmo', 4, 'Anselmo', 'Perez Gutierrez', 'anPeGuti@gmail.com', 'IES Antoñito'),
('55555555E', 'ana maria', 5, 'Ana Maria', 'Ramirez Ramos', 'anaMaRaRa@gmail.com', 'IES Ana'),
('66666666F', 'arturo', 2, 'Arturo', 'Carrasco Gomez', 'arCarrGo@gmail.com', 'IES Mayorca');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoactividad`
--

CREATE TABLE `tipoactividad` (
  `idTipo` int(10) NOT NULL,
  `nombre` varchar(15) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipoactividad`
--

INSERT INTO `tipoactividad` (`idTipo`, `nombre`, `descripcion`) VALUES
(1, 'conferencia', 'Reunión de autoridades políticas o intelectuales para tratar un tema importante, en especial si se trata de representantes de países, organismos o entidades'),
(2, 'seminario', 'Conjunto de actividades que realizan en común profesores y alumnos, y que tiene la finalidad de encaminarlos a la práctica y la investigación de alguna disciplina'),
(3, 'mesa de trabajo', 'Es una instancia de coordinación, gestión y control de proyectos, donde se genera un diálogo entre las diferentes partes involucradas'),
(4, 'exposición', 'Acción de exponer una cosa para que sea vista, como obras de arte, artículos industriales, etc');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividad`
--
ALTER TABLE `actividad`
  ADD PRIMARY KEY (`idAct`),
  ADD KEY `idTipo` (`idTipo`),
  ADD KEY `idTipo_2` (`idTipo`),
  ADD KEY `idTipo_3` (`idTipo`),
  ADD KEY `idTipo_4` (`idTipo`);

--
-- Indices de la tabla `cuerpoprofesor`
--
ALTER TABLE `cuerpoprofesor`
  ADD PRIMARY KEY (`idCuerpo`);

--
-- Indices de la tabla `encargado`
--
ALTER TABLE `encargado`
  ADD PRIMARY KEY (`idEncargado`);

--
-- Indices de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  ADD UNIQUE KEY `dni_2` (`dni`,`idAct`),
  ADD KEY `dni` (`dni`),
  ADD KEY `idAct` (`idAct`);

--
-- Indices de la tabla `profesor`
--
ALTER TABLE `profesor`
  ADD PRIMARY KEY (`dni`),
  ADD KEY `idCuerpo` (`idCuerpo`);

--
-- Indices de la tabla `tipoactividad`
--
ALTER TABLE `tipoactividad`
  ADD PRIMARY KEY (`idTipo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividad`
--
ALTER TABLE `actividad`
  MODIFY `idAct` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `cuerpoprofesor`
--
ALTER TABLE `cuerpoprofesor`
  MODIFY `idCuerpo` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `encargado`
--
ALTER TABLE `encargado`
  MODIFY `idEncargado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipoactividad`
--
ALTER TABLE `tipoactividad`
  MODIFY `idTipo` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
