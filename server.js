const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Handle routes by serving the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'generateSig.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Open your browser and navigate to http://localhost:${port} to use the tool`);
});