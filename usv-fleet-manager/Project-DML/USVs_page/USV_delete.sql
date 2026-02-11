-- Delete a USV with given usvID
DELETE FROM USVs
WHERE USVs.usvID = :usv_id_selected;