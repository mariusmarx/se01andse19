const express = require("express");
const router = express.Router();
const UserSchema = require("../models/Users.js")
const { protect } = require("../middleware/auth.js");

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, token });
};


router.post("/register", async (req, res, next) => {
    const { username, password, email } = req.body;

    try {
        const user = await UserSchema.create({
            username,
            password,
            email
        });

        await user.save();

        sendToken(user, 201, res);
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});

router.post("/login", async (req, res, next) => {
    let { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ success: false, error: "Please provide email and password" });
    }
    email = email.toLowerCase();

    try {
        // Check that user exists by email
        const user = await UserSchema.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).send({ success: false, error: "Invalid credentials" });

        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).send({ success: false, error: "Invalid credentials" });
        }

        sendToken(user, 200, res);
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});

router.get("/username", protect, async (req, res, next) => {
    try {
        const user = await UserSchema.findById(req.user._id);
        res.status(200).json({ success: true, username: user.username });

    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
})

module.exports = router;
