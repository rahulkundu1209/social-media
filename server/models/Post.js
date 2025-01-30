const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  image: { type: String }, // Optional field for image URL
  createdAt: { type: Date, default: Date.now },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      username: { type: String, required: true },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Post", PostSchema);