const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

//auth

exports.auth = async (req,res,next) => {

    try {
        //get token from header
        const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", "");
        //if no token
        if(!token){
            return res.status(401).json({
                success:false,
                message:"No token found"
            })
        }
        
        //verify token
        try {
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log("decode: ",decode);
            req.user =decode;

        } catch (error) {
            console.log("error in verifying token",error);
            return res.status(401).json({
                success:false,
                message:"Invalid token"
            })
        }
        next();
    } catch (error) {
        console.log("error in auth",error);
        return res.status(401).json({
            success:false,
            message:"Something went wrong in auth plese try again later"
        })
    }
}

//admin auth

exports.isAdmin = async (req,res,next) => {

    try {
        const userDetails = await User.findOne({ email: req.user.email });
        if(userDetails.accountType !== 'Admin'){
            return res.status(401).json({
                success:false,
                message:"You are not authorized to access this route this route is only for admin"
            })
        }
        next();
    } catch (error) {
        console.log("error in admin auth",error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong in admin auth plese try again later"
        })
    }
}

//user auth

exports.isUser = async (req,res,next) => {

    try {
        const userDetails = await User.findOne({ email: req.user.email });
        if(userDetails.accountType !== 'User'){
            return res.status(401).json({
                success:false,
                message:"You are not authorized to access this route this route is only for user"
            })
        }
        next();
    } catch (error) {
        console.log("error in user auth",error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong in user auth plese try again later"
        })
    }
}

// Influencer auth

exports.isInfluencer = async (req,res,next) => {

    try {
        const userDetails = await User.findOne({ email: req.user.email });
        if(userDetails.accountType !== 'Influencer'){
            return res.status(401).json({
                success:false,
                message:"You are not authorized to access this route this route is only for influencer"
            })
        }
        next();
    } catch (error) {
        console.log("error in influencer auth",error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong in influencer auth plese try again later"
        })
    }
}

// Hotel auth

exports.isHotel = async (req,res,next) => {

    try {
        const userDetails = await User.findOne({ email: req.user.email });
        if(userDetails.accountType !== 'Hotel'){
            return res.status(401).json({
                success:false,
                message:"You are not authorized to access this route this route is only for hotel"
            })
        }
        next();
    } catch (error) {
      console.log("error in hotel auth",error); 
        return res.status(500).json({
                success:false,
                message:"Something went wrong in hotel auth plese try again later"
            }) 
    }
}

