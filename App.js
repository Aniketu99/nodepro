const express = require('express');

const file = require("fs");

const Data = require("./Data.json");

const App = express();

const port = process.env.PORT || 4000;

//middleware 

App.use((req,res,next)=>{
   
    file.appendFile('log.txt',`\n ${Date.now()}:${req.ip}:${req.method}:${req.path}`,(error ,d)=> {

           console.log('write file');
    });

    next();
})

//Routes

App.get("/api/courses",(req,res)=>{

     res.json({Data});   
});

App.get("/api/courses/:id",(req,res)=>{
     
     let a = (req.params.id);

     let b = a.substring(1);

     var abc = Data.find(d => d.id == b);

     console.log(abc);

     res.json({abc});
});

App.get("/api/courses/:categories",(req,res)=>{

     var ca = (req.params.categories);
     
     var str = ca.substring(1);

     var cate = Data.filter(data => data.course_categories === str );
   
      res.json({cate});   
});


App.listen(port,()=>{

     console.log("server start");
});

