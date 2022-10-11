const express =require("express");
const { dirname } = require("path");
const app = express();
const path =require("path")
require("./db/conn");
const Register =require("./models/registers");
const{json}=require("express");
const { error } = require("console");
app.use(express.json());
const mongo = require('mongodb').MongoClient;
const objectid =require('mongodb').ObjectId; 
app.use(express.urlencoded({extended:false}));

const port =process.env.port || 4000;

app.set("view engine","hbs");


app.get("/",(req,res) =>{
    res.render("index");
});
app.get("/register",(req,res) =>{
    res.render("register");
});



app.get('/get-data', function(req, res, next) {
    Register.find()
        .then(function(doc) {
          res.render('register', {items: doc});
        });
  });





app.post("/registers",async(req,res) =>{
   try{
       
    const r1=new Register({  
        password : req.body.password,
         firstname : req.body.firstname,
        lastname : req.body.lastname,
         phone :req.body.phone,
         email :req.body.email,
     })
     
    return r1.save()
     res.send(r1);
     res.render("login");

     function abc(){
        const g1 =Register.find() ;
        res.send(g1);
     }
   }
   
   
   catch(error){
    res.send(error);
   }
});



// app.get("/getdata",(req,res)=>{
// try{
//    Register.find().then(data=>{
//    // res.render('index',{data:data})
//    const r1= res.send({data:data})
//    document.getElementById('id1').innerHTML=r1;
//    })
// }catch(error){
//    console.log(error); 
// }

// })
app.get("/login",(req,res) =>{
    res.render("login");
});
app.post("/login",async(req,res) =>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Register.findOne({email:email});
        if(useremail.password===password){
             res.render("index");
        }else{
            res.send("password are not matching");
           
        }
    }catch(error){ 

    }
})
app.get("/delete",(req,res) =>{
    res.render("delete");
});
 app.post("/delete",async(req,res) =>{
    try{
       
        const id = req.body.id;
        // const lastname = req.body.lastname;
       await Register.deleteOne({"_id":objectid(id)});
        console.log('Document Deleted')
    }catch(error){
        res.send(error);
        console.log(error);
    }
     res.render("index");
 });

 app.get("/update",(req,res) =>{
    res.render("update");
});
app.post("/update",async(req,res) =>{
   // const lastname = req.body.lastname;
    console.log(req.body);
    try{
        const id = req.body.id;
        const item={
            firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password
        };
       
      const r1=  await Register.collection.updateOne(
             {"_id":objectid(id)},
            {$set:item
            }
        );
       console.log(r1);
        console.log("updated");
        
      
    }catch(error){
        res.send(error);
        console.log(error); 
    }
    // res.render("delete");
})



app.listen(port,() =>{
    console.log("server running at port 4000");
})

// function abc(){

// }