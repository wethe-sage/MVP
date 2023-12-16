const Listing = require('../models/Listing');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
require('dotenv').config();
const User = require('../models/User');
const Category = require('../models/Category');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');


// Create a new listing

exports.createListing = async (req, res) => {

    try {
        // fetch user id from request object
        const userId = req.user.id;

        // FETCH DATA FROM REQUEST BODY
        let{listingName,
            listingDescription,
            price,
            tag:_tag,
            address,
            duration,
            category,
            instructions:_instructions,
            status } = req.body;

        // get thumbnail image from request file
        const thumbnail = req.files.thumbnailImage;

        const tag = JSON.parse(_tag)
        const instructions = JSON.parse(_instructions)
    
        console.log("tag", tag)
        console.log("instructions", instructions)

        // validate request body
        if(!listingName || !listingDescription ||!price ||  !tag || !category || !instructions.length || !address || !duration || !thumbnail){
            return res.status(400).json({
                success: false,
                error: "Please provide all required fields"
            })
        }

        if (!status || status === undefined) {
			status = "Draft";
		}
        // check if user is influencer
        const creatorDetails= await User.findById(userId,{
            accountType:"Influencer"
        });
        console.log("Creator Details: ", creatorDetails);
        if(!creatorDetails){
            return res.status(400).json({
                success: false,
                error: "You are not authorized to create a listing"
            })
        }

        //check if the given category is valid

        const categoryDetails = await Category.findById(category);
		if (!categoryDetails) {
			return res.status(404).json({
				success: false,
				message: "Category Details Not Found",
			});
		}
        console.log("category: ", categoryDetails);
        // upload thumbnail image to cloudinary

        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
        console.log("Thumbnail Image: ", thumbnailImage);

        
        // create a new listing
        const newListing = await Listing.create({
            listingName,
            listingDescription,
            price,
            tag,
            category:categoryDetails._id,
            instructions,
            status:status,
            address,
            creator:creatorDetails._id,
            duration,
            thumbnail: thumbnailImage.secure_url,
        });
        console.log("New Listing: ", newListing);
        //add the new lsiitng to the user schema
        await User.findByIdAndUpdate({_id:creatorDetails._id},{
            $push:{listings:newListing._id}
        },{new:true});

        //add the new listing to the category schema
        const categoryDetails2 = await Category.findByIdAndUpdate(
            { _id: category },
            {
              $push: {
                listings: newListing._id,
              },
            },
            { new: true }
          )
          console.log("HEREEEEEEEE", categoryDetails2)

       

        // send response
        return res.status(201).json({
            success: true,
            message:"Listing created successfully",
            data: newListing
        })
    } catch (error) {
        console.log("Error creating listing: ", error);
        return res.status(500).json({
            success: false,
            message:"failed to create listing",
            error: error.message
        })
    }

}
//edit listing
exports.editListing = async (req, res) => {

    try {
        const {listingId} = req.body;
        const updates = req.body;
        const listing = await Listing.findById(listingId);

        //validate listing
        if(!listing){
            return res.status(404).json({
                success:false,
                error:"Listing not found"
            })
        }
        // if thubmnail image find upload to cloudinary

        if(req.files){
            console.log("thubmnail image ");
            const thumbnail = req.files.thumbnailImage;
            const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME); 
            listing.thumbnail = thumbnailImage.secure_url;
        }

        //uploade only the fields that are present in the request body
        for (const key in updates) {
            if(updates.hasOwnProperty(key)){
                if(key==="tag" || key==="instructions"){
                    listing[key] = JSON.parse(updates[key]);
                }else{
                    listing[key] = updates[key];
                }
            }
        }
        await listing.save();

        const updatedListing = await Listing.findOne({_id:listingId}).populate({path:"creator", populate:{path:"additionalDetails"}}).populate("category").populate({path:"listingContent",populate:{path:"subSection"}}).exec();

        // send response
        return res.status(200).json({
            success: true,
            message:"Listing updated successfully",
            data: updatedListing
        })
    } catch (error) {
        console.log("Error updating listing: ", error);
        return res.status(500).json({
            success: false,
            message:"failed to update listing",
            error: error.message
        })
    }
}
// get all listings

