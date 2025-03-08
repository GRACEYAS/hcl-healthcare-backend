const mongoose = require("mongoose");
const doctors= new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
    },
    contact :{
        type: String
    },
    designation :{
        type: String
    },
    token :{
        type: String
    },
})

module.exports = mongoose.model('doctors',doctors)