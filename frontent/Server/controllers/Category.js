const Listing = require('../models/Listing');
const Category = require("../models/Category");
require('dotenv').config();

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

// Create a new category

exports.createCategory = async (req, res) => {
    try {
        const{name ,description}= req.body;
    
        //validation
        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        //create category in db
        const CategoryDetails = await Category.create({
            name:name,
            description:description
        });
        console.log("categoryDetails", CategoryDetails);

        //send response
        return res.status(200).json({
            success: true,
            message: "Category created successfully"
        });
          

    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            success: false,
            message:"Failed to create category",
            error:error.message
        }); 
    }

}

// get all categories

exports.showAllCategories = async (req, res) => {

    try {
        const allCategory = await Category.find({},{name:true,description:true});

        // send response
        return res.status(200).json({
            success: true,
            message:"All categories",
            data: allCategory
        })
    } catch (error) {
        console.log("Error getting all categories: ", error);
        return res.status(500).json({
            success: false,
            message:"failed to get all categories",
            error: error.message
        })
    }
}

// get category details

exports.categoryPageDetails = async (req, res) => {
    try {
        // FETCH DATA FROM REQUEST BODY
        const { categoryId } = req.body;

        // Get listing from category
        const selectedCategory = await Category.findById(categoryId).populate({
            path: 'listings',
            match: { status: "Published" },
            populate: "ratingAndReviews",
        }).exec();

        // Validate category details
        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                error: "Category not found"
            });
        }

        // Get all categories except the selected one
        const categoriesExceptSelected = await Category.find({ _id: { $ne: categoryId } });

        // Ensure there's at least one category to choose from
        if (categoriesExceptSelected.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No other categories found"
            });
        }

        // Choose a random category from the remaining ones
        const randomCategoryId = categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id;

        // Populate the listings of the chosen category
        const differentCategory = await Category.findById(randomCategoryId).populate({
            path: "listings",
            match: { status: "Published" },
            populate: "ratingAndReviews",
        }).exec();

        // Top selling listings across all categories
        const allCategories = await Category.find().populate({
            path: "listings",
            match: { status: "Published" },
            populate:{
                path:"creator",
            }
        }).exec();

        const allListings = allCategories.flatMap((category) => category.listings);
        const topSellingListing = allListings.sort((a, b) => b.sold - a.sold).slice(0, 10);
        

        // Send response
        return res.status(200).json({
            success: true,
            message: "Category details",
            data: {
                selectedCategory,
                differentCategory,
                topSellingListing
                
            }
        });

    } catch (error) {
        console.log("Error getting category details: ", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get category details",
            error: error.message
        });
    }
};

