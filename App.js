const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/user", (req, res) => {
  try {
    const userData = fs.readFileSync("user.json", "utf8");
    const user = JSON.parse(userData);
    res.json({ user });
  } catch (error) {
    console.error("Error reading user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/register", (req, res) => {
  var userData = req.body;
  res.json({ userData });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
