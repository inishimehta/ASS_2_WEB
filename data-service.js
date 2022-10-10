const file_read =require('fs'); 
var employees;
var departments;


var exports = module.exports={};
//The intitialize function in which the data get parsed
exports.initialize = function(){
    return new Promise(function(res,rej){
        //Reading the file from the given path and parse the data with a condition
        file_read.readFile('./data/employees.json',(err,data)=>{
            if(err) rej(err)
            else{
                employees=JSON.parse(data);
                //Same like above 
                file_read.readFile('./data/department.json',(err,data)=>{
                    if(err) rej(err)
                    else
                    departments=JSON.parse(data);
                    res("Everything is good!!")
                })
            }
        })
    })
}


//In this function we get the departments from the parsed data.
exports.getDepartments=function(){
    return new Promise(function(res,rej){
        if(departments.length!=0)
        res(departments);
        else
        rej("Departments have no data in it")
    })
}

//In this function we get the data if employees from the parsed data
exports.getAllEmployees = function(){
    return new Promise(function(res,rej){
        if(employees.length!=0)
        res(employees);
        else
        rej("Employee has no data in it")
    })
}

 //Same like above we gets the managers data but we use a condition in which isManger is true
exports.getManagers=function(){
    var managers=[];
    return new Promise(function(res,rej){
        if(employees.length!=0)
        for(let i=0;i<employees.length;i++){
            if(employees[i].isManager==true)
            managers.push(employees[i])
        }
        else{
            rej("This is empty")
        }
        if(managers.length!=0){
            res(managers);
        }
        else{
            rej("Managers is empty")
        }
    })
}

