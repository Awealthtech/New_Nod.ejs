const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Required"],
    },
    sub: {
        type: String,
        required: [true, "Required"],
        unique: true,
    },
    body: {
        type: String,
        required: [true, "Required"],
    },
    profilePicture: { type: String },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
      },
},
    {
        timestamps: true,
    },
);
module.exports= mongoose.model("post", postSchema); 
