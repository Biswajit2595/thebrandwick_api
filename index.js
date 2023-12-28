const express = require('express');
const cors = require('cors');
const { connection } = require('./db');
const { userRouter } = require('./Routes/userRoute');
const app=express()
require('dotenv').config()
const PORT=process.env.PORT || 3000
app.use(cors())
app.use(express.json())
app.use('/user',userRouter)


app.get("/",(req,res)=>{
    res.send("Welcome to The Brand Wick")
})

app.listen(PORT,async(req,res)=>{
    try {
        await connection
        console.log(`Connected to Db. Running at ${PORT}`)
    } catch (error) {
        res.send({error})
    }
})