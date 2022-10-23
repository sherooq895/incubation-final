const mongoose=require('mongoose')

const LoginTemplate= new mongoose.Schema({
    email:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Login',LoginTemplate)