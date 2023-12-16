const User = require("../models/User");
const Profile = require("../models/Profile");
const Listing = require("../models/Listing");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();

exports.updateProfile = async (req, res) => {
    try {
      const {
        firstName = "",
        lastName = "",
        dateOfBirth = "",
        about = "",
        contactNumber = "",
        gender = "",
      } = req.body
      const id = req.user.id
  
      // Find the profile by id
      const userDetails = await User.findById(id)
      const profile = await Profile.findById(userDetails.additionalDetails)
  
      const user = await User.findByIdAndUpdate(id, {
        firstName,
        lastName,
      })
      await user.save()
  
      // Update the profile fields
      profile.dateOfBirth = dateOfBirth
      profile.about = about
      profile.contactNumber = contactNumber
      profile.gender = gender
  
      // Save the updated profile
      await profile.save()
  
      // Find the updated user details
      const updatedUserDetails = await User.findById(id)
        .populate("additionalDetails")
        .exec()
  
      return res.json({
        success: true,
        message: "Profile updated successfully",
        updatedUserDetails,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        error: error.message,
      })
    }
  }

// delete profile

exports.deleteProfile = async (req, res) => {

    try {
        const id = req.user.id;

        //validate
        const user = await User.findById({_id:id});
        if(!user){
            return res.status(404).json({
                success:false,
                error:"User not found"
            });
        }

        //delete profile
        await Profile.findByIdAndDelete({
            _id: new mongoose.Types.ObjectId(user.additionalDetails),
          })

          for (const listingId of user.listings){
            await Listing.findByIdAndUpdate(
                listingId,
                { $pull: { peopelBooked: id } },
                { new: true }
              )
            }
            // Delete the user
            await User.findByIdAndDelete({_id: id})

        res.status(200).json({
            success:true,
            message:"Profile deleted successfully"
        });


    } catch (error) {
        console.log("error",error);
        return res.status(500).json({
            success:false,
            error:"failed to delete profile"
        });
    }
}

//get all user details

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec()
    console.log(userDetails)
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//update profile image

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

//get booked listing by user

exports.getBookedListingByUser = async (req, res) => {

    try {
        const userId = req.user.id
    let userDetails = await User.findOne({
      _id: userId,
    }).populate({
        path:"listings",
        populate:{
            path:"listingContent",
            populate:{
                path:"subsection",
            }
          }
    }).exec();
    userDetails = userDetails.toObject()
    var SubsectionLength = 0
    for (var j  =0; j<userDetails.bookedListing[i].listingContent.length; j++){
        SubsectionLength += userDetails.bookedListing[i].listingContent[j].subsection.length
    }

        if(!userDetails){
            return res.status(404).json({
                success:false,
                error:`User not found of id ${userDetails}`
            });
        }

        res.status(200).json({
            success:true,
            data:userDetails.bookedListing
        });
    } catch (error) {
        console.log("error",error);
        return res.status(500).json({
            success:false,
            error:"failed to get booked listing"
        });
    }

}

//get influencer dashboard

exports.influencerDashboard = async (req, res) => {

        try {
            const listingDetails = await Listing.find({ creator: req.user.id });

            const listingData= listingDetails.map((listing) => {
                const totalPeopleBooked = listing.peopelBooked.length;
                const totalAmountGenerated = totalPeopleBooked * listing.price;

                // creeate a new object with the additional fields
                const listingDataWithStats = {
                    _id: listing._id,
                    listingName: listing.listingName,
                    listingDescription: listing.listingDescription,
                    totalPeopleBooked,
                    totalAmountGenerated,
                };
                return listingDataWithStats;
            });
            res.status(200).json({
                success:true,
                data:listingData
            });
            
        }  catch (error) {
            console.error(error)
            res.status(500).json({ message: error.message})
          }
}