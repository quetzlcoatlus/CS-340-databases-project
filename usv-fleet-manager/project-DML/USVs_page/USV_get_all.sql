-- Gets all USVs and their assigned Mission Titles for the USV table
SELECT 
    USVs.usvID AS 'ID', 
    USVs.name AS 'NAME', 
    USVs.class AS 'CLASS', 
    USVs.status AS 'STATUS', 
    IFNULL(Missions.title, 'Unassigned') AS 'MISSION'
FROM USVs
LEFT JOIN Missions ON USVs.missionID = Missions.missionID
ORDER BY USVs.usvID;