const { decodeToken } = require("../utils/token-helper");

const validateToken =
  (allowedPath = []) =>
  (req, res, next) => {
    if (allowedPath.includes(req.path)) {
      return next();
    }

    // Get the token from the Authorization header
    let token = req.headers["x-access-token"] || req.headers["authorization"];

    console.log(token);

    const decoded = decodeToken(token, "access");

    // If there is no token, return an error
    if (!decoded) {
      return res.status(403).json({
        success: false,
        message: "A token is required for authentication",
      });
    }

    // Try to verify the token
    try {
      req.user = decoded; // Add the decoded token to the request object
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    return next(); // Proceed to the next middleware or route handler
  };

module.exports = { validateToken };
