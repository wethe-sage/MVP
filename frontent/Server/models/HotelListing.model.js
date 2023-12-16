const mongoose = require('mongoose');

const hotelListingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            
        },  
        description:{
            type: String,
            required: true,
        },
         address:{
            type: String,
            required: true
        },
        distanceFromFamousLocation:{
            type: String,
            required: true,
        },
        regularPrice:{
            type: Number,
            required: true,
        }, 
        discountPrice:{
            type: Number,
            required: true,
        }, 
        food:{
            type: Boolean,
            required: true,
        },
        bedrooms:{
            type: Number,
            required: true,
        },
        roomService:{
            type: Boolean,
            required: true,
        },
        parking:{
            type: Boolean,
            required: true,
        },
        powerBackup:{
            type: Boolean,
            required: true,
        },
        houseKeeping:{
            type: Boolean,
            required: true,
        },
        offer:{
            type:Boolean,
            required: true,
        },
        imageUrls:{
            type: Array,
            required: true,
        },
        userRef:{
            type:String,
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model('HotelListing', hotelListingSchema);