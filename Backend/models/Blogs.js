const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: [true, "Please provide a heading"],
    },
    category: {
        type: String,
        required: [true, "Please provide a category"],
        enum: ['Tech', 'Product', 'Design'],
    },
    text: {
        type: String,
        required: [true, "Please provide a text"],
    },
    createdAt: { type: Date, default: Date.now() },
    username: {
        type: String,
        required: [true, "Please provide your username"],
    },
})

const model = mongoose.model("Blog", BlogSchema);
module.exports = model;