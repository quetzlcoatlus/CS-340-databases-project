-- Assign a Qualification to a Crew Member, takes crewMemberID FK, qualificationID FK, and earnedDate: date
INSERT INTO CrewMemberQualifications (
    CrewMemberQualifications.crewMemberID,
    CrewMemberQualifications.qualificationID,
    CrewMemberQualifications.earnedDate
) VALUES (
    -- Concat into full name so it has to be separated. Didn't implement yet since we're using id from dropdown
    -- (SELECT crewMemberID FROM CrewMembers WHERE 
    --     CrewMembers.firstName = :crew_member_fname_from_dropdown AND
    --     CrewMembers.lastName = :crew_member_lname_from_dropdown
    -- ),
    :crew_member_id_from_dropdown,

    -- (SELECT qualificationID FROM Qualifications WHERE Qualifications.name = :qualification_name_from_dropdown),
    :qualification_id_from_dropdown,
    :earned_date_input
)