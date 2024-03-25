const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Define the path to your JSON file
const filePath = path.join(__dirname, 'user.json'); // Assuming user.json is in the same directory as app.js

// Define a GET endpoint to read the JSON file
app.get('/user', (req, res) => {
  // Read the JSON file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Parse the JSON data
    try {
      const user = JSON.parse(data);
      // Send the user data as a response
      res.json(user);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
