const Section = require('../models/Section');
const Listing = require('../models/Listing');
const SubSection = require('../models/SubSection');
require('dotenv').config();

// Create a new section

exports.createSection = async (req, res) => {

    try {
        // FETCH DATA FROM REQUEST BODY
        const {sectionName, listingId} = req.body;

        // validate request body
        if(!sectionName || !listingId){
            return res.status(400).json({
                success: false,
                error: "Please provide all required fields"
            })
        }

        //create a new section
        const newSection = await Section.create({
            sectionName
        });
        console.log("New Section: ", newSection);

        // update Listing with new section
        const listing = await Listing.findByIdAndUpdate(listingId, {
            $push: {listingContent: newSection._id}
        }, {new: true}).populate({
            path: "listingContent",
            populate: {
                path: "subSection"
            }
        }).exec();

        // send response

        return res.status(201).json({
            success: true,
            message:"Section created successfully",
            data: listing
        })

    } catch (error) {
        console.log("Error creating section: ", error);
        return res.status(500).json({
            success: false,
            message:"failed to create section",
            error: error.message
        })   
    }
}

// update a section

exports.updateSection = async (req, res) => {

    try {
       //data from request body
         const {sectionName, sectionId,listingId} = req.body; 

        //update section

        const section = await Section.findByIdAndUpdate(sectionId, {
            sectionName
        }, {new: true});

        // find the updated lsiting and send response

        const listing = await Listing.findById(listingId).populate({
            path: "listingContent",
            populate: {
                path: "subSection"
            }
        }).exec();

        // send response


        return res.status(201).json({
            success: true,
            message:section,
            data: listing
        })

    } catch (error) {
        console.log("Error updating section: ", error);
        return res.status(500).json({
            success: false,
            message:"failed to update section",
            error: error.message
        })
    }
}

// delete a section

exports.deleteSection = async (req, res) => {

    try {
        //data from request body
        const {sectionId,listingId} = req.body;

        await Listing.findByIdAndUpdate(
            { _id: listingId },
            {
              $pull: {
                listingContent: sectionId,
              },
            }
          )
        const section = await Section.findById(sectionId);
        console.log("Section: ", sectionId , listingId);

        if(!section){
            return res.status(404).json({
                success: false,
                error: "Section not found"
            })
        }

        // delete sub sections
        await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

        // find the updated lsiting and send response
        const listing = await Listing.findById(listingId).populate({
            path: "listingContent",
            populate: {
                path: "subSection"
            }
        }).exec();

        return res.status(201).json({
            success: true,
            message:"Section deleted successfully",
            data: listing
        })

    } catch (error) {
        console.log("Error deleting section: ", error);
        return res.status(500).json({
            success: false,
            message:"failed to delete section",
            error: error.message
        });   
    }
}