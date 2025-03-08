const express = require('express');
const app  =  express();
const cors = require('cors');
const morgan = require("morgan");
require('./config/mongoose');



const PORT = 3000;
const loginRoute = require('./routes/login')
app.use(cors()) // Cross-Origin Resource Sharing
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(morgan('dev'));

app.use('/user',loginRoute);

app.listen(PORT, ()=>{
    console.log("Server is running on the port", PORT)
})