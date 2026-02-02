-- Project Step 2 Draft for CS340 Oregon State University
-- Group Members: Alexander Jones & Alexander Lane
-- DDL SQL Queries for USV Fleet Management Tool

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

CREATE TABLE USVs (
    usvID int(11) NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    class varchar(50) NOT NULL,
    status varchar(25) NOT NULL,
    PRIMARY KEY (usvID)
);

INSERT INTO USVs (name, class, status)
VALUES ('Sentinel', 'MASC', 'Deployed'),
('Striker', 'MASC', 'Training'),
('Wraith', 'GARC', 'Deployed'),
('Ghost', 'GARC', 'Deployed'),
('Raider', 'GARC', 'Maintenance');

CREATE TABLE CrewMembers (
    crewMemberID int(11) NOT NULL AUTO_INCREMENT,
    firstName varchar(50) NOT NULL,
    lastName varchar(50) NOT NULL,
    rank varchar(10) NOT NULL,
    usvID int(11) NOT NULL,
    PRIMARY KEY (crewMemberID),
    FOREIGN KEY (usvID) REFERENCES USVs(usvID)
);

INSERT INTO CrewMembers (firstname, lastname, rank, usvID)
VALUES ('Marcus', 'Thorne', 'O-3', (SELECT usvID FROM USVs WHERE name = 'Sentinel')),
('Sarah', 'Jenkins', 'RW1', (SELECT usvID FROM USVs WHERE name = 'Sentinel')),
('Felipe', 'Torres', 'ET2', (SELECT usvID FROM USVs WHERE name = 'Sentinel')),
('Davis', 'Miller', 'O-3', (SELECT usvID FROM USVs WHERE name = 'Striker')),
('James', 'Shaw', 'ET1', (SELECT usvID FROM USVs WHERE name = 'Striker')),
('Maya', 'Rodriguez', 'RW2', (SELECT usvID FROM USVs WHERE name = 'Striker')),
('Christopher', 'Evans', 'O-3', (SELECT usvID FROM USVs WHERE name = 'Wraith')),
('Liam', 'Foster', 'RW1', (SELECT usvID FROM USVs WHERE name = 'Wraith')),
('Samantha', 'Reed', 'RW2', (SELECT usvID FROM USVs WHERE name = 'Wraith')),
('Hannah', 'White', 'O-3', (SELECT usvID FROM USVs WHERE name = 'Ghost')),
('Caleb', 'Wright', 'ET1', (SELECT usvID FROM USVs WHERE name = 'Ghost')),
('Sophia', 'Morales', 'ET2', (SELECT usvID FROM USVs WHERE name = 'Ghost')),
('Michael', 'Sterling', 'O-3', (SELECT usvID FROM USVs WHERE name = 'Raider')),
('Aaron', 'Choi', 'RW1', (SELECT usvID FROM USVs WHERE name = 'Raider')),
('Ryan', 'Bennett', 'RW2', (SELECT usvID FROM USVs WHERE name = 'Raider'));

CREATE TABLE Missions (
    missionID int(11) NOT NULL AUTO_INCREMENT,
    title varchar(100) NOT NULL,
    location varchar(100) NOT NULL,
    priorityLevel int(11) NOT NULL,
    usvID int(11),
    PRIMARY KEY (missionID),
    FOREIGN KEY (usvID) REFERENCES USVs(usvID)
);

INSERT INTO Missions (title, location, priorityLevel, usvID)
VALUES ('Silent Aegis', 'South China Sea', 8, (SELECT usvID FROM USVs WHERE name = 'Sentinel')),
('Swift Talon', 'Red Sea', 6, (SELECT usvID FROM USVs WHERE name = 'Wraith')),
('Pacific Watch', 'Hawaiian Islands', 5, (SELECT usvID FROM USVs WHERE name = 'Ghost'));

CREATE TABLE Payloads (
    payloadID int(11) NOT NULL AUTO_INCREMENT,
    type varchar(50) NOT NULL,
    serialNumber varchar(50) NOT NULL,
    `condition` varchar(25) NOT NULL,
    installedUSV int(11),
    installationDate DATE,
    PRIMARY KEY (payloadID),
    FOREIGN KEY (installedUSV) REFERENCES USVs(usvID)
);

