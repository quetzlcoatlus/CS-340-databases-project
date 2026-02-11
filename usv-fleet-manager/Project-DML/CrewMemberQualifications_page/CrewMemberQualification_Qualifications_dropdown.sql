-- Get all Qualifications to populate the "Qualification" dropdown
SELECT 
    Qualifications.qualificationID,
    Qualifications.name
FROM Qualifications
ORDER BY Qualifications.qualificationID;