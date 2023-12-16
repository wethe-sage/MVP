const mongoose = require ('mongoose');

const subSectionSchema = mongoose.Schema({

    title:{
        type:String
    },
    description:{
        type:String
    }

})

module.exports = mongoose.model('SubSection',subSectionSchema);