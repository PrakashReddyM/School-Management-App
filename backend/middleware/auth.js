const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ message: 'Please Login to access this resource' });
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedData.id);
        
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = isAuthenticated
