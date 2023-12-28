const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const saltrounds=5
const { UserModel } = require('../Models/userModel');

const userRouter=express.Router()

userRouter.post("/signup",async(req,res)=>{
    const { email,password }=req.body
    try {
        const user= await UserModel.findOne({email})
        if(user){
            res.status(200).send({"data":"User is already a registered. User Please Login"})
        }
        else{
            bcrypt.hash(password,saltrounds,async(err,hash)=>{
                if(err){
                    res.status(500).send({'error':"Internal Server Error"})
                }else{
                    const newUser=new UserModel({...req.body,password:hash})
                    await newUser.save()
                    res.status(201).send({"data":"User has been successfully registered"})
                }
            })
        }
    } catch (error) {
        res.status(500).send({'error':"Internal Server Error"})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await UserModel.findOne({email})
        if(!user){
            res.status(200).send({'data':"User does not Exist.Please try Again"})
        }
        else{
            bcrypt.compare(password,user.password,(err,result)=>{
                if(err){
                    res.status(401).send({'data':"Invalid Credentials. Please try Again"})
                }
                const token=jwt.sign({username:user.username},process.env.private_key)
                res.status(200).send({'data':`${user.username} has successfully logged In`,token})
            })
        }
    } catch (error) {
        res.status(500).send({'error':"Internal Server Error"})
    }
})

module.exports={userRouter}