// server.js
const express = require('express');
const path = require('path');
const app = express();


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = 3040;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})