-- Get all Missions to populate the "Current Mission" dropdown
SELECT 
    Missions.missionID, 
    Missions.title
FROM Missions
ORDER BY Missions.missionID;