const express = require('express');

const App = express();

const port = process.env.PORT || 4000;

const file = require("fs");

const courses = require("./courses.json");

const user = require("./user.json");

const bodyParser = require('body-parser');


//middleware 

App.use( bodyParser.json() ); 
      
App.use(bodyParser.urlencoded({  
  extended: true
}));


App.use((req,res,next)=>{
   
    file.appendFile('log.txt',`\n ${Date.now()}:${req.ip}:${req.method}:${req.path}`,(error ,d)=> {

           console.log('write file');
    });

    next();
})

// Routes for web Authantication

App.post("/Api/register",(req,res)=>{

     userdata = req.body;

     user.push(userdata);
     res.json({userdata});

});

//Routes for courses

App.get("/Api/courses",(req,res)=>{

     res.json({courses});   
});

App.get("/Api/courses/:id",(req,res)=>{
     
     let a = (req.params.id);

     let b = a.substring(1);

     var abc = courses.find(d => d.id == b);

     console.log(abc);

     res.json({abc});
});

App.get("/Api/courses/categories/:categories",(req,res)=>{

     var ca = (req.params.categories);
     
     var str = ca.substring(1);

     var cate = [];

     courses.forEach((item) =>{
        
          if(item.CourseCategroies == str){

               cate.push(item);
          }
     })
   
      res.json({cate});   
});


App.listen(port,()=>{

     console.log("server start");
});

