-- phpMyAdmin SQL Dump
-- version 5.2.3-1.el9.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 12, 2026 at 08:31 PM
-- Server version: 10.11.15-MariaDB-log
-- PHP Version: 8.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_lanea4`
--

-- --------------------------------------------------------

--
-- Table structure for table `CrewMemberQualifications`
--

CREATE TABLE `CrewMemberQualifications` (
  `crewMemberQualificationID` int(11) NOT NULL,
  `crewMemberID` int(11) NOT NULL,
  `qualificationID` int(11) NOT NULL,
  `earnedDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `CrewMembers`
--

CREATE TABLE `CrewMembers` (
  `crewMemberID` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `rank` varchar(10) NOT NULL,
  `usvID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Missions`
--

CREATE TABLE `Missions` (
  `missionID` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `priorityLevel` int(11) NOT NULL,
  `usvID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Payloads`
--

CREATE TABLE `Payloads` (
  `payloadID` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `serialNumber` varchar(50) NOT NULL,
  `condition` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Qualifications`
--

CREATE TABLE `Qualifications` (
  `qualificationID` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `USVPayloads`
--

CREATE TABLE `USVPayloads` (
  `usvPayloadID` int(11) NOT NULL,
  `usvID` int(11) NOT NULL,
  `payloadID` int(11) NOT NULL,
  `installationDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `USVs`
--

CREATE TABLE `USVs` (
  `usvID` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `class` varchar(50) NOT NULL,
  `status` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `CrewMemberQualifications`
--
ALTER TABLE `CrewMemberQualifications`
  ADD PRIMARY KEY (`crewMemberQualificationID`,`crewMemberID`,`qualificationID`),
  ADD UNIQUE KEY `crewQualificationID_UNIQUE` (`crewMemberQualificationID`),
  ADD KEY `fk_CrewMembers_has_Qualifications_Qualifications1_idx` (`qualificationID`),
  ADD KEY `fk_CrewMembers_has_Qualifications_CrewMembers1_idx` (`crewMemberID`);

--
-- Indexes for table `CrewMembers`
--
ALTER TABLE `CrewMembers`
  ADD PRIMARY KEY (`crewMemberID`),
  ADD UNIQUE KEY `crewID_UNIQUE` (`crewMemberID`),
  ADD KEY `fk_CrewMembers_USVs1_idx` (`usvID`);

--
-- Indexes for table `Missions`
--
ALTER TABLE `Missions`
  ADD PRIMARY KEY (`missionID`),
  ADD UNIQUE KEY `missionID_UNIQUE` (`missionID`),
  ADD KEY `fk_Missions_USVs_idx` (`usvID`);

--
-- Indexes for table `Payloads`
--
ALTER TABLE `Payloads`
  ADD PRIMARY KEY (`payloadID`),
  ADD UNIQUE KEY `payloadID_UNIQUE` (`payloadID`),
  ADD UNIQUE KEY `serialNumber_UNIQUE` (`serialNumber`);

--
-- Indexes for table `Qualifications`
--
ALTER TABLE `Qualifications`
  ADD PRIMARY KEY (`qualificationID`),
  ADD UNIQUE KEY `qualificationID_UNIQUE` (`qualificationID`);

--
-- Indexes for table `USVPayloads`
--
ALTER TABLE `USVPayloads`
  ADD PRIMARY KEY (`usvPayloadID`,`usvID`,`payloadID`),
  ADD UNIQUE KEY `usvPayloadID_UNIQUE` (`usvPayloadID`),
  ADD KEY `fk_USVs_has_Payloads_Payloads1_idx` (`payloadID`),
  ADD KEY `fk_USVs_has_Payloads_USVs1_idx` (`usvID`);

--
-- Indexes for table `USVs`
--
ALTER TABLE `USVs`
  ADD PRIMARY KEY (`usvID`),
  ADD UNIQUE KEY `usvID_UNIQUE` (`usvID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `CrewMemberQualifications`
--
ALTER TABLE `CrewMemberQualifications`
  MODIFY `crewMemberQualificationID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `CrewMembers`
--
ALTER TABLE `CrewMembers`
  MODIFY `crewMemberID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Missions`
--
ALTER TABLE `Missions`
  MODIFY `missionID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Payloads`
--
ALTER TABLE `Payloads`
  MODIFY `payloadID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Qualifications`
--
ALTER TABLE `Qualifications`
  MODIFY `qualificationID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `USVPayloads`
--
ALTER TABLE `USVPayloads`
  MODIFY `usvPayloadID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `USVs`
--
ALTER TABLE `USVs`
  MODIFY `usvID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `CrewMemberQualifications`
--
ALTER TABLE `CrewMemberQualifications`
  ADD CONSTRAINT `fk_CrewMembers_has_Qualifications_CrewMembers1` FOREIGN KEY (`crewMemberID`) REFERENCES `CrewMembers` (`crewMemberID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_CrewMembers_has_Qualifications_Qualifications1` FOREIGN KEY (`qualificationID`) REFERENCES `Qualifications` (`qualificationID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `CrewMembers`
--
ALTER TABLE `CrewMembers`
  ADD CONSTRAINT `fk_CrewMembers_USVs1` FOREIGN KEY (`usvID`) REFERENCES `USVs` (`usvID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Missions`
--
ALTER TABLE `Missions`
  ADD CONSTRAINT `fk_Missions_USVs` FOREIGN KEY (`usvID`) REFERENCES `USVs` (`usvID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `USVPayloads`
--
ALTER TABLE `USVPayloads`
  ADD CONSTRAINT `fk_USVs_has_Payloads_Payloads1` FOREIGN KEY (`payloadID`) REFERENCES `Payloads` (`payloadID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_USVs_has_Payloads_USVs1` FOREIGN KEY (`usvID`) REFERENCES `USVs` (`usvID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
