const mongoose = require("mongoose");
const roleschema = new mongoose.Schema({
    role_id:{
        type:Number,
        unique: true, 
        required:true
    },
    role_name:{
        type:String,
        enum:['admin','patient', 'doctor'],
        required:true
    }
    // currently 3 roles 
},{timestamps:{
    updatedAt:"updated_at",created_at:"created_at"
}})

module.exports = mongoose.model('roles',roleschema)