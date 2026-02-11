/*
================================================================================
Get_All, Add, Update, Delete, and Populate_Dropdown queries for USVs Page.
================================================================================
*/
-- Get all USVs and their assigned Mission Titles for the List USVs table. (Uses a JOIN)
SELECT 
    USVs.usvID AS 'ID', 
    USVs.name AS 'NAME', 
    USVs.class AS 'CLASS', 
    USVs.status AS 'STATUS', 
    IFNULL(Missions.title, 'Unassigned') AS 'MISSION'
FROM USVs
LEFT JOIN Missions ON USVs.missionID = Missions.missionID
ORDER BY USVs.usvID;

-- Adding a new USV, query that takes a name, class, status, and mission title/id (can be unassigned)
INSERT INTO USVs (
    USVs.name, 
    USVs.class, 
    USVs.status, 
    USVs.missionID
) VALUES (
    :name_input, 
    :class_input, 
    :status_from_dropdown, 
    -- (SELECT missionID FROM Missions WHERE Missions.title = :mission_title_from_dropdown)
    :mission_id_from_dropdown
);

-- Updating a USV, query that takes a name, class, status, and mission title/id (can be unassigned)
UPDATE USVs SET
    USVs.name = :name_input, 
    USVs.class = :class_input, 
    USVs.status = :status_from_dropdown,
    -- USVs.missionID = (SELECT missionID FROM Missions WHERE Missions.title = :mission_title_from_dropdown)
    USVs.missionID = :mission_id_from_dropdown
WHERE USVs.usvID = :usv_id_selected;

-- Delete a USV with given usvID
DELETE FROM USVs
WHERE USVs.usvID = :usv_id_selected;

-- Get all Missions to populate the "Current Mission" dropdown
SELECT 
    Missions.missionID, 
    Missions.title
FROM Missions
ORDER BY Missions.missionID;



/*
================================================================================
Get_All, Add, Delete, and Populate_Dropdown queries for CrewMembers Page.
================================================================================
*/
-- Get all Crew Members and their assigned USV Names for the List Crew table.
SELECT 
    CrewMembers.crewMemberID AS 'ID', 
    CrewMembers.firstName AS 'FIRST NAME', 
    CrewMembers.lastName AS 'LAST NAME', 
    CrewMembers.rank AS 'RANK', 
    IFNULL(USVs.name, 'Unassigned') AS 'ASSIGNED USV'
FROM CrewMembers
LEFT JOIN USVs ON CrewMembers.usvID = USVs.usvID
ORDER BY CrewMembers.crewMemberID;

-- Add a new Crew Member, takes a first name: str, last name: str, rank: str and usvID FK
INSERT INTO CrewMembers (
    CrewMembers.firstName, 
    CrewMembers.lastName, 
    CrewMembers.rank, 
    CrewMembers.usvID
) VALUES (
    :fname_input, 
    :lname_input, 
    :rank_input, 
    -- (SELECT usvID FROM USVs WHERE USVs.name = :usv_name_from_dropdown)
    :usv_name_from_dropdown
);

-- Delete a Crew Member, takes a crewMemberID
DELETE FROM CrewMembers
WHERE CrewMembers.crewMemberID = :crew_member_id_selected;

-- Get all USVs to populate the "Assigned USV" dropdown
SELECT 
    USVs.usvID, 
    USVs.name
FROM USVs
ORDER BY USVs.usvID;



/*
================================================================================
Get_All, Add, and Populate_Dropdown queries for Missions Page.
================================================================================
*/
-- Get all Missions for the List Missions table
SELECT 
    Missions.missionID AS 'ID', 
    Missions.title AS 'TITLE', 
    Missions.location AS 'LOCATION', 
    Priorities.title AS 'PRIORITY'
FROM Missions
JOIN Priorities ON Missions.priorityLevel = Priorities.priorityLevel
ORDER BY Missions.missionID;

-- Add a new Mission, takes a title: str, location: str, and priorityLevel FK
INSERT INTO Missions (
    Missions.title, 
    Missions.location, 
    Missions.priorityLevel
) VALUES (
    :title_input, 
    :location_input, 
    -- (SELECT priorityLevel FROM Priorities WHERE Priorities.title = :priority_level_title_from_dropdown)
    :priority_level_from_dropdown
);

