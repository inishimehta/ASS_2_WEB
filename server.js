/*************************
* BTI325– Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic
Policy. No part * of this assignment has been copied manually or electronically from any
other source
* (including 3rd party web sites) or distributed to other students.
*I have took help from friend to complete some parts of the assignment
*Hope this wont cause any integrity for me and them.
* Name: Nishi Mehta  
* Student ID: 152417218
* Date: 09-10-2022
*
* Your app’s URL (from Cyclic) : 
*
*************************/ 
const data_fs = require("./data-service.js")
var express = require("express"); 
var app = express();
var path = require("path"); 
var HTTP_PORT = process.env.PORT || 8080; 
function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}

data_fs.initialize().then(function(data){
    app.listen(HTTP_PORT, onHttpStart);
  
  }).catch(function(err){
    console.log(err);
  })

  
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/about", function(req, res){
    res.sendFile(path.join(__dirname, "/views/about.html"));
});



app.get("/employees",function(req,res){
    data_fs.getAllEmployees().then(function(data){
        res.json(data);
    })
    .catch(function(err){
        res.json({"message":err});
    })
})

app.get("/managers",function(req,res){
    data_fs.getManagers().then(function(data){
        res.json(data);
    })
    .catch(function(err){
        res.json({"message":err})
    })
})

app.get("/departments",function(req,res){
    data_fs.getDepartments().then(function(data){
        res.json(data);
    })
    .catch(function(err){
        res.json({"message":err});
    })
})

app.use((req, res) => {
    res.status(404).send("The requested page is not found");
  });


