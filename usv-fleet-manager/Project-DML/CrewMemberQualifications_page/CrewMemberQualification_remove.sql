-- Remove a Qualification from a Crew Member
DELETE FROM CrewMemberQualifications
WHERE CrewMemberQualifications.crewMemberQualificationID = :crew_member_qualification_id_selected;