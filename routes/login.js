const express = require('express');
const router = express.Router();
const roleschema = require('../schemas/roles');
const userschema = require('../schemas/users');

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).json({ error: "all fields are required !" })
        }
        const result = await roleschema.findOne({ role: 'admin' }, { _id: 1 })
        if (!result) {
            return res.status(404).json({ error: "role does not exists !" })
        }
        const user = await userschema.findOne({ email, role: result })
            .populate("role", { role_name: 1, _id: 1 })
        if (!user) {
            return res.status(404).json({ error: "Admin does not exists !" })
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(401).json({ error: "Invalid credentials !" })
        }
        const role = user.role.role_name
        const token = jwt.sign({ _id: user._id, email, role }, config.get("TOKEN_KEY"), { expiresIn: '7d' })
        //save token
        const _id = user._id  // get _id of user
        await userschema.findOneAndUpdate({ _id }, { $set: { token: token } })  // update user token
        return res.status(200).json({ data: token })

    } catch (error) {
        return res.status(500).json({ error })
    }

})
router.post('/patient/login', async (req, res) => {
    try {
        const { email, password, role_name } = req.body;
        if (!(email && password)) {
            return res.status(400).json({ error: "All fields are required !" })
        }
        const result = await roleschema.findOne({ role_name: role_name }, { _id: 1 })
        console.log("result from role", result)
        if (!result) {
            return res.status(404).json({ error: "role does not exists !" })
        }
        const user = await userschema.findOne({ email, role: result })
            .populate("role", { role_name: 1, _id: 1 })
        if (!user) {
            return res.status(404).json({ error: "user does not exists !" })
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(401).json({ error: "Invalid credentials !" })
        }
        const role = user.role.role_name
        const _id = user._id  // get _id of user
        const token = jwt.sign({ _id, email, role }, config.get("TOKEN_KEY"), { expiresIn: '7d' })
        // update user token
        await userschema.findOneAndUpdate({ _id },
            {
                $set:
                {
                    token: token
                }
            })
        return res.status(200).json({ data: token })

    } catch (error) {
        return res.status(500).json({ error })
    }

})

router.post('/doctor/login', async (req, res) => {
    try {
        const { email, password, role_name } = req.body;
        if (!(email && password)) {
            return res.status(400).json({ error: "All fields are required !" })
        }
        const result = await roleschema.findOne({ role_name: role_name }, { _id: 1 })
        console.log("result from role", result)
        if (!result) {
            return res.status(404).json({ error: "role does not exists !" })
        }
        const user = await userschema.findOne({ email, role: result })
            .populate("role", { role_name: 1, _id: 1 })
        if (!user) {
            return res.status(404).json({ error: "user does not exists !" })
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(401).json({ error: "Invalid credentials !" })
        }
        const role = user.role.role_name
        const _id = user._id  // get _id of user
        const token = jwt.sign({ _id, email, role }, config.get("TOKEN_KEY"), { expiresIn: '7d' })
        // update user token
        await userschema.findOneAndUpdate({ _id },
            {
                $set:
                {
                    token: token
                }
            })
        return res.status(200).json({ data: token })

    } catch (error) {
        return res.status(500).json({ error })
    }

})


module.exports = router; 