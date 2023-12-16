const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
require('dotenv').config();

// Create a new subsection

exports.createSubSection = async (req, res) => {

    try {
        // FETCH DATA FROM REQUEST BODY
        const {sectionId, title, description} = req.body;

        
        if(!sectionId  ){
            return res.status(400).json({
                success: false,
                error: "Please provide all required fields"
            })
        }
        

        //create a new subsection
        const SubSectionDetails = await SubSection.create({
            title,
            description,
        });

        // update Section with new subsection
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $push: { subSection: SubSectionDetails._id } },
            { new: true }
          ).populate("subSection");

        // send response
        return res.status(201).json({
            success: true,
            message:"SubSection created successfully",
            data:updatedSection
        })
        
    } catch (error) {
        console.log("Error creating SubSection: ", error);
        return res.status(500).json({
            success: false,
            message:"failed to create SubSection",
            error: error.message
        })
        
    }
}

// update a subsection

exports.updateSubSection = async (req, res) => {

    try {
        //data from request body

        const {title, description, sectionId, subSectionId} = req.body;
        const subSection = await SubSection.findById(subSectionId);

       

        if(!subSection){
            return res.status(404).json({
                success: false,
                error: "SubSection not found"
            })
        }

        if(title !== undefined){
            subSection.title = title;
        }
        if(description !== undefined){
            subSection.description = description;
        }
        

        //update section
        await subSection.save();
        const updatedSection = await Section.findById(sectionId).populate("subSection");

        // send response
        return res.status(201).json({
            success: true,
            message:"SubSection updated successfully",
            data: updatedSection
        })
    } catch (error) {
        console.log("Error updating SubSection: ", error);
        return res.status(500).json({
            success: false,
            message:"failed to update SubSection",
            error: error.message
        })
    }
}

// delete a subsection

exports.deleteSubSection = async (req, res) => {

    try {
        // data from request body
        const {sectionId, subSectionId} = req.body;
        await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
              $pull: {
                subSection: subSectionId,
              },
            }
          )
        const subSection = await SubSection.findByIdAndDelete({_id:subSectionId});

        // send response
        if(!subSection){
            return res.status(404).json({
                success: false,
                error: "SubSection not found"
            })
        }

        const updatedSection = await Section.findById(sectionId).populate("subSection");

        return res.status(201).json({
            success: true,
            message:"SubSection deleted successfully",
            data: updatedSection
        })
    } catch (error) {
        console.log("Error deleting SubSection: ", error);
        return res.status(500).json({
            success: false,
            message:"failed to delete SubSection",
            error: error.message
        })
    }
}