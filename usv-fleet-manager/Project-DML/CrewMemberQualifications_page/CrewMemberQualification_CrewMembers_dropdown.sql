-- Get all Crew Members to populate the "Crew Member" dropdown
SELECT 
    CrewMembers.crewMemberID, 
    CONCAT(CrewMembers.firstName, ' ', CrewMembers.lastName) AS crewMemberName
FROM CrewMembers
ORDER BY CrewMembers.crewMemberID;