-- Delete a Crew Member, takes a crewMemberID
DELETE FROM CrewMembers
WHERE CrewMembers.crewMemberID = :crew_member_id_selected;