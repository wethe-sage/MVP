const RatingAndReviews = require("../models/RatingAndReview");
const User = require('../models/User');
const Listing = require('../models/Listing');
const {mongo , default:mongoose} = require('mongoose');
require('dotenv').config();

//create rating and review

exports.createRating = async (req, res) => {

    try {
        //fetch data
        const userId = req.user.id;
        //extract listing id rating and review from body
        const {listingId, rating, review} = req.body;
        console.log("listingId", listingId);

        //validate request body
        if(!listingId || !rating || !review){
            return res.status(400).json({
                success:false,
                message:"Please provide all required fields",
            });
        }

        //check if user has booked the listing
        const listingDetails = await Listing.findById({_id:listingId, bookedBy:userId });

        console.log("listingDetails", listingDetails);

        if(!listingDetails){
            return res.status(404).json({
                success:false,
                error:"You have not booked this listing"
            });
        }

        //check if user has already reviewed the listing
        const reviewDetails = await RatingAndReviews.findOne({listingId, userId});
        if(reviewDetails){
            return res.status(400).json({
                success:false,
                error:"You have already reviewed this listing"
            });
        }

        //create review
        const ratingReview =await RatingAndReviews.create({listingId, userId, rating, review});

        // update the listing rating
        const updatedListingDetails = await Listing.findByIdAndUpdate(listingId, {
            $push:{ratingsAndReviews:ratingReview._id}
        }, {new:true});

        //send response
        return res.status(200).json({
            success:true,
            message:"Review created successfully"
        });

    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success:false,
            message:"Failed to create review",
            error:error.message
        });
    }   

}

// get average rating of a listing

exports.getAverageRating = async (req, res) => {

    try {
        // fetch listing id from body
        const listingId = req.body.listingId;

        //calculate average rating
        const result = await RatingAndReviews.aggregate([
            {
                $match:{listingId:mongoose.Types.ObjectId(listingId)}
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"}
                }
            }
        ]);

        //validate
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            });
        }

        // if no rating found
        return res.status(200).json({
            success:true,
            message:"No rating found",
            averageRating:0
        });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success:false,
            error:"Failed to get average rating"
        });
    }
}

// get all reviews on the platform

exports.getAllRatingAndReviewOnPlatform = async (req, res) => {

    try {
        const allReviews = await RatingAndReviews.find({}).populate({
            path:"user",
            select:"firstName lastName email image"
        }).populate({
            path:"listing",
            select:"listingName"
        }).exec();

        //send response
        return res.status(200).json({
            success:true,
            message:"Reviews fetched successfully",
            allReviews
        });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success:false,
            error:"Failed to get reviews"
        });
    }

}