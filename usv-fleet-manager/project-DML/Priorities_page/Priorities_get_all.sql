-- Get all Priorities for display
SELECT 
    Priorities.priorityLevel AS 'ID', 
    Priorities.title AS 'TITLE'
FROM Priorities
ORDER BY Priorities.priorityLevel;