/*
================================================================================
Unmanned Surface Vessel (USV) Fleet Management System
Database for Web Application
PL/SQL Statements for Procedures and Views
================================================================================
*/

/*
================================================================================
Created by Alex
Get_All, Add, Update, Delete, and Populate_Dropdown procedures for USVs Page.
================================================================================
*/
-- Get all USVs and their assigned Mission Titles for the List USVs table. (Uses a JOIN)
DROP VIEW IF EXISTS v_usvs;
CREATE VIEW v_usvs AS
SELECT 
    USVs.usvID AS 'ID', 
    USVs.name AS 'NAME', 
    USVs.class AS 'CLASS', 
    USVs.status AS 'STATUS', 
    IFNULL(Missions.title, 'Unassigned') AS 'MISSION'
FROM USVs
LEFT JOIN Missions ON USVs.missionID = Missions.missionID
ORDER BY USVs.usvID;

-- Adding a new USV, procedure that takes a name, class, status, and mission title/id (can be unassigned)
DROP PROCEDURE IF EXISTS sp_create_usv;
DELIMITER //
CREATE PROCEDURE sp_create_usv(
    IN p_name varchar(50),
    IN p_class varchar(50),
    IN p_status varchar(25),
    IN p_missionID int(11)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Create error!' AS message;
    END;

    START TRANSACTION;

    INSERT INTO USVs (name, class, status, missionID) 
    VALUES (p_name, p_class, p_status, p_missionID);

    IF ROW_COUNT() > 0 THEN
        COMMIT;
        SELECT 'USV created' AS message;
    ELSE
        ROLLBACK;
        SELECT 'Nothing created' AS message;
    END IF;
END //
DELIMITER ;

-- Updating a USV, procedure that takes a name, class, status, and mission title/id (can be unassigned)
DROP PROCEDURE IF EXISTS sp_update_usv;
DELIMITER //
CREATE PROCEDURE sp_update_usv(
    IN p_usvID int(11),
    IN p_name varchar(50),
    IN p_class varchar(50),
    IN p_status varchar(25),
    IN p_missionID int(11)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Update error!' AS message;
    END;

    START TRANSACTION;

    UPDATE USVs SET
        name = p_name, 
        class = p_class, 
        status = p_status,
        missionID = p_missionID
    WHERE usvID = p_usvID;

    IF ROW_COUNT() >= 0 THEN
        COMMIT;
        SELECT 'USV updated' AS message;
    ELSE
        ROLLBACK;
        SELECT 'Nothing updated' AS message;
    END IF;
END //
DELIMITER ;

-- Delete a USV with given usvID
DROP PROCEDURE IF EXISTS sp_delete_usv;
DELIMITER //
CREATE PROCEDURE sp_delete_usv(IN p_usvID int(11))
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Delete error!' AS message;
    END;

    START TRANSACTION;

    DELETE FROM USVs
    WHERE usvID = p_usvID;

    IF ROW_COUNT() > 0 THEN
        COMMIT;
        SELECT 'USV deleted' AS message;
    ELSE
        ROLLBACK;
        SELECT 'Nothing deleted' AS message;
    END IF;
END //
DELIMITER ;

-- Get all Missions to populate the "Current Mission" dropdown
DROP VIEW IF EXISTS v_usv_missions_dropdown;
CREATE VIEW v_usv_missions_dropdown AS
SELECT 
    Missions.missionID, 
    Missions.title
FROM Missions
ORDER BY Missions.missionID;

/*
================================================================================
Created by Allie
Get_All, Add, Delete, and Populate_Dropdown procedures for CrewMembers Page.
================================================================================
*/
-- Get all Crew Members and their assigned USV Names for the List Crew table.
DROP VIEW IF EXISTS v_crew_members;
CREATE VIEW v_crew_members AS
SELECT 
    CrewMembers.crewMemberID AS 'ID', 
    CrewMembers.firstName AS 'FIRST NAME', 
    CrewMembers.lastName AS 'LAST NAME', 
    CrewMembers.rank AS 'RANK', 
    IFNULL(USVs.name, 'Unassigned') AS 'ASSIGNED USV'
FROM CrewMembers
LEFT JOIN USVs ON CrewMembers.usvID = USVs.usvID
ORDER BY CrewMembers.crewMemberID;

-- Add a new Crew Member, takes a first name: str, last name: str, rank: str and usvID FK (Can be NULL)

-- Citation for the following code:
-- Date: 02/18/2026
-- Adapted from Copilot
-- Source URL: https://m365.cloud.microsoft
-- If AI tools were used:
-- Prompted with skeleton asking how to handle NULL value for usvID

DROP PROCEDURE IF EXISTS sp_create_crew_member;
DELIMITER //
CREATE PROCEDURE sp_create_crew_member(
    IN firstName varchar(50),
    IN lastName varchar(50),
    IN rank varchar(10),
    IN usvID int(11)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Create error!' AS message;
    END;

    START TRANSACTION;

    INSERT INTO CrewMembers (
        CrewMembers.firstName, 
        CrewMembers.lastName, 
        CrewMembers.rank, 
        CrewMembers.usvID
    ) VALUES (
        firstName, 
        lastName, 
        rank, 
        -- (SELECT usvID FROM USVs WHERE USVs.name = :usv_name_from_dropdown)
        usvID -- can be NULL
    );

    IF ROW_COUNT() > 0 THEN
        COMMIT;
        SELECT 'Crew member created' AS message;
    ELSE
        ROLLBACK;
        SELECT 'Nothing created' AS message;
    END IF;
END //

DELIMITER ;

-- Delete a Crew Member, takes a crewMemberID

-- Citation for the following code:
-- Date: 02/18/2026
-- Adapted from
-- Copilot output for query10.sql from PL/SQL Assignment
-- Source URL: https://m365.cloud.microsoft
-- If AI tools were used: 
-- From original source: prompted with schema, skeleton and requirements and asked to generate tests

DROP PROCEDURE IF EXISTS sp_delete_crew_member;
DELIMITER //
CREATE PROCEDURE sp_delete_crew_member (
    IN crewMemberID int(11)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Delete error!' AS message;
    END;

    START TRANSACTION;

    DELETE FROM CrewMembers
    WHERE CrewMembers.crewMemberID = crewMemberID;

    -- Check if the DELETE was successful
    IF ROW_COUNT() > 0 THEN
        COMMIT;
        SELECT 'Crew member deleted' AS message;
    ELSE
        ROLLBACK;
        SELECT 'Nothing deleted' AS message;
    END IF;
END //

DELIMITER ;

-- Get all USVs to populate the "Assigned USV" dropdown
DROP VIEW IF EXISTS v_crew_members_usv_dropdown;
CREATE VIEW v_crew_members_usv_dropdown AS
SELECT 
    USVs.usvID, 
    USVs.name
FROM USVs
ORDER BY USVs.usvID;

/*
================================================================================
Created by Alex
Get_All, Add, and Populate_Dropdown procedures for Missions Page.
================================================================================
*/
-- Get all Missions for the List Missions table
DROP VIEW IF EXISTS v_missions;
CREATE VIEW v_missions AS
SELECT 
    Missions.missionID AS 'ID', 
    Missions.title AS 'TITLE', 
    Missions.location AS 'LOCATION', 
    Priorities.title AS 'PRIORITY'
FROM Missions
JOIN Priorities ON Missions.priorityLevel = Priorities.priorityLevel
ORDER BY Missions.missionID;

-- Add a new Mission, takes a title: str, location: str, and priorityLevel FK
DROP PROCEDURE IF EXISTS sp_create_mission;
DELIMITER //
CREATE PROCEDURE sp_create_mission(
    IN p_title varchar(100),
    IN p_location varchar(100),
    IN p_priorityLevel int(11)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Create error!' AS message;
    END;

    START TRANSACTION;

    INSERT INTO Missions (title, location, priorityLevel) 
    VALUES (p_title, p_location, p_priorityLevel);

    IF ROW_COUNT() > 0 THEN
        COMMIT;
        SELECT 'Mission created' AS message;
    ELSE
        ROLLBACK;
        SELECT 'Nothing created' AS message;
    END IF;
END //
DELIMITER ;

-- Get all Priorities to populate the "Priority Level" dropdown
DROP VIEW IF EXISTS v_mission_priorities_dropdown;
CREATE VIEW v_mission_priorities_dropdown AS
SELECT 
    Priorities.priorityLevel, 
    Priorities.title
FROM Priorities
ORDER BY Priorities.priorityLevel;


/*
================================================================================
Created by Alex
Get_All, Add, Update, and Populate_Dropdown procedures for Payloads Page.
================================================================================
*/
-- Get all Payloads and their installed USV Names for the List Payloads table.
DROP VIEW IF EXISTS v_payloads;
CREATE VIEW v_payloads AS
SELECT 
    Payloads.payloadID AS 'ID', 
    Payloads.type AS 'TYPE', 
    Payloads.serialNumber AS 'SERIAL', 
    Payloads.condition AS 'CONDITION',
    IFNULL(USVs.name, 'Storage') AS 'USV',
    IFNULL(Payloads.installationDate, '') AS 'DATE INSTALLED'
FROM Payloads
LEFT JOIN USVs ON Payloads.installedUSV = USVs.usvID
ORDER BY Payloads.payloadID;

-- Add a new Payload, takes a type: str, serialNumber: str, condition: dropdown_str, installedUSV FK, installationDate: date
DROP PROCEDURE IF EXISTS sp_create_payload;
DELIMITER //
CREATE PROCEDURE sp_create_payload(
    IN p_type varchar(50),
    IN p_serialNumber varchar(50),
    IN p_condition varchar(25),
    IN p_installedUSV int(11),
    IN p_installationDate date
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Create error!' AS message;
    END;

    START TRANSACTION;

    INSERT INTO Payloads (type, serialNumber, `condition`, installedUSV, installationDate) 
    VALUES (p_type, p_serialNumber, p_condition, p_installedUSV, p_installationDate);

    IF ROW_COUNT() > 0 THEN
        COMMIT;
        SELECT 'Payload created' AS message;
    ELSE
        ROLLBACK;
        SELECT 'Nothing created' AS message;
    END IF;
END //
DELIMITER ;

-- Update an existing Payload
DROP PROCEDURE IF EXISTS sp_update_payload;
DELIMITER //
CREATE PROCEDURE sp_update_payload(
    IN p_payloadID int(11),
    IN p_type varchar(50),
    IN p_serialNumber varchar(50),
    IN p_condition varchar(25),
    IN p_installedUSV int(11),
    IN p_installationDate date
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Update error!' AS message;
    END;

    START TRANSACTION;

    UPDATE Payloads SET
        type = p_type, 
        serialNumber = p_serialNumber, 
        `condition` = p_condition,
        installedUSV = p_installedUSV,
        installationDate = p_installationDate
    WHERE payloadID = p_payloadID;

    IF ROW_COUNT() >= 0 THEN
        COMMIT;
        SELECT 'Payload updated' AS message;
    ELSE
        ROLLBACK;
        SELECT 'Nothing updated' AS message;
    END IF;
END //
DELIMITER ;

-- Get all USVs to populate the "Installed On" dropdown
DROP VIEW IF EXISTS v_payload_usvs_dropdown;
CREATE VIEW v_payload_usvs_dropdown AS
SELECT 
    USVs.usvID, 
    USVs.name
FROM USVs
ORDER BY USVs.usvID;

/*
================================================================================
Created by Allie
Get_All, Add, and Delete procedures for Qualifications Page.
================================================================================
*/
-- Get all Qualifications for the List Qualifications table
DROP VIEW IF EXISTS v_qualifications;
CREATE VIEW v_qualifications AS
SELECT 
    Qualifications.qualificationID AS 'ID', 
    Qualifications.name AS 'QUALIFICATION NAME'
FROM Qualifications
ORDER BY Qualifications.qualificationID;

-- Add a new Qualification, takes a qualification_name: str
-- Adapted from create for CrewMembers
DROP PROCEDURE IF EXISTS sp_create_qualification;
DELIMITER //

CREATE PROCEDURE sp_create_qualification(
    IN qualificationName varchar(50)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Create error!' AS message;
    END;

    START TRANSACTION;

    -- Add a new Qualification, takes a qualification_name: str
    INSERT INTO Qualifications (
        Qualifications.name
    ) VALUES (
        qualificationName
    );

    IF ROW_COUNT() > 0 THEN
        COMMIT;
        SELECT 'Qualification created' AS message;
    ELSE
        ROLLBACK;
        SELECT 'Nothing created' AS message;
    END IF;
END //

DELIMITER ;

-- Delete a Qualification, takes ID
-- Adapted from CrewMember delete
DROP PROCEDURE IF EXISTS sp_delete_qualification;
DELIMITER //

CREATE PROCEDURE sp_delete_qualification (
    IN qualificationID int(11)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Delete error!' AS message;
    END;

    START TRANSACTION;

    DELETE FROM Qualifications
    WHERE Qualifications.qualificationID = qualificationID;

    -- Check if the DELETE was successful
    IF ROW_COUNT() > 0 THEN
        COMMIT;
        SELECT 'Qualification deleted' AS message;
    ELSE
        ROLLBACK;
        SELECT 'Nothing deleted' AS message;
    END IF;
END //

DELIMITER ;

/*
================================================================================
Created by Allie
Get_All, Add, Delete, and Populate_Dropdown procedures for CrewMemberQualifications Page.
================================================================================
*/
-- Get all CrewQualifications with Crew Names and Qualification Names.
DROP VIEW IF EXISTS v_crew_member_qualifications;
CREATE VIEW v_crew_member_qualifications AS
SELECT 
    CrewMemberQualifications.crewMemberQualificationID AS 'ID',
    CONCAT(CrewMembers.firstName, ' ', CrewMembers.lastName) AS 'CREW MEMBER',
    Qualifications.name AS 'QUALIFICATION',
    CrewMemberQualifications.earnedDate AS 'DATE EARNED'
FROM CrewMemberQualifications
JOIN CrewMembers ON CrewMemberQualifications.crewMemberID = CrewMembers.crewMemberID
JOIN Qualifications ON CrewMemberQualifications.qualificationID = Qualifications.qualificationID
ORDER BY CrewMemberQualifications.crewMemberQualificationID;

-- Assign a Qualification to a Crew Member, takes crewMemberID FK, qualificationID FK, and earnedDate: date
-- Adapted from CrewMembers create
DROP PROCEDURE IF EXISTS sp_create_crew_member_qualification;
DELIMITER //
-- Add a new Crew Member, takes a 
-- crewMemberID: int, 
-- qualificationID: int, 
-- earnedDate: str YYYY-MM-DD
CREATE PROCEDURE sp_create_crew_member_qualification(
    IN crewMemberID int(11),
    IN qualificationID int(11),
    IN earnedDate date
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Create error!' AS message;
    END;

    START TRANSACTION;

    INSERT INTO CrewMemberQualifications (
        CrewMemberQualifications.crewMemberID,
        CrewMemberQualifications.qualificationID,
        CrewMemberQualifications.earnedDate
    ) VALUES (
        crewMemberID,
        -- (SELECT qualificationID FROM Qualifications WHERE Qualifications.name = :qualification_name_from_dropdown),
        qualificationID,
        earnedDate
    );

    IF ROW_COUNT() > 0 THEN
        COMMIT;
        SELECT 'Crew member qualification created' AS message;
    ELSE
        ROLLBACK;
        SELECT 'Nothing created' AS message;
    END IF;
END //

DELIMITER ;

-- Remove a Qualification from a Crew Member
-- Adapted from CrewMembers delete
DROP PROCEDURE IF EXISTS sp_delete_crew_member_qualification;
DELIMITER //
-- Takes a crewMemberQualificationID
CREATE PROCEDURE sp_delete_crew_member_qualification (
    IN crewMemberQualificationID int(11)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Delete error!' AS message;
    END;

    START TRANSACTION;

    DELETE FROM CrewMemberQualifications
    WHERE CrewMemberQualifications.crewMemberQualificationID = crewMemberQualificationID;

    -- Check if the DELETE was successful
    IF ROW_COUNT() > 0 THEN
        COMMIT;
        SELECT 'Crew member qualification deleted' AS message;
    ELSE
        ROLLBACK;
        SELECT 'Nothing deleted' AS message;
    END IF;
END //

DELIMITER ;

-- Get all Crew Members to populate the "Crew Member" dropdown
DROP VIEW IF EXISTS v_crew_member_qualifications_crew_member_dropdown;
CREATE VIEW v_crew_member_qualifications_crew_member_dropdown AS
SELECT 
    CrewMembers.crewMemberID, 
    CONCAT(CrewMembers.firstName, ' ', CrewMembers.lastName) AS crewMemberName
FROM CrewMembers
ORDER BY CrewMembers.crewMemberID;

-- Get all Qualifications to populate the "Qualification" dropdown
DROP VIEW IF EXISTS v_crew_member_qualifications_qualification_dropdown;
CREATE VIEW v_crew_member_qualifications_qualification_dropdown AS
SELECT 
    Qualifications.qualificationID,
    Qualifications.name
FROM Qualifications
ORDER BY Qualifications.qualificationID;

/*
================================================================================
Created by Alex
Get_All procedure for Priorities Page.
================================================================================
*/
-- Get all Priorities for display
DROP VIEW IF EXISTS v_priorities;
CREATE VIEW v_priorities AS
SELECT 
    Priorities.priorityLevel AS 'ID', 
    Priorities.title AS 'TITLE'
FROM Priorities
ORDER BY Priorities.priorityLevel;
