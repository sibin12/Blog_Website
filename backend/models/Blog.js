const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
 
        title: {
            type: String,
            required: true,
            min: 4,
        },
        desc: {
            type: String,
            required: true,
            min: 8,
        },
     
        img: {
            type: String,
            required: true,
        },
       
   
    views: {
        type: Number, 
        default: 0,
    },
    likes: {
        type: [String],
        default: [],
    }
},{timestamps: true})

module.exports = mongoose.model("Blog", BlogSchema)