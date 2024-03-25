const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');


const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// // Logging Middleware
// app.use((req, res, next) => {
//     const logData = `${new Date().toISOString()}: ${req.ip} - ${req.method} ${req.path}\n`;
//     fs.appendFile('log.txt', logData, (err) => {
//         if (err) console.error('Error writing to log file:', err);
//     });
//     next();
// });

// User Registration Route

app.post("/api/register", (req, res) => {
     const userData = req.body;
    try {
        const user = JSON.parse(fs.readFileSync('user.json'));
        user.push(userData);
        fs.writeFileSync('user.json', JSON.stringify(userJson, null, 2));
        res.json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.get("/api/user", (req, res) => {
     const user = JSON.parse(fs.readFileSync('user.json'));
     res.json({ user});
 });
 

// Courses Routes

const courses = require("./courses.json");

app.get("/api/courses", (req, res) => {
    res.json({ courses: courses});
});

app.get("/api/courses/:id", (req, res) => {
    const courseId = req.params.id;
    const course = courses.find(course => course.id === courseId);
    if (course) {
        res.json({ course });
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

app.get("/api/courses/categories/:category", (req, res) => {
    const category = req.params.category;
    const filteredCourses = courses.filter(course => course.CourseCategories === category);
    res.json({ courses: filteredCourses });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
