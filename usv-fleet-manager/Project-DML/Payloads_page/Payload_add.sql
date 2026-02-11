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