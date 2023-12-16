const express = require('express');
const router = express.Router();
const {auth, isInfluencer} = require('../middelwares/auth');

// controllers
const{updateProfile,deleteProfile,getAllUserDetails,updateDisplayPicture,getBookedListingByUser,influencerDashboard} = require('../controllers/Profile');

// routes

// update profile
router.put("/update-profile",auth,updateProfile);
// delete profile
router.delete("/delete-profile",auth,deleteProfile);
// get all user details
router.get("/get-all-user-details",auth,getAllUserDetails);
// update display picture
router.put("/update-display-picture",auth,updateDisplayPicture);
// get booked listing by user
router.get("/get-booked-listing-by-user",auth,getBookedListingByUser);

// influencer dashboard
router.get("/influencerDashboard",auth,isInfluencer,influencerDashboard);

module.exports = router;
