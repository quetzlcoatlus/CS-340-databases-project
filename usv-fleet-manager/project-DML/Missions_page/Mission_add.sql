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