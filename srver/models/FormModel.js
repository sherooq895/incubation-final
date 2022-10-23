
const mongoose=require('mongoose')

const formTemplate = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    streetaddress:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    pin:{
        type:String,
        required:true
    },
    companyname:{
        type:String,
        required:true
    },
    a:{
        type:String,
        required:true
    },
    b:{
        type:String,
        required:true
    },
    c:{
        type:String,
        required:true
    },
    d:{
        type:String,
        required:true
    },
    e:{
        type:String,
        required:true
    },
    incubationType:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    view:{
        type:String,
        required:true
    }
    

})


module.exports=mongoose.model('forms',formTemplate)


