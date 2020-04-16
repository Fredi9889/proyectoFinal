-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-03-2020 a las 23:10:53
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `eventos`
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
  `fecha` date NOT NULL DEFAULT current_timestamp(),
  `hora` time NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `actividad`
--

INSERT INTO `actividad` (`idAct`, `nombre`, `idTipo`, `lugar`, `fecha`, `hora`) VALUES
(1, 'Transformación digital de los profesionales', 3, 'Calle estrella polar, 3', '2020-03-31', '19:00:00'),
(2, 'Redes y estructuras transversales', 2, 'Calle estrella sirio, 4', '2020-04-07', '18:00:00'),
(3, 'Educación, tecnologías e innovación', 4, 'Calle estrella espiga, 10', '2020-04-24', '12:00:00'),
(4, 'Emprender a través de las redes sociales', 1, 'Calle estrella canopus', '2020-04-05', '09:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuerpoprofesor`
--

CREATE TABLE `cuerpoprofesor` (
  `idCuerpo` int(10) NOT NULL,
  `nombre` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `idAct` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `inscripcion`
--

INSERT INTO `inscripcion` (`dni`, `idAct`) VALUES
('11111111A', 2),
('22222222B', 3),
('33333333C', 1),
('44444444D', 1),
('55555555E', 2),
('55555555E', 3);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `profesor`
--

INSERT INTO `profesor` (`dni`, `contrasena`, `idCuerpo`, `nombre`, `apellidos`, `mail`, `colegio`) VALUES
('11111111A', 'uno', 1, 'Antonia', 'Lorenzo Vargas', 'antoLoreVargas@gmail.com', 'IES Antonia'),
('22222222B', 'dos', 2, 'Maria', 'Lopez Marinez', 'maLoMa@gmail.com', 'IES Mari'),
('33333333C', 'tres', 3, 'Alejandra', 'Fernandez Palomo', 'aleFerPalo@gmail.com', 'IES Alejandrino'),
('44444444D', 'cuatro', 4, 'Anselmo', 'Perez Gutierrez', 'anPeGuti@gmail.com', 'IES Antoñito'),
('55555555E', 'cinco', 5, 'Ana Maria', 'Ramirez Ramos', 'anaMaRaRa@gmail.com', 'IES Ana');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoactividad`
--

CREATE TABLE `tipoactividad` (
  `idTipo` int(10) NOT NULL,
  `nombre` varchar(15) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  MODIFY `idAct` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividad`
--
ALTER TABLE `actividad`
  ADD CONSTRAINT `actividad_ibfk_1` FOREIGN KEY (`idTipo`) REFERENCES `tipoactividad` (`idTipo`);

--
-- Filtros para la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  ADD CONSTRAINT `inscripcion_ibfk_1` FOREIGN KEY (`dni`) REFERENCES `profesor` (`dni`),
  ADD CONSTRAINT `inscripcion_ibfk_2` FOREIGN KEY (`idAct`) REFERENCES `actividad` (`idAct`);

--
-- Filtros para la tabla `profesor`
--
ALTER TABLE `profesor`
  ADD CONSTRAINT `profesor_ibfk_1` FOREIGN KEY (`idCuerpo`) REFERENCES `cuerpoprofesor` (`idCuerpo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
