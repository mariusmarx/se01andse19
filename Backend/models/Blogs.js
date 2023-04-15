const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: [true, "Please provide a heading"],
    },
    subheadline: {
        type: String,
        required: [true, "Please provide a heading"],
    },
    category: {
        type: String,
        required: [true, "Please provide a category"],
        enum: ['Training', 'Food', 'Other'],
    },
    textmain: {
        type: String,
        required: [true, "Please provide a text"],
    },
    createdAt: { type: Date, default: Date.now() },
    username: {
        type: String,
        required: [true, "Please provide your username"],
    },
    image:{
        type: String   
    },
    imageheading:{
        type: String   
    },
    image2:{
        type: String   
    }
})

const model = mongoose.model("Blog", BlogSchema);
module.exports = model;