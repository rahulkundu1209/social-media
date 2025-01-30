const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  image: { type: String }, // Optional field for image URL
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);