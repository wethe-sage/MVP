const mongoose= require('mongoose');

const listingSchema = mongoose.Schema({

    listingName:{
        type:String,
        required:true,
        trim:true,
    },
    listingDescription:{
        type:String,
        trim:true,
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    listingContent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Section',
    }],
    ratingAndReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'RatingAndReview',
    }],
    price:{
        type:Number,
    
    },
    thumbnail:{
        type:String,    
    },
    
    imageUrls:{
        type:Array,
    },
    address:{
        type: String,
    },
    duration:{
        type: String,   
    },
    tag:{
        type:[String],
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
    },
    peopelBooked:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],
    instructions:{
        type:[String],
    },
    status:{
        type:String,
        enum:["Draft","Published"],
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    //what you will learn from this trip
    //what you will get from this trip

})

module.exports = mongoose.model('Listing',listingSchema);