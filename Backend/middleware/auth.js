const jwt = require("jsonwebtoken");
const UserSchema = require("../models/Users.js");

exports.protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return res.status(401).send({ success: false, error: "Not authorized to acces this route " });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserSchema.findById(decoded.id);

        if (!user) {
            return res.status(404).send({ success: false, error: "No user found with this id" });

        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).send({ success: false, error: "Not authorized to acces this route" });
    }
};
