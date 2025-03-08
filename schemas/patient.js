
const { type } = require("express/lib/response");
const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    name: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, min: 18, max: 65 },
    contact: { type: Number },
    gender: { type: String, required: true },
    height: { type: Number },
    weight: { type: Number },
    sugarLevel: { type: Number },
    bloodPressure: { type: Number },
    waterLevel: { type: Number },
    bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'O-'] },
    potassium: { type: Number },
    sodium: { type: Number },
    magnesium: { type: Number },
    stressLevel: { type: Number },
    heartRate: { type: Number },
    sleepQuality: { type: Number }
});

export const Patient = mongoose.model("Patient", PatientSchema);