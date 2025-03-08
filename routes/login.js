const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth')

router.post('/sample',auth,async(req,res)=>{})