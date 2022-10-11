const mongoose = require("mongoose");
const studentsSchema = new mongoose.Schema({

firstname:{
    type: String,
    require:true
},
lastname:{
    type:String,
    require : true
},
email:{
    type:String,
    require: true
},
phone:{
    type : Number,
    require:true
},
password:{
    type: String,
    require: true 
}                               

})
const Register = new mongoose.model("Student",studentsSchema);
module.exports = Register; 
console.log(Register);