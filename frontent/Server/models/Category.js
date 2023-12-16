const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    listings:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Listing'
        }
    ]

})

module.exports = mongoose.model('Category',categorySchema); 