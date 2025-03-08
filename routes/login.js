const express = require('express');
const router = express.Router();
const userschema = require('../schemas/users');
const admin = require('../schemas/doctors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require("config")

router.post('/patient/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).json({ error: "All fields are required !" })
        }
        const user = await userschema.findOne({ email })
       
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
        await userschema.findOneAndUpdate({ _id },
            {
                $set:
                {
                    token: token
                }
            })
      return res.status(200).json({ data: _id }) 

    } catch (error) {
        return res.status(500).json({ error })
    }

})

router.post('/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).json({ error: "All fields are required !" })
        }
        const admin = await admin.findOne({ email })
       
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
        await admin.findOneAndUpdate({ _id },
            {
                $set:
                {
                    token: token
                }
            })
      return res.status(200).json({ data: _id }) 

    } catch (error) {
        return res.status(500).json({ error })
    }

})







module.exports = router; 