const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mongoosedemo",{
useNewUrlParser:true,
useUnifiedTopology:true,
//useCreateIndex:true
}).then(() =>{
    console.log("connect to db");
}).catch((err) =>{
    console.log(err);
})