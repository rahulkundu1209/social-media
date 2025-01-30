const express = require("express");
const multer = require("multer");
const Post = require("../models/Post");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Multer setup for image upload (optional)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Create a new post
router.post("/create", authenticateToken, upload.single("image"), async (req, res) => {
  try {
    const { content } = req.body;
    const imagePath = req.file ? req.file.path : null;

    if (!content) return res.status(400).json({ msg: "Content is required" });

    const newPost = new Post({
      user: req.user.id, // Retrieved from token
      content,
      image: imagePath,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all posts (Public)
router.get("/all", async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "username email").sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get posts by a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;