exports.getAllListings = async (req, res) => {

    try {
        const allListings = await Listing.find({status : "Published"},{listingName:true,listingDescription:true,price:true,instructions:true,address:true,thumbnailImage:true,ratingAndReviews:true}).populate('creator').exec();

        // send response
        return res.status(200).json({
            success: true,
            message:"All listings fetched successfully",
            data: allListings
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"failed to fetch all listings",
            error: error.message
        })
    }
}

// get listing details

exports.getListingDetails = async (req, res) => {

    try {
        const {listingId} = req.body;
        // find listing details
        const listingDetails = await Listing.findById(listingId).populate({path:"creator",
        populate:{path:"additionalDetails"}}).populate("listingContent").populate("category").exec();

                   //validate listing details
                     if(!listingDetails){
                          return res.status(404).json({
                            success:false,
                            error:"Listing not found"
                          })
                     }

             // send response
             return res.status(200).json({
                success: true,
                message:"Listing details fetched successfully",
                data: listingDetails
            })        
    } catch (error) {
        console.log("Error fetching listing details: ", error);
        return res.status(500).json({
            success: false,
            message:"failed to fetch listing details",
            error: error.message
        })
    }
}

//get full listing details

exports.getFullListingDetails = async (req, res) => {
 try {
    const {listingId} = req.body;
    const userId = req.user.id;

    // find listing details
    const listingDetails = await Listing.findOne({_id:listingId}).populate({path:"creator",
    populate:{
        path:"additionalDetails"
    }}).populate("category").populate({
        path:"listingContent",
        populate:{
            path:"subSections"
        }
    }).exec();

    //validate listing details
    if(!listingDetails){
        return res.status(404).json({
            success:false,
            error:"Listing not found"
        })
    }

    // return response
    return res.status(200).json({
        success: true,
        message:"Listing details fetched successfully",
        data: listingDetails
    })

 } catch (error) {
    console.log("Error fetching listing details: ", error);
    return res.status(500).json({
        success: false,
        message:"failed to fetch listing details",
        error: error.message
    })
 }

}

// get all listings by influencer

exports.getInfluencerListings = async (req, res) => {
try {
    const influencerId = req.user.id;

   // find all listings by influencer
    const influencerListings = await Listing.find({creator:influencerId}).sort({createdAt:-1});

    // send response
    return res.status(200).json({
        success: true,
        message:"Influencer listings fetched successfully",
        data: influencerListings
    })
} catch (error) {
    console.log("Error fetching influencer listings: ", error);
    return res.status(500).json({
        success: false,
        message:"failed to fetch influencer listings",
        error: error.message
    })
}
}

//delete listing

exports.deleteListing = async (req, res) => {
try {
    const {listingId} = req.body;

    // find listing details
    const listing = await Listing.findById(listingId);

    //validate listing details
    if(!listing){
        return res.status(404).json({
            success:false,
            error:"Listing not found"
        })
    }

    // unenroll users 
    const peopelBooked = listing.peopelBooked;
    for(const userId of peopelBooked){
        await User.findByIdAndUpdate(userId,{
            $pull:{listings:listingId}
        })
    }

    // delete section and subsections
    const listingSections = listing.listingContent;
    for(const sectionId of listingSections){
      const section=  await Section.findById(sectionId);
        if (section) {
            const subSections = section.subSection
            for (const subSectionId of subSections) {
              await SubSection.findByIdAndDelete(subSectionId)
            }
          }
    
          // Delete the section
          await Section.findByIdAndDelete(sectionId)
        }
        
        // delete listing
        await Listing.findByIdAndDelete(listingId);

        // send response
        return res.status(200).json({
            success: true,
            message:"Listing deleted successfully",
        })

} catch (error) {
    console.log("Error deleting listing: ", error);
    return res.status(500).json({
        success: false,
        message:"failed to delete listing",
        error: error.message
    })
}

}