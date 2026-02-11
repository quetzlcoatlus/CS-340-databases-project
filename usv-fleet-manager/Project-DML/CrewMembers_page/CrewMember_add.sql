-- Add a new Crew Member, takes a first name: str, last name: str, rank: str and usvID FK
INSERT INTO CrewMembers (
    CrewMembers.firstName, 
    CrewMembers.lastName, 
    CrewMembers.rank, 
    CrewMembers.usvID
) VALUES (
    :fname_input, 
    :lname_input, 
    :rank_input, 
    -- (SELECT usvID FROM USVs WHERE USVs.name = :usv_name_from_dropdown)
    :usv_id_from_dropdown
);