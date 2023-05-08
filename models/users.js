const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Required"],
    },
    email: {
        type: String,
        required: [true, "Required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Required"],
    },
    profilePicture: { type: String },
},
    {
        timestamps: true,
    },
);
module.exports= mongoose.model("users", userSchema); 
