const express = require('express');
const router = express.Router();
const doctors = require('../schemas/doctors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require("config")

router.post('/register', (req, res) => {
    const userData = {
        name: req.body.name,
        role: req.body.role,
        email: req.body.email,
        password: req.body.password,
        contact: req.body.contact,
        designation: req.body.designation
    }

    doctors.findOne({
        email: req.body.email
    })
    .then(user => {
        if(!user){
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash
                doctors.create(userData)
                .then(user => {
                    res.json({status: user.email + ' registered!'})
                })
                .catch(err => {
                    res.send('error: ' + err)
                })
            })
        } else {
            res.json({error: ' user already exists'})
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})

router.get('/get', (req, res) => {

    doctors.find()
    .then(user => {
        if(!user){
            res.json({data: "No data found"})
        } else {
            res.json({data: user})
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})

router.put('/update', (req, res) => {

    try {
        const { _id } = req.body.$set_id;
        const userData = {
            name: req.body.name,
            role: req.body.role,
            email: req.body.email,
            password: req.body.password,
            contact: req.body.contact,
            designation: req.body.designation
        }
        doctors.findOneAndUpdate({ _id },
            {
                $set:
                {
                    userData
                }
            })
    }
    catch (error) {
        return res.status(500).json({ error })
    }
    
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).json({ error: "All fields are required !" })
        }
        const user = await doctors.findOne({ email })
       
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
        await doctors.findOneAndUpdate({ _id },
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