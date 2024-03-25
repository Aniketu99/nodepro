const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// POST endpoint to handle form submission
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Read existing users from JSON file
    fs.readFile('users.json', 'utf8', (err, data) => {
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
        users.push({ username, email, password });

        // Write updated users array back to the file
        fs.writeFile('users.json', JSON.stringify(users, null, 4), err => {
            if (err) {
                console.error('Error writing users file:', err);
                res.status(500).send('Error processing registration');
                return;
            }
            console.log('New user added successfully:', username);
            res.send('Registration successful!');
        });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
