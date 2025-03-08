const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth')
const Patient = require('../schemas/patient');
const Doctor = require('../schemas/doctor');
router.post('/register/patient', auth, async (req, res) => {
    const patientData = req.body;
    const patient = new Patient({ ...req.body });
    await patient.save(patientData);
    res.status(201).send("Patient Registered!!!");
});

router.post('/register/doctor', auth, async (req, res) => {
    const doctorData = req.body;
    const doctor = new Doctor({ ...req.body });
    await doctor.save(doctorData);
    res.status(201).send("Doctor Registered!!!");
});