INSERT INTO Payloads (type, serialNumber, `condition`, installedUSV, installationDate)
VALUES ('EW', 'SA-EW-26-001', 'Operable', (SELECT usvID FROM USVs WHERE name = 'Sentinel'), '2025-05-31'),
('EW', 'SA-EW-26-002', 'Operable', (SELECT usvID FROM USVs WHERE name = 'Wraith'), '2026-01-12'),
('EW', 'SA-EW-26-003', 'Operable', (SELECT usvID FROM USVs WHERE name = 'Ghost'), '2025-12-20'),
('SONAR', 'DL2-SN-26-101', 'Operable', (SELECT usvID FROM USVs WHERE name = 'Sentinel'), '2025-05-31'),
('SONAR', 'DL2-SN-26-102', 'Inoperable', (SELECT usvID FROM USVs WHERE name = 'Striker'), '2025-10-15'),
('SONAR', 'DL2-SN-26-103', 'Operable', NULL, NULL),
('EO/IR', 'A7-HD-26-501', 'Inoperable', NULL, NULL),
('EO/IR', 'A7-HD-26-502', 'Operable', (SELECT usvID FROM USVs WHERE name = 'Sentinel'), '2025-05-31'),
('EO/IR', 'A7-HD-26-503', 'Operable', (SELECT usvID FROM USVs WHERE name = 'Striker'), '2025-10-15');

CREATE TABLE Qualifications (
    qualificationID int(11) NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    PRIMARY KEY (qualificationID)
);

INSERT INTO Qualifications (name)
VALUES ('USV Craft Master'),
('USV Supervisor'),
('USV Operator');

CREATE TABLE CrewMemberQualifications (
    crewMemberQualificationID int(11) NOT NULL AUTO_INCREMENT,
    crewMemberID int(11) NOT NULL,
    qualificationID int(11) NOT NULL,
    earnedDate date NOT NULL,
    PRIMARY KEY (crewMemberQualificationID),
    FOREIGN KEY (crewMemberID) REFERENCES CrewMembers(crewMemberID),
    FOREIGN KEY (qualificationID) REFERENCES Qualifications(qualificationID)
);

INSERT INTO CrewMemberQualifications (crewMemberID, qualificationID, earnedDate)
VALUES (
    (SELECT crewMemberID FROM CrewMembers WHERE firstname = 'Marcus' AND lastname = 'Thorne'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Craft Master'),
    '2024-10-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstname = 'Marcus' AND lastname = 'Thorne'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Supervisor'),
    '2024-06-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstname = 'Marcus' AND lastname = 'Thorne'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Operator'),
    '2024-03-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstname = 'Sarah' AND lastname = 'Jenkins'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Supervisor'),
    '2024-12-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstname = 'Sarah' AND lastname = 'Jenkins'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Operator'),
    '2024-08-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstname = 'Felipe' AND lastname = 'Torres'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Operator'),
    '2025-08-20'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstname = 'Davis' AND lastname = 'Miller'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Craft Master'),
    '2024-10-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstname = 'Davis' AND lastname = 'Miller'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Supervisor'),
    '2024-06-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstname = 'Davis' AND lastname = 'Miller'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Operator'),
    '2024-03-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstname = 'James' AND lastname = 'Shaw'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Supervisor'),
    '2024-12-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstname = 'James' AND lastname = 'Shaw'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Operator'),
    '2024-08-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstname = 'Christopher' AND lastname = 'Evans'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Craft Master'),
    '2024-10-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstname = 'Christopher' AND lastname = 'Evans'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Supervisor'),
    '2024-06-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstname = 'Christopher' AND lastname = 'Evans'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Operator'),
    '2024-03-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstname = 'Liam' AND lastname = 'Foster'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Supervisor'),
    '2024-12-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstname = 'Liam' AND lastname = 'Foster'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Operator'),
    '2024-08-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstname = 'Samantha' AND lastname = 'Reed'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Operator'),
    '2025-08-20'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstname = 'Hannah' AND lastname = 'White'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Craft Master'),
    '2024-10-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstname = 'Hannah' AND lastname = 'White'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Supervisor'),
    '2024-06-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstname = 'Hannah' AND lastname = 'White'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Operator'),
    '2024-03-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstname = 'Caleb' AND lastname = 'Wright'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Supervisor'),
    '2024-12-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstname = 'Caleb' AND lastname = 'Wright'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Operator'),
    '2024-08-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstname = 'Michael' AND lastname = 'Sterling'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Craft Master'),
    '2024-10-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstname = 'Michael' AND lastname = 'Sterling'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Supervisor'),
    '2024-06-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstname = 'Michael' AND lastname = 'Sterling'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Operator'),
    '2024-03-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstname = 'Aaron' AND lastname = 'Choi'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Supervisor'),
    '2024-12-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstname = 'Aaron' AND lastname = 'Choi'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Operator'),
    '2024-08-01'
);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;