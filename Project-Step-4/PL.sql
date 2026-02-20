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


-- Adding a new USV, procedure that takes a name, class, status, and mission title/id (can be unassigned)


-- Updating a USV, procedure that takes a name, class, status, and mission title/id (can be unassigned)


-- Delete a USV with given usvID


-- Get all Missions to populate the "Current Mission" dropdown


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


-- Add a new Mission, takes a title: str, location: str, and priorityLevel FK


-- Get all Priorities to populate the "Priority Level" dropdown



/*
================================================================================
Created by Alex
Get_All, Add, Update, and Populate_Dropdown procedures for Payloads Page.
================================================================================
*/
-- Get all Payloads and their installed USV Names for the List Payloads table.


-- Add a new Payload, takes a type: str, serialNumber: str, condition: dropdown_str, installedUSV FK, installationDate: date


-- Update an existing Payload


-- Get all USVs to populate the "Installed On" dropdown


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

