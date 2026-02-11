-- Get all Priorities to populate the "Priority Level" dropdown
SELECT 
    Priorities.priorityLevel, 
    Priorities.title
FROM Priorities
ORDER BY Priorities.priorityLevel;