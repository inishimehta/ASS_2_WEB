/*************************
* BTI325– Assignment 3
* I declare that this assignment is my own work in accordance with Seneca Academic
Policy. No part * of this assignment has been copied manually or electronically from any
other source
* (including 3rd party web sites) or distributed to other students.
*I have took help from friend to complete some parts of the assignment
*Hope this wont cause any integrity for me and them.
* Name: Nishi Mehta  
* Student ID: 152417218
* Date: 30-10-2022
*
* Your app’s URL (from Heroku) :
*
*************************/ 
const data_fs = require("./data-service.js")
var express = require("express"); 
var app = express();
var path = require("path"); 
const fs = require('fs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
var multer =  require('multer');
var storage = multer.diskStorage({

    destination : "./public/images/uploaded", 
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
  
});

const upload = multer({storage : storage});
var HTTP_PORT = process.env.PORT || 8080; 
function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}



  
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/about", function(req, res){
    res.sendFile(path.join(__dirname, "/views/about.html"));
});
app.get("/employees/add",function(req,res){
    res.sendFile(path.join(__dirname+"/views/addEmployee.html"));
});
app.get("/images/add",function(req,res){
    res.sendFile(path.join(__dirname+"/views/addImage.html"));
});





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

app.get("/images",  function(req, res){
    fs.readdir("./public/images/uploaded", function(err, items){
       res.send("ITEMS : " + items)
       if (err)
       console.log(err);
    })  
})

app.post("/images/add", upload.single("imageFile"), function(req, res){  
res.redirect("/images")
});


app.post('/employees/add', function(req, res) {
data_fs.addEmployee(req.body)
    .then(res.redirect('/employees'))
    .catch((err) => res.json({"message": err}))   
}) 

app.get('/employee/:idno', (req, res) => {
    data_fs.getEmployeesByNum(req.params.idno)
    .then((data) => {
        res.json(data);
    })
});

app.get('/employees', (req, res) => {
    if(req.query.status) {
        data_fs.getEmployeesByStatus(req.query.status)
            .then((data) => res.json(data))
            .catch((err) => res.json({"nothing": err}))

    }else if(req.query.manager){
        data_fs.getEmployeesByManager(req.query.manager)
            .then((data) => res.json(data))
            .catch((err) => res.json({"nothing": err}))
            
    }else if(req.query.department){
        data_fs.getEmployeesByDepartment(req.query.department)
            .then((data) => res.json(data))
            .catch((err) => res.json({"nothing": err}))

    }else{
        data_fs.getAllEmployees()
            .then((data) => res.json(data))
            .catch((err) => res.json({"nothing": err}))
    }
});


app.use((req, res) => {
    res.status(404).send("The requested page is not found");
  });


  data_fs.initialize().then(function(data){
    app.listen(HTTP_PORT, onHttpStart);
  
  }).catch(function(err){
    console.log(err);
  })