-- Get all Priorities to populate the "Priority Level" dropdown
SELECT 
    Priorities.priorityLevel, 
    Priorities.title
FROM Priorities
ORDER BY Priorities.priorityLevel;



/*
================================================================================
Get_All, Add, Update, and Populate_Dropdown queries for Payloads Page.
================================================================================
*/
-- Get all Payloads and their installed USV Names for the List Payloads table.
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
INSERT INTO Payloads (
    Payloads.type, 
    Payloads.serialNumber, 
    Payloads.condition, -- Condition is a reserved word.. spent 30 minutes trying things until adding 'TableName.' worked
    Payloads.installedUSV,
    Payloads.installationDate
) VALUES (
    :type_input, 
    :serial_number_input, 
    :condition_from_dropdown, 
    -- (SELECT usvID FROM USVs WHERE USVs.name = :usv_name_from_dropdown)
    :usv_id_from_dropdown
    :installation_date_input
);

-- Update an existing Payload
UPDATE Payloads SET
    Payloads.type = :type_input, 
    Payloads.serialNumber = :serial_number_input, 
    Payloads.condition = :condition_from_dropdown,
    -- Payloads.installedUSV = (SELECT missionID FROM Missions WHERE Missions.title = :mission_title_from_dropdown),
    Payloads.installedUSV = :mission_id_from_dropdown
    -- Can be NULL
    
    Payloads.installationDate = :installation_date_input
    -- Can be NULL
WHERE Payloads.payloadID = :payload_id_selected;

-- Get all USVs to populate the "Installed On" dropdown
SELECT 
    USVs.usvID, 
    USVs.name
FROM USVs
ORDER BY USVs.usvID;



/*
================================================================================
Get_All, Add, and Delete queries for Payloads Page.
================================================================================
*/
-- Get all Qualifications for the List Qualifications table
SELECT 
    Qualifications.qualificationID AS 'ID', 
    Qualifications.name AS 'QUALIFICATION NAME'
FROM Qualifications
ORDER BY Qualifications.qualificationID;

-- Add a new Qualification, takes a qualification_name: str
INSERT INTO Qualifications (
    Qualifications.name
) VALUES (
    :qualification_name_input
);

-- Delete a Qualification
DELETE FROM Qualifications
WHERE Qualifications.qualificationID = :qualification_id_selected;



/*
================================================================================
Get_All, Add, Delete, and Populate_Dropdown queries for Payloads Page.
================================================================================
*/
-- Get all CrewQualifications with Crew Names and Qualification Names.
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
INSERT INTO CrewMemberQualifications (
    CrewMemberQualifications.crewMemberID,
    CrewMemberQualifications.qualificationID,
    CrewMemberQualifications.earnedDate
) VALUES (
    -- Concat into full name so it has to be separated. Didn't implement yet since we're using id from dropdown
    -- (SELECT crewMemberID FROM CrewMembers WHERE 
    --     CrewMembers.firstName = :crew_member_fname_from_dropdown AND
    --     CrewMembers.lastName = :crew_member_lname_from_dropdown
    -- ),
    :crew_member_id_from_dropdown,
    -- (SELECT qualificationID FROM Qualifications WHERE Qualifications.name = :qualification_name_from_dropdown),
    :qualification_id_from_dropdown,
    :earned_date_input
)

-- Remove a Qualification from a Crew Member
DELETE FROM CrewMemberQualifications
WHERE CrewMemberQualifications.crewMemberQualificationID = :crew_member_qualification_id_selected;

-- Get all Crew Members to populate the "Crew Member" dropdown
SELECT 
    CrewMembers.crewMemberID, 
    CONCAT(CrewMembers.firstName, ' ', CrewMembers.lastName) AS crewMemberName
FROM CrewMembers
ORDER BY CrewMembers.crewMemberID;

-- Get all Qualifications to populate the "Qualification" dropdown
SELECT 
    Qualifications.qualificationID,
    Qualifications.name
FROM Qualifications
ORDER BY Qualifications.qualificationID;



/*
================================================================================
Get_All query for Priorities Page.
================================================================================
*/
-- Get all Priorities for display
SELECT 
    Priorities.priorityLevel AS 'ID', 
    Priorities.title AS 'TITLE'
FROM Priorities
ORDER BY Priorities.priorityLevel;
