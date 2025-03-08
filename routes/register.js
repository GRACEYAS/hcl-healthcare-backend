const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth');
const mongoose = require("mongoose");
const Patient = require('../schemas/patient');
const Doctor = require('../schemas/doctor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require("config")
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
        bcrypt.hash(doctorData.password, 10, async (err, hash) => {
            doctorData.password = hash;
            const doctor = new Doctor(doctorData);
            const addedRecord = await doctor.save();
            console.log(addedRecord);
            res.status(201).send("Doctor Registered!!!");
        });
    } catch (error) {
        return res.status(500).json({ error })
    }
});

router.post('/doctor/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).json({ error: "All fields are required !" })
        }
        const user = await Doctor.findOne({ email })

        if (!user) {
            return res.status(404).json({ error: "user does not exists !" })
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(401).json({ error: "Invalid credentials !" })
        }
        const _id = user._id  // get _id of user
        const token = jwt.sign({ _id, email }, config.get("TOKEN_KEY"), { expiresIn: '7d' })
        // update user token
        const value = await Doctor.findOneAndUpdate({ _id },
            {
                $set:
                {
                    token: token
                }
            })
        return res.status(200).json({ data: value })

    } catch (error) {
        return res.status(500).json({ error })
    }

})

module.exports = router;