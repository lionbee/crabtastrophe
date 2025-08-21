const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Route for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`🦀 Crabtastrophe game server running at http://localhost:${PORT}`);
    console.log('🏖️  Beach runner ready! Press Ctrl+C to stop the server.');
});

module.exports = app;
