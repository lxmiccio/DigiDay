-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 20, 2016 at 10:04 PM
-- Server version: 10.1.10-MariaDB
-- PHP Version: 7.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `digiday`
--
CREATE DATABASE IF NOT EXISTS `digiday` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `digiday`;

-- --------------------------------------------------------

--
-- Table structure for table `argomento`
--

CREATE TABLE `argomento` (
  `IdArgomento` int(11) NOT NULL,
  `Ambito` varchar(50) NOT NULL,
  `Descrizione` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `argomento`
--

INSERT INTO `argomento` (`IdArgomento`, `Ambito`, `Descrizione`) VALUES
(1, '1', NULL),
(2, '2', NULL),
(3, '3', NULL),
(4, '4', NULL),
(5, '5', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `aula`
--

CREATE TABLE `aula` (
  `IdAula` varchar(4) NOT NULL,
  `Capienza` int(11) NOT NULL,
  `Caratteristiche` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `aula`
--

INSERT INTO `aula` (`IdAula`, `Capienza`, `Caratteristiche`) VALUES
('1', 1, NULL),
('2', 2, NULL),
('3', 3, NULL),
('4', 4, NULL),
('5', 5, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `materiale`
--

CREATE TABLE `materiale` (
  `IdMateriale` int(11) NOT NULL,
  `Nome` varchar(50) NOT NULL,
  `Descrizione` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `materiale`
--

INSERT INTO `materiale` (`IdMateriale`, `Nome`, `Descrizione`) VALUES
(1, '1', NULL),
(2, '2', NULL),
(3, '3', NULL),
(4, '4', NULL),
(5, '5', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `partecipa`
--

CREATE TABLE `partecipa` (
  `Recensione` text,
  `Valutazione` int(11) DEFAULT NULL,
  `MatricolaUtente` varchar(15) NOT NULL,
  `IdSessione` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `richiede`
--

CREATE TABLE `richiede` (
  `IdSessione` int(11) NOT NULL,
  `IdMateriale` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sessione`
--

CREATE TABLE `sessione` (
  `IdSessione` int(11) NOT NULL,
  `Titolo` varchar(50) NOT NULL,
  `DataInizio` datetime NOT NULL,
  `DataFine` datetime NOT NULL,
  `NumeroMassimo` int(11) NOT NULL,
  `Dettagli` text,
  `MatricolaCreatore` varchar(15) DEFAULT NULL,
  `IdAula` varchar(4) DEFAULT NULL,
  `IdArgomento` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `utente`
--

CREATE TABLE `utente` (
  `Matricola` varchar(15) NOT NULL,
  `Password` varchar(250) DEFAULT NULL,
  `Nome` varchar(25) DEFAULT NULL,
  `Cognome` varchar(25) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Ruolo` varchar(15) DEFAULT NULL,
  `DataNascita` date DEFAULT NULL,
  `Sesso` varchar(5) DEFAULT NULL,
  `Foto` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `utente`
--

INSERT INTO `utente` (`Matricola`, `Password`, `Nome`, `Cognome`, `Email`, `Ruolo`, `DataNascita`, `Sesso`, `Foto`) VALUES
('1', '1', '1', '1', '1', '1', '2016-01-01', '1', NULL),
('2', '2', '2', '2', '2', '2', '2016-01-01', '2', NULL),
('3', '3', '3', '3', '3', '3', '2016-01-01', '3', NULL),
('4', '4', '4', '4', '4', '4', '2016-01-01', '4', NULL),
('5', '5', '5', '5', '5', '5', '2016-01-01', '5', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `argomento`
--
ALTER TABLE `argomento`
  ADD PRIMARY KEY (`IdArgomento`);

--
-- Indexes for table `aula`
--
ALTER TABLE `aula`
  ADD PRIMARY KEY (`IdAula`);

--
-- Indexes for table `materiale`
--
ALTER TABLE `materiale`
  ADD PRIMARY KEY (`IdMateriale`);

--
-- Indexes for table `partecipa`
--
ALTER TABLE `partecipa`
  ADD PRIMARY KEY (`MatricolaUtente`,`IdSessione`),
  ADD KEY `Partecipa_IdSessione` (`IdSessione`);

--
-- Indexes for table `richiede`
--
ALTER TABLE `richiede`
  ADD PRIMARY KEY (`IdSessione`,`IdMateriale`),
  ADD KEY `Richiede_IdMateriale` (`IdMateriale`);

--
-- Indexes for table `sessione`
--
ALTER TABLE `sessione`
  ADD PRIMARY KEY (`IdSessione`),
  ADD KEY `Sessione_MatricolaCreatore` (`MatricolaCreatore`),
  ADD KEY `Sessione_IdAula` (`IdAula`),
  ADD KEY `Sessione_IdArgomento` (`IdArgomento`);

--
-- Indexes for table `utente`
--
ALTER TABLE `utente`
  ADD PRIMARY KEY (`Matricola`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `argomento`
--
ALTER TABLE `argomento`
  MODIFY `IdArgomento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `materiale`
--
ALTER TABLE `materiale`
  MODIFY `IdMateriale` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `sessione`
--
ALTER TABLE `sessione`
  MODIFY `IdSessione` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `partecipa`
--
ALTER TABLE `partecipa`
  ADD CONSTRAINT `Partecipa_IdSessione` FOREIGN KEY (`IdSessione`) REFERENCES `sessione` (`IdSessione`),
  ADD CONSTRAINT `Partecipa_MatricolaUtente` FOREIGN KEY (`MatricolaUtente`) REFERENCES `utente` (`Matricola`);

--
-- Constraints for table `richiede`
--
ALTER TABLE `richiede`
  ADD CONSTRAINT `Richiede_IdMateriale` FOREIGN KEY (`IdMateriale`) REFERENCES `materiale` (`IdMateriale`),
  ADD CONSTRAINT `Richiede_IdSessione` FOREIGN KEY (`IdSessione`) REFERENCES `sessione` (`IdSessione`);

--
-- Constraints for table `sessione`
--
ALTER TABLE `sessione`
  ADD CONSTRAINT `Sessione_IdArgomento` FOREIGN KEY (`IdArgomento`) REFERENCES `argomento` (`IdArgomento`),
  ADD CONSTRAINT `Sessione_IdAula` FOREIGN KEY (`IdAula`) REFERENCES `aula` (`IdAula`),
  ADD CONSTRAINT `Sessione_MatricolaCreatore` FOREIGN KEY (`MatricolaCreatore`) REFERENCES `utente` (`Matricola`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
