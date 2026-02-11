-- Get all Payloads and their installed USV Names for the List Payloads table.
SELECT 
    Payloads.payloadID AS 'ID', 
    Payloads.type AS 'TYPE', 
    Payloads.serialNumber AS 'SERIAL', 
    Payloads.condition AS 'CONDITION',
    IFNULL(USVs.name, 'Storage') AS 'USV',
    IFNULL(Payloads.installationDate, '') AS 'DATE INSTALLED'
FROM Payloads
LEFT JOIN USVs ON Payloads.installedUSV = USVs.usvID
ORDER BY Payloads.payloadID;