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