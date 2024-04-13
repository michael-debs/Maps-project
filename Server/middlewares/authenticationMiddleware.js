const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

async function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader;

  // Return 401 if token is not provided
  if (!token) {
    return res.status(401).json({ message: "Access token is required" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
}

module.exports = {
  authenticateToken,
};
