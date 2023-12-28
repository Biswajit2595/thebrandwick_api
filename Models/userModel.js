const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    username:{ type:String,required:true },
    email: { type:String,unique:true,required:true },
    phone: { type:Number,required:true},
    password: { type:String,required:true },
},{
    versionKey:false
})

const UserModel=mongoose.model('User',userSchema)

module.exports={UserModel}