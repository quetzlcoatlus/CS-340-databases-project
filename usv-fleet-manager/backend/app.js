// backend/app.js
const express = require('express');
const app = express();
const db = require('./db-connector');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());

const PORT = 10067; // Port for OSU Server

// =============================================================
// ROUTES FOR USVs
// =============================================================
app.get('/api/usvs', (req, res) => {
    const query = `
        SELECT USVs.usvID, USVs.name, USVs.class, USVs.status, Missions.title as missionTitle, USVs.missionID
        FROM USVs
        LEFT JOIN Missions ON USVs.missionID = Missions.missionID;
    `;
    db.pool.query(query, (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

app.post('/api/usvs', (req, res) => {
    const { name, class: className, status, missionID } = req.body;
    const mission = missionID === '' ? null : missionID;
    const query = `INSERT INTO USVs (name, class, status, missionID) VALUES (?, ?, ?, ?)`;
    db.pool.query(query, [name, className, status, mission], (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(201).send("USV Created");
    });
});

app.delete('/api/usvs/:id', (req, res) => {
    const query = `DELETE FROM USVs WHERE usvID = ?`;
    db.pool.query(query, [req.params.id], (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(204).send();
    });
});

app.put('/api/usvs/:id', (req, res) => {
    const { name, class: className, status, missionID } = req.body;
    const mission = missionID === '' ? null : missionID;
    
    const query = `UPDATE USVs SET name = ?, class = ?, status = ?, missionID = ? WHERE usvID = ?`;
    db.pool.query(query, [name, className, status, mission, req.params.id], (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(200).send("USV Updated");
    });
});

// =============================================================
// ROUTES FOR CREW MEMBERS
// =============================================================
app.get('/api/crew', (req, res) => {
    const query = `
        SELECT CrewMembers.crewMemberID, CrewMembers.firstName, CrewMembers.lastName, CrewMembers.rank, USVs.name as usvName, CrewMembers.usvID
        FROM CrewMembers
        LEFT JOIN USVs ON CrewMembers.usvID = USVs.usvID;
    `;
    db.pool.query(query, (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

app.post('/api/crew', (req, res) => {
    const { firstName, lastName, rank, usvID } = req.body;
    const usv = usvID === '' ? null : usvID;
    const query = `INSERT INTO CrewMembers (firstName, lastName, rank, usvID) VALUES (?, ?, ?, ?)`;
    db.pool.query(query, [firstName, lastName, rank, usv], (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(201).send("Crew Member Added");
    });
});

app.delete('/api/crew/:id', (req, res) => {
    const query = `DELETE FROM CrewMembers WHERE crewMemberID = ?`;
    db.pool.query(query, [req.params.id], (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(204).send();
    });
});

// =============================================================
// ROUTES FOR MISSIONS
// =============================================================
app.get('/api/missions', (req, res) => {
    const query = `SELECT * FROM Missions`;
    db.pool.query(query, (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

app.post('/api/missions', (req, res) => {
    const { title, location, priorityLevel } = req.body;
    const query = `INSERT INTO Missions (title, location, priorityLevel) VALUES (?, ?, ?)`;
    db.pool.query(query, [title, location, priorityLevel], (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(201).send("Mission Created");
    });
});

// =============================================================
// ROUTES FOR PAYLOADS
// =============================================================
app.get('/api/payloads', (req, res) => {
    const query = `
        SELECT Payloads.payloadID, Payloads.type, Payloads.serialNumber, Payloads.condition, USVs.name as usvName, Payloads.installedUSV, Payloads.installationDate
        FROM Payloads
        LEFT JOIN USVs ON Payloads.installedUSV = USVs.usvID;
    `;
    db.pool.query(query, (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

app.post('/api/payloads', (req, res) => {
    const { type, serialNumber, condition, installedUSV, installationDate } = req.body;
    const usv = installedUSV === '' ? null : installedUSV;
    const date = installationDate === '' ? null : installationDate;
    const query = `INSERT INTO Payloads (type, serialNumber, \`condition\`, installedUSV, installationDate) VALUES (?, ?, ?, ?, ?)`;
    db.pool.query(query, [type, serialNumber, condition, usv, date], (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(201).send("Payload Added");
    });
});

// =============================================================
// ROUTES FOR QUALIFICATIONS
// =============================================================
app.get('/api/qualifications', (req, res) => {
    const query = `SELECT * FROM Qualifications`;
    db.pool.query(query, (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

app.post('/api/qualifications', (req, res) => {
    // DDL uses 'name', not 'qualificationName'
    const { name } = req.body;
    const query = `INSERT INTO Qualifications (name) VALUES (?)`;
    db.pool.query(query, [name], (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(201).send("Qualification Created");
    });
});

app.delete('/api/qualifications/:id', (req, res) => {
    const query = `DELETE FROM Qualifications WHERE qualificationID = ?`;
    db.pool.query(query, [req.params.id], (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(204).send();
    });
});

// =============================================================
// ROUTES FOR CREW MEMBER QUALIFICATIONS (Intersection Table)
// =============================================================
app.get('/api/crew-qualifications', (req, res) => {
    // Table Name: CrewMemberQualifications
    // PK: crewMemberQualificationID
    // FK: crewMemberID
    const query = `
        SELECT CMQ.crewMemberQualificationID, CM.firstName, CM.lastName, Q.name as qualificationName, CMQ.earnedDate
        FROM CrewMemberQualifications CMQ
        JOIN CrewMembers CM ON CMQ.crewMemberID = CM.crewMemberID
        JOIN Qualifications Q ON CMQ.qualificationID = Q.qualificationID
        ORDER BY CM.lastName, CM.firstName, Q.name;
    `;
    db.pool.query(query, (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

app.post('/api/crew-qualifications', (req, res) => {
    const { crewMemberID, qualificationID, earnedDate } = req.body;
    const query = `INSERT INTO CrewMemberQualifications (crewMemberID, qualificationID, earnedDate) VALUES (?, ?, ?)`;
    db.pool.query(query, [crewMemberID, qualificationID, earnedDate], (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(201).send("Certification Assigned");
    });
});

app.delete('/api/crew-qualifications/:id', (req, res) => {
    // Correct Table Name: CrewMemberQualifications
    const query = `DELETE FROM CrewMemberQualifications WHERE crewMemberQualificationID = ?`;
    db.pool.query(query, [req.params.id], (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(204).send();
    });
});


// =============================================================
// ROUTES FOR PRIORITIES (READ ONLY)
// =============================================================
app.get('/api/priorities', (req, res) => {
    const query = `SELECT * FROM Priorities`;
    db.pool.query(query, (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});