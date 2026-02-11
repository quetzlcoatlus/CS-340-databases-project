-- Get all Qualifications for the List Qualifications table
SELECT 
    Qualifications.qualificationID AS 'ID', 
    Qualifications.name AS 'QUALIFICATION NAME'
FROM Qualifications
ORDER BY Qualifications.qualificationID;