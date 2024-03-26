const fs = require('fs');
const express = require('express');
const { json } = require('body-parser');
const app = express();

app.use(express.json());

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

app.post("/register",(req,res)=>{

     var userData = req.body;

     var data = json.parse(userData);

    res.json({data});
     
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
