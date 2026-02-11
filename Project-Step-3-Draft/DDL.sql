-- DDL SQL Queries for USV Fleet Management Tool
-- Group Members: Alexander Jones & Alexander Lane


SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

/*
================================================================================
Create and Insert Statements for Priorities Table.
================================================================================
*/

CREATE OR REPLACE TABLE Priorities (
    priorityLevel int(11) NOT NULL AUTO_INCREMENT,
    title varchar(25) NOT NULL,
    PRIMARY KEY (priorityLevel)
);

INSERT INTO Priorities (title)
VALUES ('Low'),
('Medium'),
('High');

/*
================================================================================
Create and Insert Statements for Missions Table.
================================================================================
*/

CREATE OR REPLACE TABLE Missions (
    missionID int(11) NOT NULL AUTO_INCREMENT,
    title varchar(100) NOT NULL,
    location varchar(100) NOT NULL,
    priorityLevel int(11) NOT NULL,
    PRIMARY KEY (missionID),
    FOREIGN KEY (priorityLevel) REFERENCES Priorities(priorityLevel)
);

INSERT INTO Missions (title, location, priorityLevel)
VALUES ('Silent Aegis', 'South China Sea', (SELECT priorityLevel FROM Priorities WHERE title = 'High')),
('Swift Talon', 'Red Sea', (SELECT priorityLevel FROM Priorities WHERE title = 'Low')),
('Pacific Watch', 'Hawaiian Islands', (SELECT priorityLevel FROM Priorities WHERE title = 'Medium'));

/*
================================================================================
Create and Insert Statements for USVs Table.
================================================================================
*/

CREATE OR REPLACE TABLE USVs (
    usvID int(11) NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    class varchar(50) NOT NULL,
    status varchar(25) NOT NULL,
    missionID int(11),
    PRIMARY KEY (usvID),
    FOREIGN KEY (missionID) REFERENCES Missions(missionID) ON DELETE SET NULL
);

INSERT INTO USVs (name, class, status, missionID)
VALUES ('Sentinel', 'MASC', 'Deployed', (SELECT missionID FROM Missions WHERE title = 'Silent Aegis')),
('Striker', 'MASC', 'Training', NULL),
('Wraith', 'GARC', 'Deployed', (SELECT missionID FROM Missions WHERE title = 'Pacific Watch')),
('Ghost', 'GARC', 'Deployed', (SELECT missionID FROM Missions WHERE title = 'Pacific Watch')),
('Raider', 'GARC', 'Maintenance', NULL);

/*
================================================================================
Create and Insert Statements for CrewMembers Table.
================================================================================
*/

CREATE OR REPLACE TABLE CrewMembers (
    crewMemberID int(11) NOT NULL AUTO_INCREMENT,
    firstName varchar(50) NOT NULL,
    lastName varchar(50) NOT NULL,
    rank varchar(10) NOT NULL,
    usvID int(11),
    PRIMARY KEY (crewMemberID),
    FOREIGN KEY (usvID) REFERENCES USVs(usvID) ON DELETE SET NULL
);

INSERT INTO CrewMembers (firstName, lastName, rank, usvID)
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

/*
================================================================================
Create and Insert Statements for Payloads Table.
================================================================================
*/

CREATE OR REPLACE TABLE Payloads (
    payloadID int(11) NOT NULL AUTO_INCREMENT,
    type varchar(50) NOT NULL,
    serialNumber varchar(50) NOT NULL,
    `condition` varchar(25) NOT NULL,
    installedUSV int(11),
    installationDate DATE,
    PRIMARY KEY (payloadID),
    FOREIGN KEY (installedUSV) REFERENCES USVs(usvID) ON DELETE SET NULL
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

/*
================================================================================
Create and Insert Statements for Qualifications Table.
================================================================================
*/

CREATE OR REPLACE TABLE Qualifications (
    qualificationID int(11) NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    PRIMARY KEY (qualificationID)
);

INSERT INTO Qualifications (name)
VALUES ('USV Craft Master'),
('USV Supervisor'),
('USV Operator');

/*
================================================================================
Create and Insert Statements for CrewMemberQualifications Table.
================================================================================
*/

CREATE OR REPLACE TABLE CrewMemberQualifications (
    crewMemberQualificationID int(11) NOT NULL AUTO_INCREMENT,
    crewMemberID int(11),
    qualificationID int(11),
    earnedDate date NOT NULL,
    PRIMARY KEY (crewMemberQualificationID),
    FOREIGN KEY (crewMemberID) REFERENCES CrewMembers(crewMemberID) ON DELETE CASCADE,
    FOREIGN KEY (qualificationID) REFERENCES Qualifications(qualificationID) ON DELETE CASCADE
);

INSERT INTO CrewMemberQualifications (crewMemberID, qualificationID, earnedDate)
VALUES (
    (SELECT crewMemberID FROM CrewMembers WHERE firstName = 'Marcus' AND lastName = 'Thorne'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Craft Master'),
    '2024-10-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstName = 'Marcus' AND lastName = 'Thorne'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Supervisor'),
    '2024-06-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstName = 'Marcus' AND lastName = 'Thorne'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Operator'),
    '2024-03-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstName = 'Sarah' AND lastName = 'Jenkins'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Supervisor'),
    '2024-12-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstName = 'Sarah' AND lastName = 'Jenkins'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Operator'),
    '2024-08-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstName = 'Felipe' AND lastName = 'Torres'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Operator'),
    '2025-08-20'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstName = 'Davis' AND lastName = 'Miller'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Craft Master'),
    '2024-10-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstName = 'Davis' AND lastName = 'Miller'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Supervisor'),
    '2024-06-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstName = 'Davis' AND lastName = 'Miller'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Operator'),
    '2024-03-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstName = 'James' AND lastName = 'Shaw'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Supervisor'),
    '2024-12-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstName = 'James' AND lastName = 'Shaw'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Operator'),
    '2024-08-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstName = 'Christopher' AND lastName = 'Evans'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Craft Master'),
    '2024-10-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstName = 'Christopher' AND lastName = 'Evans'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Supervisor'),
    '2024-06-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstName = 'Christopher' AND lastName = 'Evans'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Operator'),
    '2024-03-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstName = 'Liam' AND lastName = 'Foster'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Supervisor'),
    '2024-12-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstName = 'Liam' AND lastName = 'Foster'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Operator'),
    '2024-08-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstName = 'Samantha' AND lastName = 'Reed'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Operator'),
    '2025-08-20'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstName = 'Hannah' AND lastName = 'White'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Craft Master'),
    '2024-10-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstName = 'Hannah' AND lastName = 'White'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Supervisor'),
    '2024-06-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstName = 'Hannah' AND lastName = 'White'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Operator'),
    '2024-03-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstName = 'Caleb' AND lastName = 'Wright'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Supervisor'),
    '2024-12-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstName = 'Caleb' AND lastName = 'Wright'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Operator'),
    '2024-08-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstName = 'Michael' AND lastName = 'Sterling'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Craft Master'),
    '2024-10-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstName = 'Michael' AND lastName = 'Sterling'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Supervisor'),
    '2024-06-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstName = 'Michael' AND lastName = 'Sterling'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Operator'),
    '2024-03-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstName = 'Aaron' AND lastName = 'Choi'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Supervisor'),
    '2024-12-01'
),(
    (SELECT crewMemberID FROM CrewMembers WHERE firstName = 'Aaron' AND lastName = 'Choi'), 
    (SELECT qualificationID FROM Qualifications WHERE name = 'USV Operator'),
    '2024-08-01'
);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;