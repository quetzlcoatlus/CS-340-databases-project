-- Get all USVs to populate the "Assigned USV" dropdown
SELECT 
    USVs.usvID, 
    USVs.name
FROM USVs
ORDER BY USVs.usvID;