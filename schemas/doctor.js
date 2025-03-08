
const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    name: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    contact: { type: Number },
    designation: { type: String }
});

export const Doctor = mongoose.model("Doctor", DoctorSchema);