const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        enum:["Admin","User","Influencer","Hotel"],
        required:true,
    },
    active:{
        type:Boolean,
        default:true,
    },
    approved:{
        type:Boolean,
        default:true,
    },  
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Profile'
    },
    listings:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Listing'
    }],
    image:{
        type:String,
    },
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    },

},{timestamps:true});

module.exports = mongoose.model('User',userSchema);
