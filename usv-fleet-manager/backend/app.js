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
    // Alias the columns for React.
    const query = `
        SELECT 
            ID AS usvID, 
            NAME AS name, 
            CLASS AS class, 
            STATUS AS status, 
            MISSION AS missionTitle, 
            MISSION_ID AS missionID
        FROM v_usvs;
    `;
    db.pool.query(query, (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

app.post('/api/usvs', (req, res) => {
    const { name, class: className, status, missionID } = req.body;
    const mission = missionID === '' ? null : missionID;
    
    const query = `CALL sp_create_usv(?, ?, ?, ?)`;
    db.pool.query(query, [name, className, status, mission], (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(201).send("USV Created");
    });
});

app.delete('/api/usvs/:id', (req, res) => {
    const query = `CALL sp_delete_usv(?)`;
    db.pool.query(query, [req.params.id], (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(204).send();
    });
});

app.put('/api/usvs/:id', (req, res) => {
    const { name, class: className, status, missionID } = req.body;
    const mission = missionID === '' ? null : missionID;
    
    const query = `CALL sp_update_usv(?, ?, ?, ?, ?)`;
    db.pool.query(query, [req.params.id, name, className, status, mission], (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(200).send("USV Updated");
    });
});

// =============================================================
// ROUTES FOR CREW MEMBERS
// =============================================================
app.get('/api/crew', (req, res) => {
    const query = `
        SELECT 
            ID AS crewMemberID, 
            \`FIRST NAME\` AS firstName, 
            \`LAST NAME\` AS lastName, 
            RANK AS rank, 
            \`ASSIGNED USV\` AS usvName,
            USV_ID AS usvID
        FROM v_crew_members;
    `;
    db.pool.query(query, (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

app.post('/api/crew', (req, res) => {
    const { firstName, lastName, rank, usvID } = req.body;
    const usv = usvID === '' ? null : usvID;
    
    const query = `CALL sp_create_crew_member(?, ?, ?, ?)`;
    db.pool.query(query, [firstName, lastName, rank, usv], (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(201).send("Crew Member Added");
    });
});

app.delete('/api/crew/:id', (req, res) => {
    const query = `CALL sp_delete_crew_member(?)`;
    db.pool.query(query, [req.params.id], (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(204).send();
    });
});

// =============================================================
// ROUTES FOR MISSIONS
// =============================================================
app.get('/api/missions', (req, res) => {
    const query = `
        SELECT 
            ID AS missionID, 
            TITLE AS title, 
            LOCATION AS location, 
            PRIORITY AS priorityTitle,
            PRIORITY_ID AS priorityLevel
        FROM v_missions;
    `;
    db.pool.query(query, (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

app.post('/api/missions', (req, res) => {
    const { title, location, priorityLevel } = req.body;
    const query = `CALL sp_create_mission(?, ?, ?)`;
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
        SELECT 
            ID AS payloadID, 
            TYPE AS type, 
            SERIAL AS serialNumber, 
            \`CONDITION\` AS \`condition\`, 
            USV AS usvName, 
            \`DATE INSTALLED\` AS installationDate,
            USV_ID AS installedUSV
        FROM v_payloads;
    `;
    db.pool.query(query, (err, results) => {
        if (err) {
            console.error("Payload Fetch Error:", err);
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.post('/api/payloads', (req, res) => {
    const { type, serialNumber, condition, installedUSV, installationDate } = req.body;
    const usv = installedUSV === '' ? null : installedUSV;
    const date = installationDate === '' ? null : installationDate;
    
    const query = `CALL sp_create_payload(?, ?, ?, ?, ?)`;
    db.pool.query(query, [type, serialNumber, condition, usv, date], (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(201).send("Payload Added");
    });
});

app.put('/api/payloads/:id', (req, res) => {
    const { type, serialNumber, condition, installedUSV, installationDate } = req.body;
    const usv = installedUSV === '' ? null : installedUSV;
    const date = installationDate === '' ? null : installationDate;

    const query = `CALL sp_update_payload(?, ?, ?, ?, ?, ?)`;
    db.pool.query(query, [req.params.id, type, serialNumber, condition, usv, date], (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(200).send("Payload Updated");
    });
});

// =============================================================
// ROUTES FOR QUALIFICATIONS
// =============================================================
app.get('/api/qualifications', (req, res) => {
    const query = `
        SELECT 
            ID AS qualificationID, 
            \`QUALIFICATION NAME\` AS name
        FROM v_qualifications;
    `;
    db.pool.query(query, (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

app.post('/api/qualifications', (req, res) => {
    const { name } = req.body;
    const query = `CALL sp_create_qualification(?)`;
    db.pool.query(query, [name], (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(201).send("Qualification Created");
    });
});

app.delete('/api/qualifications/:id', (req, res) => {
    const query = `CALL sp_delete_qualification(?)`;
    db.pool.query(query, [req.params.id], (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(204).send();
    });
});

// =============================================================
// ROUTES FOR CREW MEMBER QUALIFICATIONS (Intersection Table)
// =============================================================
app.get('/api/crew-qualifications', (req, res) => {
    const query = `
        SELECT 
            \`ID\` AS crewMemberQualificationID, 
            \`CREW MEMBER\` AS crewName, 
            \`QUALIFICATION\` AS qualName, 
            \`DATE EARNED\` AS earnedDate
        FROM v_crew_member_qualifications;
    `;
    db.pool.query(query, (err, results) => {
        if (err) {
            console.error("Fetch Error:", err);
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.post('/api/crew-qualifications', (req, res) => {
    const { crewMemberID, qualificationID, earnedDate } = req.body;
    const query = `CALL sp_create_crew_member_qualification(?, ?, ?)`;
    
    db.pool.query(query, [crewMemberID, qualificationID, earnedDate], (err, results) => {
        if (err) {
            console.error("Insert Error:", err);
            res.status(500).send(err);
        } else {
            res.sendStatus(201);
        }
    });
});

app.delete('/api/crew-qualifications/:id', (req, res) => {
    const id = req.params.id;
    const query = `CALL sp_delete_crew_member_qualification(?)`;
    
    db.pool.query(query, [id], (err, results) => {
        if (err) {
            console.error("Delete Error:", err);
            res.status(500).send(err);
        } else {
            res.sendStatus(204);
        }
    });
});
// =============================================================
// ROUTES FOR PRIORITIES (READ ONLY)
// =============================================================
app.get('/api/priorities', (req, res) => {
    const query = `
        SELECT 
            ID AS priorityLevel, 
            TITLE AS title
        FROM v_priorities;
    `;
    db.pool.query(query, (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

// =============================================================
// SERVE STATIC FILES (Added for Deployment)
// =============================================================
// Serve the React frontend from the 'dist' directory
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Handle React Routing: Send all unhandled requests to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});

// =============================================================
// RESET DATABASE ROUTE
// =============================================================
app.post('/api/reset-database', (req, res) => {
    const query = `CALL sp_load_usv_fleet_management_system_db();`;
    
    db.pool.query(query, (err, results) => {
        if (err) {
            console.error("Database Reset Error:", err);
            res.status(500).send("Error resetting database.");
        } else {
            console.log("Database successfully reset to default state.");
            res.sendStatus(200);
        }
    });
});