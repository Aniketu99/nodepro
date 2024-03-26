const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));

app.get("/user",(req,res)=>{

  var user = JSON.parse(fs.readFileSync("./user.jso"));

     res.json({user})
})

app.get("/fake",(req,res)=>{

     res.json({"res":"true"});
})
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
