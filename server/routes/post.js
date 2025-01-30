const express = require("express");
const multer = require("multer");
const Post = require("../models/Post");
const User = require("../models/User");
const { authenticateToken } = require("../middleware/authMiddleware");
const path = require("path");

const router = express.Router();

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Create a new post
router.post("/create", authenticateToken, upload.single("image"), async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ msg: "Content is required" });

    const newPost = new Post({
      user: req.user.id,
      content,
      image: req.file ? req.file.filename : null, // Store image filename
      //add the likes and comments fields
      likes: [],
      comments: [],
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Serve uploaded images as static files
router.use("/uploads", express.static("uploads"));

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

//Handle like post
router.post("/like/:postId", authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    if (post.likes.includes(req.user.id)) {
      post.likes = post.likes.filter((userId) => userId.toString() !== req.user.id);
    } else {
      post.likes.push(req.user.id);
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Handle add comment
router.post("/comment/:postId", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('username');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const newComment = {
      user: req.user.id,
      username: user.username, // Add username to the comment
      text: req.body.text,
    };

    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    post.comments.push(newComment);
    await post.save();

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;