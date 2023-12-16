const express = require('express');
const router = express.Router();

// controllers

// listing controllers
const {createListing,getAllListings,getListingDetails,editListing,deleteListing, getInfluencerListings, getFullListingDetails} = require('../controllers/Listing');

//category controllers
const {createCategory,showAllCategories,categoryPageDetails} = require('../controllers/Category');

//section controllers
const {createSection,updateSection,deleteSection} = require('../controllers/Section');

//subsection controllers
const {createSubSection,updateSubSection,deleteSubSection} = require('../controllers/Subsection');

//rating controllers
const {createRating,getAverageRating,getAllRatingAndReviewOnPlatform} = require('../controllers/RatingAndReviews');

//middleware
const {auth,isAdmin,isUser,isInfluencer,isHotel} = require('../middelwares/auth');

/////////////////////////////////////////////////////////////////////////

// routes

// listing routes
router.post("/create-listing",auth,isInfluencer,createListing);
//add sections
router.post("/add-section",auth,isInfluencer,createSection);
//update section
router.post("/update-section",auth,isInfluencer,updateSection);
//delete section
router.post("/delete-section",auth,isInfluencer,deleteSection);
// edit sub section
router.post("/updateSubSection",auth,isInfluencer,updateSubSection);
// delete sub section
router.post("/deleteSubSection",auth,isInfluencer,deleteSubSection);
// add sub section
router.post("/add-subsection",auth,isInfluencer,createSubSection);
// get all listings
router.get("/get-all-listings",getAllListings);
// get listing details of a particular listing
router.post("/get-listing-details",getListingDetails);
// edit listing
router.post("/edit-listing",auth,isInfluencer,editListing);
// delete listing
router.delete("/delete-listing",auth,isInfluencer,deleteListing);
// get all influencer listing
router.get("/get-all-influencer-listings",auth,isInfluencer,getInfluencerListings);
// getFullListingDetails
router.post("/getFullListingDetails",auth,getListingDetails);


/////////////////////////////////////////////////////////////////////////

// category routes

// create category
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)


/////////////////////////////////////////////////////////////////////////

// rating and reviews routes

// create rating and review
router.post("/create-rating",auth,isUser,createRating);
// get average rating
router.post("/get-average-rating",auth,isUser,getAverageRating);
// get all rating and reviews on platform
router.get("/get-all-rating-and-reviews-on-platform",auth,isAdmin,getAllRatingAndReviewOnPlatform);


module.exports = router;