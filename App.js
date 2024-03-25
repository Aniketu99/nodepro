const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON bodies

const filePath = path.join(__dirname, 'user.json');

// Create an empty array in the user.json file if it doesn't exist
fs.exists(filePath, (exists) => {
  if (!exists) {
    fs.writeFile(filePath, '[]', (err) => {
      if (err) {
        console.error('Error creating file:', err);
      }
    });
  }
});

// Endpoint to get all users
app.get('/user', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    try {
      const users = JSON.parse(data);
      res.json(users);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

// Endpoint to register a new user
app.post('/register', (req, res) => {
  const userData = req.body;
  if (!userData || Object.keys(userData).length === 0) {
    return res.status(400).json({ error: 'User data is required' });
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    let users = [];
    try {
      users = JSON.parse(data);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Log existing user data
    console.log('Existing users:', users);

    users.push(userData);
    fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ message: 'User registered successfully' });
    });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
