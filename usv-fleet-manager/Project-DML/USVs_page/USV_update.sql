-- Updating a USV, query that takes a name, class, status, and mission title/id (can be unassigned)
UPDATE USVs SET
    USVs.name = :name_input, 
    USVs.class = :class_input, 
    USVs.status = :status_from_dropdown,
    USVs.missionID = (SELECT missionID FROM Missions WHERE Missions.title = :mission_title_from_dropdown)
    -- Might be missionID returned from dropdown. In that case, replace line above with:
    -- :mission_id_from_dropdown
WHERE USVs.usvID = :usv_id_selected;