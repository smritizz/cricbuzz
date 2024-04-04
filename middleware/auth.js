const jwt = require("jsonwebtoken"); 
const {promisify} =require("util");

exports.authenticateToken =async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (token == null) return res.sendStatus(401);

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.sendStatus(403);
  }
  
};

// Middleware to restrict access to admins
exports.requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.sendStatus(403);
  }
};
