const express = require("express");
require("dotenv").config();

const mongoose = require('mongoose')

const User = require("./models/user")

require("./models/db");

const userRouter = require('./routes/user')

const app = express();

// app.use((req, res, next) => {
    // req.on('data', (chunk) =>{
        // const data = JSON.parse(chunk);
        // req.body = data;
    // });
    // next();
// })

app.use(express.json())
app.use(userRouter);

const test = async (email, password) => {
  const user = await User.findOne({ email: email });
  const result = await user.comparePassword(password);
  console.log(result);
};

// test('doe4@gmail.com', '123456789');
// 
// app.get('/test', (req, res) => {
    // res.send('HelloWorld')
// })
// 

app.get('/', (req, res)=>{
    res.send('Hello World');
});

app.listen(8000, ()=>{
    console.log('port');
})