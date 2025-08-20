const mongoose=require('mongoose')
const blogSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:String,
    image:String,
    content:String,
});


module.exports=mongoose.model('blogs',blogSchema)