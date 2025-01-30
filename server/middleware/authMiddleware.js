const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ msg: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid token" });
  }
}

module.exports = { authenticateToken };
