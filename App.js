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
  const { firstName, lastName, phone, email, password } = req.body;

  // Read existing users from JSON file
  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading users file:', err);
          res.status(500).send('Error processing registration');
          return;
      }

      let users = [];
      if (data) {
          users = JSON.parse(data);
      }

      // Add new user to the array
      users.push({ firstName, lastName, phone, email, password });

      // Write updated users array back to the file
      fs.writeFile('users.json', JSON.stringify(users, null, 4), err => {
          if (err) {
              console.error('Error writing users file:', err);
              res.status(500).send('Error processing registration');
              return;
          }
          console.log('New user added successfully:', firstName, lastName);
          res.send('Registration successful!');
      });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
