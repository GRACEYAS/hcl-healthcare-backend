const mongoose = require("mongoose");
const userschema= new mongoose.Schema({

    user_id:{
        type:String,
        required:true,
        unique:true 
    },
    role:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'role',
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
    },
    token :{
        type: String
    },
})

module.exports = mongoose.model('users',userschema)