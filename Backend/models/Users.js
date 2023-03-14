const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide email address"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false,
    },
    username:{
      type: String,
      required: [true, "Please provide your username"],
      unique: true,
    }


})
//damit passwort verschlüsselt in der datenbank vorliegt
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
//hier bekommt user unique id damit wir wissen dass der eingeloggt ist
UserSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };


const model = mongoose.model("User", UserSchema);
module.exports = model;