const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/user", (req, res) => {
  try {
  
    const data = fs.readFileSync("user.json", "utf8");

    const jsonData = JSON.parse(data);
    
    res.json(jsonData);

  } catch (err) {

    console.error("Error reading or parsing user data:", err);

    res.status(500).json({ error: "Internal Server Error" });

  }
});

//login
app.post("/login", (req, res) => {

  try {

    const { email, password } = req.body;

    const login = fs.readFileSync("user.json", "utf8");

    const logData = JSON.parse(login);

    var flag = logData.find((item)=>{
        
      if(item.email == email && item.password == password){

        try {
  
          const currentuserdata = fs.readFileSync("currentuser.json", "utf8");
      
          let currentuser = JSON.parse(currentuserdata);
          
          currentuser.push(item);

          fs.writeFileSync("currentuser.json", JSON.stringify(users, null, 2));
      
        } catch (err) {
      
          console.error("Error reading or parsing user data:", err);
      
          res.status(500).json({ error: "Internal Server Error" });
      
        }
           
           return true;

      }else{

            return false;
      }

    });

    if (flag) {
      
      res.redirect('http://127.0.0.1:5500/EduMim/courseDashBoard.html');

    } else {
      
      res.redirect('http://127.0.0.1:5500/EduMim/index.html');
    }

  } catch (error) {

    console.error("Error reading user data:", error);

    res.status(500).json({ error: "Internal Server Error" });
    
  }
});

//regitser

app.post("/register", (req, res) => {

  try {
    const registerData = req.body;

    let userData = fs.readFileSync("user.json", "utf8");

    let users = JSON.parse(userData); 

    registerData.id = users.length; 

    users.push(registerData);

    fs.writeFileSync("user.json", JSON.stringify(users, null, 2));

    res.redirect('http://127.0.0.1:5500/EduMim/index.html');

  } catch (error) {

    console.error("Error registering user:", error);

    res.status(500).json({ error: "Internal Server Error" });
  }
  
});

app.get("/currentuser", (req, res) => {
    try {
        
        const filePath = __dirname + "/currentuser.json";

        if (fs.existsSync(filePath)) {
            const currentuserdata = fs.readFileSync(filePath, "utf8");
            const currentuser = JSON.parse(currentuserdata);
            res.json({ currentuser });

        } else {
            
            res.status(404).json({ error: "File not found" });
        }
        
    } catch (error) {
  
        console.error("Error reading or parsing file:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.get("/logout",(req,res)=>{

  try {
  
    const currentuserdata = fs.readFileSync("currentuser.json", "utf8");

    let currentuser = JSON.parse(currentuserdata);
    
    currentuser.pop();

    fs.writeFileSync("currentuser.json", JSON.stringify(users, null, 2));

  } catch (err) {

    console.error("Error reading or parsing user data:", err);

    res.status(500).json({ error: "Internal Server Error" });

  }
     

     res.redirect('http://127.0.0.1:5500/EduMim/index.html');
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(`Server is listening on port ${PORT}`);
  
});
