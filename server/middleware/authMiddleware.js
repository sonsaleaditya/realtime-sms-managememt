//middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const { JWT_SECRET } = process.env;

const authenticate = (req, res, next) => {
    let token;

    // Check for token in cookies or Authorization header
    if (req.cookies.token) {
        token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        console.error('Token verification error:', error); // Log the error for debugging
        return res.status(401).json({
            success: false,
            msg: "Invalid or expired token, please log in again.",
        });
    }
};

module.exports = authenticate;
