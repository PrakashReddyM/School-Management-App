const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { sendToken } = require('../utils/sendToken.js');

// Register
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'Please Enter All the Details' });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User Already exists, Login' });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            name,
            email,
            password: hashPassword,
            role
        });

        sendToken(user, 201, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please Enter All the Details' });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid Email or Password' });
        }

        const isPassMatched = await bcrypt.compare(password, user.password);
        if (!isPassMatched) {
            return res.status(401).json({ message: 'Incorrect Email or Password' });
        }

        sendToken(user, 200, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Logout
exports.logout = async (req, res) => {
    try {
        res.status(200).cookie('token', null, { maxAge: 0 }).json({
            success: true,
            message: 'Logged out Successfully'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
