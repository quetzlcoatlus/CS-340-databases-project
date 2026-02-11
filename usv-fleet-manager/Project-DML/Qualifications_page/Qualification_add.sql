-- Add a new Qualification, takes a qualification_name: str
INSERT INTO Qualifications (
    Qualifications.name
) VALUES (
    :qualification_name_input
);