const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const route = require('../src/routes/route');

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.mongoose).then(
    console.log('Database connected')
).catch((err => console.log(err.message)))

app.use('/',route);

app.listen(process.env.PORT || 3000,()=>{
    console.log(`server is running!`)
})