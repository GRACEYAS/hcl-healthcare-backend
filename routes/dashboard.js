const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
//const patientSchema = require('../schemas/users');

router.get('/patient/sugarlevel', auth,async (req, res) => {
    try {
        const { patient_ID } = req.body;
        //const result = await patientschema.find({_id: patient_ID})
        if (!result) {
            return res.status(200).json({ message: "No Patient data found" })
        }
        if( result.sugarLevel > 90 ){
            return res.json({ message: "High sugar level" });
        }
        if( result.sugarLevel < 45 ){
            return res.json({ message: "Less sugar level" });
        }
    } catch (error) {
        return res.status(500).json({ error })
    }

})

router.get('/patient/bplevel', auth,async (req, res) => {
    try {
        const { patient_ID } = req.body;
        //const result = await patientschema.find({_id: patient_ID})
        if (!result) {
            return res.status(200).json({ message: "No Patient data found" })
        }
        if( result.sugarLevel > 90 ){
            return res.json({ message: "High BP level" });
        }
        if( result.sugarLevel < 45 ){
            return res.json({ message: "Less BP level" });
        }
        return res.json({ message: "Normal" });
    } catch (error) {
        return res.status(500).json({ error })
    }

})

module.exports = router; 