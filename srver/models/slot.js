
const mongoose=require('mongoose')

const slotTemplate= new mongoose.Schema({

    slot_no:{
        type:String,
        required:true
    },

    is_booked:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
}

})

module.exports=mongoose.model('slot',slotTemplate)

