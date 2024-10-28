// controllers/authController.js
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

const { JWT_SECRET, JWT_EXPIRATION } = process.env;

// Generate JWT Token
const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

// Register
const signup = async (req, res) => {
    try {
        const { name, username, password } = req.body;
        if (!name || !username || !password) {
            return res.status(400).json({
                success: false,
                msg: "All fields are mandatory!",
            });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists!',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ name, username, password: hashedPassword });

        res.status(200).json({
            success: true,
            msg: "User registered successfully!",
            user: { id: newUser._id, name: newUser.name, username: newUser.username }
        });
    } catch (error) {
        res.status(500).json({ msg: 'Registration failed', error });
    }
};

// Login
const signin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                msg: "All fields are mandatory!",
            });
        }

        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const payload = {
            id: user._id,
            name: user.name,
            username: user.username,
        };
        const token = generateToken(payload);

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
        };

        user.password = null;
        res.cookie("token", token, options)
           .status(200)
           .json({
               success: true,
               msg: "Signed in successfully!",
               user: { id: user._id, name: user.name, username: user.username },
               token: token,
           });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error });
    }
};

module.exports = { signup, signin };
