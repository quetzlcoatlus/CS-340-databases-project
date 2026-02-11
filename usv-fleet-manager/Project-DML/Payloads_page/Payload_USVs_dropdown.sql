-- Get all USVs to populate the "Installed On" dropdown
SELECT 
    USVs.usvID, 
    USVs.name
FROM USVs
ORDER BY USVs.usvID;