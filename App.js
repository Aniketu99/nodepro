const express = require('express');
const fs = require('fs');
const app = express();
const users = require('./user.json')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var currentuser;

app.get("/user",(req,res)=>{

  res.json({users});
  //user data
  
})

app.post("/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = fs.readFileSync("user.json", "utf8");
    const user = JSON.parse(userData);

    if (user.email === email && user.password === password) {
      currentuser = user;
      res.redirect('http://127.0.0.1:5500/EduMim/courseDashBoard.html');
    } else {
      res.redirect('http://127.0.0.1:5500/EduMim/index.html');
    }
  } catch (error) {
    console.error("Error reading user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("user/register", (req, res) => {

  try {
    const registerData = req.body;
    const userData = fs.readFileSync("user.json", "utf8");
    const user = JSON.parse(userData);
    const len = user.length;
    registerData.id=len;
    user.push(registerData);
    fs.writeFileSync("user.json", JSON.stringify(user));
    res.redirect('http://127.0.0.1:5500/EduMim/index.html');
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
