const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Logging Middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()}: ${req.ip} - ${req.method} ${req.path}`);
    next();
});

// User Registration Route
app.post("/api/register", (req, res) => {
    const userData = req.body;
    if (!userData.username || !userData.email) {
        return res.status(400).json({ success: false, message: 'Username and email are required' });
    }

    let users = [];
    try {
        const data = fs.readFileSync('./users.json', 'utf8');
        users = JSON.parse(data);
    } catch (error) {
        if (error.code !== 'ENOENT') {
            console.error('Error reading user data:', error);
            return res.status(500).json({ success:userData, message: 'Internal server error' });
        }
    }

    users.push(userData);

    try {
        fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
        res.json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error writing user data:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Show all users endpoint
app.get("/api/users", (req, res) => {
    let users;
    try {
        const data = fs.readFileSync('./users.json', 'utf8');
        users = JSON.parse(data);
    } catch (error) {
        if (error.code !== 'ENOENT') {
            console.error('Error reading user data:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    res.json(users);
});

// Dummy route for demonstration
app.get("/api/dummy", (req, res) => {
    res.json({ message: 'Dummy route' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
