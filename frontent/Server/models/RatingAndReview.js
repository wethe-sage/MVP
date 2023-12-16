const mongoose = require('mongoose');

const ratingAndReviewSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user",
	},
	rating: {
		type: Number,
		required: true,
	},
	review: {
		type: String,
		required: true,
	},
    listing:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Listing',
        index:true,
    },
    

})

module.exports = mongoose.model('RatingAndReview',ratingAndReviewSchema);