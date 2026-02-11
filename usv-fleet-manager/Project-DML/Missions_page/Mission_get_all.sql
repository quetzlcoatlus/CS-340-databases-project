-- Get all Missions for the List Missions table
SELECT 
    Missions.missionID AS 'ID', 
    Missions.title AS 'TITLE', 
    Missions.location AS 'LOCATION', 
    Priorities.title AS 'PRIORITY'
FROM Missions
JOIN Priorities ON Missions.priorityLevel = Priorities.priorityLevel
ORDER BY Missions.missionID;