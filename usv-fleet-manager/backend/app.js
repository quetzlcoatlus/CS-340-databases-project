const express = require('express');
const app = express();
const path = require('path');

// Port 10067 for OSU Server
const PORT = 10067; 

app.use(express.json());

// =============================================================
// REACT FRONTEND ONLY
// =============================================================

// 1. Serve the static files from the React build folder
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// 2. Handle React Routing
// This ensures that if you go to /missions, the server gives you index.html
// so React Router can take over and show the Missions page.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Web Server running on port ${PORT}...`); 
    console.log(`Hosting static frontend from: ${path.join(__dirname, '../frontend/dist')}`);
});