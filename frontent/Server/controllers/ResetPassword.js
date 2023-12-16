const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

//reset password token

exports.resetPasswordToken = async (req, res) => {

    try {
        const email = req.body.email;
    const user = await User.findOne({ email: email });
    
    if (!user) {
      return res.json({
        success: false,
        message: `This Email: ${email} is not Registered With Us. Enter a Valid Email.`,
      });
    }
        const token = crypto.randomBytes(20).toString('hex');

        await User.findOneAndUpdate({email},{token,resetPasswordExpires:Date.now()+3600000});

        const url =`http://localhost:5173/update-password/${token}`;

        await mailSender(
            email,
            "Password Reset",
            `Your link for password reset is ${url}. Please click this URL to reset your password.`,
        );

        return res.status(200).json({
            success:true,
            message:"Reset password link sent to your email address"

        });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success:false,
            message:"Failed to send reset password link",
            error:error.message
        });
    }
}

//reset password

exports.resetPassword = async (req, res) => {

    try {
        const {password, confirmPassword ,token} = req.body;

        if(!password || !confirmPassword){
            return res.status(400).json({
                success:false,
                error:"Please fill all the fields"
            });
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                error:"Password and confirm password do not match"
            });
        }

        const userDetails= await User.findOne({token:token});
        if(!userDetails){
            return res.status(404).json({
                success:false,
                error:"Invalid token"
            });
        }

        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success:false,
                error:"Token expired please regenerate token"
            });
        }

        const encryptedPassword = await bcrypt.hash(password, 12);
        await User.findOneAndUpdate({token:token},
            {password:encryptedPassword,
                token:null,
                resetPasswordExpires:null},{new:true});

        return res.status(200).json({
            success:true,
            message:"Password updated successfully"
        });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success:false,
            error:"Failed to update password"
        });
    }
}