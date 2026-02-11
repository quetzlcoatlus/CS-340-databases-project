-- Get all Crew Members and their assigned USV Names for the List Crew table.
SELECT 
    CrewMembers.crewMemberID AS 'ID', 
    CrewMembers.firstName AS 'FIRST NAME', 
    CrewMembers.lastName AS 'LAST NAME', 
    CrewMembers.rank AS 'RANK', 
    IFNULL(USVs.name, 'Unassigned') AS 'ASSIGNED USV'
FROM CrewMembers
LEFT JOIN USVs ON CrewMembers.usvID = USVs.usvID
ORDER BY CrewMembers.crewMemberID;
