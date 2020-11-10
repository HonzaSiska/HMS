-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 10, 2020 at 07:09 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `home_management_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `apartment`
--

CREATE TABLE `apartment` (
  `IdApartment` int(11) NOT NULL,
  `Unit` varchar(50) NOT NULL,
  `Street` varchar(50) NOT NULL,
  `City` varchar(50) NOT NULL,
  `Rooms` int(2) NOT NULL,
  `Description` varchar(200) NOT NULL,
  `IdUser` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `apartment`
--

INSERT INTO `apartment` (`IdApartment`, `Unit`, `Street`, `City`, `Rooms`, `Description`, `IdUser`) VALUES
(61, 'Byt 3', 'kratka 4', 'Bruntal', 12, 'retewtwtwrtwwewertwtw', 1),
(62, 'Byt 1', 'kratka 4', 'Bruntal', 4, 'hfddhdhdfhdfgh', 1);

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `IdPhoto` int(11) NOT NULL,
  `FileName` varchar(50) NOT NULL,
  `Description` varchar(100) NOT NULL,
  `IdApartment` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`IdPhoto`, `FileName`, `Description`, `IdApartment`) VALUES
(127, 'Honda.jpg', '', 61),
(128, 'Ja.jpg', '', 61),
(129, 'me_typing_crop.gif', '', 62),
(131, 'IMG_20181227_133619.jpg', '', 61),
(132, 'IMG_20181227_133641.jpg', '', 61),
(133, 'IMG_20181227_133817.jpg', '', 61),
(134, 'IMG_20181227_133619.jpg', '', 61),
(135, 'IMG_20181227_133629.jpg', '', 61),
(136, 'DSCN2735.JPG', '', 62),
(137, 'DSCN2737.JPG', '', 62),
(138, 'DSCN2738.JPG', '', 62),
(139, 'DSCN2739.JPG', '', 62),
(140, 'DSCN2743.JPG', '', 62),
(141, 'DSCN2750.JPG', '', 62),
(142, 'DSCN2767.JPG', '', 62),
(143, 'DSCN2877.JPG', '', 62);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `IdRole` int(10) NOT NULL,
  `Role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`IdRole`, `Role`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `TransId` int(45) NOT NULL,
  `Date` date NOT NULL,
  `IdUser` int(45) NOT NULL,
  `Description` varchar(15) NOT NULL,
  `Credit` float DEFAULT NULL,
  `Debit` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`TransId`, `Date`, `IdUser`, `Description`, `Credit`, `Debit`) VALUES
(1, '2020-10-04', 1, 'Billa', 1000, 0),
(2, '2020-10-05', 1, 'Kaufland', 0, 130),
(3, '2020-10-05', 1, '', 0, 200),
(4, '2020-10-05', 2, '', NULL, 200),
(5, '2020-10-08', 1, '', 1000, 0),
(7, '2020-10-06', 1, '', 23, 0),
(8, '2020-10-06', 2, '', 33, 0),
(10, '2020-10-06', 1, '', 0, 2),
(11, '2020-09-24', 1, '', 0, 1000),
(12, '2020-10-10', 1, '', 1000, 0),
(13, '2020-09-10', 1, '', 1000, 0),
(14, '2020-09-24', 1, '', 0, 23),
(15, '2020-09-24', 1, '', 0, 123),
(16, '2020-09-30', 1, '', 2000, 0),
(17, '2020-10-12', 1, '', 0, 65),
(18, '2020-10-13', 10, '', 0, 56),
(19, '2020-10-13', 1, '', 2000, 0),
(20, '2020-10-13', 1, '', 0, 456),
(24, '2020-08-28', 1, 'Vklad', 3000, 0),
(25, '2020-08-30', 2, 'Barca', 0, 677),
(26, '2019-12-06', 1, 'Vklad', 1000, 0),
(27, '2019-12-18', 1, 'Billa', 0, 140),
(28, '2018-12-05', 1, 'Vklad', 2000, 0),
(29, '2018-12-20', 1, 'Kaufland', 0, 345),
(30, '2018-12-07', 1, 'Barca', 3000, 0),
(31, '2017-12-22', 1, 'Billa', 0, 2400),
(32, '2020-10-17', 1, 'Vklad', 2000, 0),
(33, '2020-10-28', 1, 'Vklad', 1, 0),
(34, '2020-10-28', 1, 'Vklad', 1, 0),
(35, '2020-10-28', 1, 'Billa', 0, 1),
(36, '2020-11-09', 1, 'vklad', 3000, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `IdUser` int(20) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Last_name` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Phone` varchar(50) NOT NULL,
  `Role` varchar(50) NOT NULL,
  `Image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`IdUser`, `Name`, `Last_name`, `Email`, `Password`, `Phone`, `Role`, `Image`) VALUES
(1, 'Jan', 'Siska', 'siskajan@hotmail.com', '$2y$10$/L8uUdEa24jF8YSl6uvL3OSPaZXHO4l3/O8.dp37VwNn2mQg2rIEW', '776 052 602', 'admin', ''),
(2, 'Alena', 'Matejakova', 'aldajm@seznam.cz', '$2y$10$851ShHcAtBp.cxSdjZlPquUVV4QJrsC.DOUCjHaQo17I8YGLCr1hq', '60554016', 'user', ''),
(10, 'tadeas', 'tadeas', 'tadeas@tadeas.com', '$2y$10$rgVdKcaDSTqAG.ZRATSyTe8YS7xbty1unhMcC49n2X33U/HvHIRVq', '', 'admin', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `apartment`
--
ALTER TABLE `apartment`
  ADD PRIMARY KEY (`IdApartment`),
  ADD KEY `IdUser` (`IdUser`) USING BTREE;

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`IdPhoto`),
  ADD KEY `IdApartment` (`IdApartment`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`IdRole`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`TransId`),
  ADD KEY `IdUser` (`IdUser`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`IdUser`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `apartment`
--
ALTER TABLE `apartment`
  MODIFY `IdApartment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `IdPhoto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=145;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `IdRole` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `TransId` int(45) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `IdUser` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `apartment`
--
ALTER TABLE `apartment`
  ADD CONSTRAINT `apartment_ibfk_1` FOREIGN KEY (`IdUser`) REFERENCES `users` (`IdUser`);

--
-- Constraints for table `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`IdApartment`) REFERENCES `apartment` (`IdApartment`) ON DELETE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`IdUser`) REFERENCES `users` (`IdUser`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
