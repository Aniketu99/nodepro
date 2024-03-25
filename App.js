const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Logging Middleware with log rotation
const accessLogStream = fs.createWriteStream('access.log', { flags: 'a' });
app.use(require('morgan')('combined', { stream: accessLogStream }));

// User Registration Route
app.post("/api/register", (req, res) => {
    const userData = req.body;
    if (!userData.username || !userData.email) {
        return res.status(400).json({ success: false, message: 'Username and email are required' });
    }

    fs.readFile('./users.json', 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading user data:', err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        let users = [];
        if (data) {
            try {
                users = JSON.parse(data);
            } catch (error) {
                console.error('Error parsing user data:', error);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }

        users.push(userData);

        fs.writeFile('./users.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error('Error writing user data:', err);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
            res.json({ success: true, message: 'User registered successfully' });
        });
    });
});

// Show all users endpoint
app.get("/api/users", (req, res) => {
    fs.readFile('./users.json', 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading user data:', err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        let users = [];
        if (data) {
            try {
                users = JSON.parse(data);
            } catch (error) {
                console.error('Error parsing user data:', error);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }

        res.json({ data });
    });
});

// Courses Routes
const coursesJson = require("./courses.json");

app.get("/api/courses", (req, res) => {
    res.json({ courses: coursesJson });
});

app.get("/api/courses/:id", (req, res) => {
    const courseId = req.params.id;
    const course = coursesJson.find(course => course.id === courseId);
    if (course) {
        res.json({ course });
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

app.get("/api/courses/categories/:category", (req, res) => {
    const category = req.params.category;
    const filteredCourses = coursesJson.filter(course => course.CourseCategories === category);
    res.json({ courses: filteredCourses });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
