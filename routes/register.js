const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth');
const mongoose = require("mongoose");
const Patient = require('../schemas/patient');
const Doctor = require('../schemas/doctor');
// const Patient = mongoose.model("Patient", PatientSchema);
// const Doctor = mongoose.model("Patient", DoctorSchema);
router.post('/patient', async (req, res) => {
    try {
        const patientData = req.body;
        const patient = new Patient({ ...req.body });
        await patient.save(patientData);
        res.status(201).send("Patient Registered!!!");
    } catch (error) {
        return res.status(500).json({ error })
    }
});

router.post('/doctor', async (req, res) => {
    try {
        const doctorData = req.body;
        const doctor = new Doctor(req.body);
        const addedRecord = await doctor.save(doctorData);
        console.log(addedRecord);
        res.status(201).send("Doctor Registered!!!");
    } catch (error) {
        return res.status(500).json({ error })
    }
});

module.exports = router;