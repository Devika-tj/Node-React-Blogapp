const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:Number
});


module.exports=mongoose.model('users',userSchema)