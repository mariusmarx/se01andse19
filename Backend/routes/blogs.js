const express = require("express");
const router = express.Router();
const UserSchema = require("../models/Users.js")
const BlogSchema = require("../models/Blogs.js")
const { protect } = require("../middleware/auth.js");


router.get("/", async (req, res, next) => {

    try {
        const blogs = await BlogSchema.find({})

        res.status(200).json({ success: true, blogs });

    } catch (error) {
        res.status(500).send({ success: false, error: error.message });

    }
})

router.post("/blog",protect, async (req, res, next) => {
    const {heading,category,image,subheadline,textmain,imageheading,image2} = req.body

    try {

        const user = await UserSchema.findById(req.user._id);

        const blog = await BlogSchema.create({
            heading,
            category,
            image,
            subheadline,
            textmain,
            imageheading,
            image2,
            username:user.username
        })

        await blog.save()
        res.status(200).json({ success: true, message:"Blog saved!" });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });

    }

})

router.post("/getBlog",async (req, res, next) => {
    const {blogId } = req.body

    try {
        const blog = await BlogSchema.findById(blogId)

        res.status(200).json({ success: true, blog });

    } catch (error) {
        res.status(500).send({ success: false, error: error.message });

    }
})

router.put("/blog",protect, async (req, res, next) => {
    const {heading,category,image,blogId,subheadline,textmain,imageheading,image2} = req.body


    try {

        const user = await UserSchema.findById(req.user._id);

        const blog = await BlogSchema.findById(blogId)

        if (blog.username !== user.username){
            return res.status(401).send({ success: false, error: "Not authorized to edit this Blogpost!" });
        }

        blog.heading = heading
        blog.category = category
        blog.image = image
        blog.subheadline = subheadline
        blog.textmain = textmain
        blog.imageheading = imageheading
        blog.image2 = image2


        await blog.save()
        res.status(200).json({ success: true, message:"Blog updated!" });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });

    }

})

module.exports = router;
