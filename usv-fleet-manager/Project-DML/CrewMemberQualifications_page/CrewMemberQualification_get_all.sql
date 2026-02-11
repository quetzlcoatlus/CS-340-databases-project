-- Get all CrewQualifications with Crew Names and Qualification Names.
SELECT 
    CrewMemberQualifications.crewMemberQualificationID AS 'ID',
    CONCAT(CrewMembers.firstName, ' ', CrewMembers.lastName) AS 'CREW MEMBER',
    Qualifications.name AS 'QUALIFICATION',
    CrewMemberQualifications.earnedDate AS 'DATE EARNED'
FROM CrewMemberQualifications
JOIN CrewMembers ON CrewMemberQualifications.crewMemberID = CrewMembers.crewMemberID
JOIN Qualifications ON CrewMemberQualifications.qualificationID = Qualifications.qualificationID
ORDER BY CrewMemberQualifications.crewMemberQualificationID;