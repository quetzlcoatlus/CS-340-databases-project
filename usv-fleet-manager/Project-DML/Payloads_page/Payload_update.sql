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