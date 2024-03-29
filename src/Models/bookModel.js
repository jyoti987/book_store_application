const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    excerpt: {
        type: String,
        required: true,
        trim:true
    },
    userId: {
        type: ObjectId,
        ref: "User",
        required: true,
        trim:true
    },
    ISBN: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    category: {
        type: String,
        required: true,
        trim:true
    },

    subcategory: {
        type: String,
        required: true,
        trim:true
    },

    reviews: {
        type: Number,
        default: 0
        
    },
    deletedAt: {
        type: Date,
        default: null
        
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    releasedAt: {
        type: Date,
        required: true
    },
    Price: {
        type: Number,
        default: 0,
        required: true
    }

}, { timestamp: true })



module.exports = mongoose.model("Book", bookSchema);