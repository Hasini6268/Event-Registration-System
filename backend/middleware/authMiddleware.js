const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;

        // Debugging
        console.log("Authorization Header:", authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided."
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        // Debugging
        console.log("Extracted Token:", token);

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Debugging
        console.log("Decoded User:", decoded);

        // Attach user data to request
        req.user = decoded;

        next();

    } catch (error) {
        console.log("JWT Verification Error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
};

module.exports = { protect };