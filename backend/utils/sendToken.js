const jwt = require('jsonwebtoken')

exports.sendToken = async (user, statusCode, res) => {
    try {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '2d' 
        });

        const options = {
            httpOnly: true,
            maxAge: 48 * 60 * 60 * 1000, 
        };

        res.status(statusCode).cookie('token', token, options).json({
            success: true,
            user,
            token
        });
    } catch (error) {
        console.log(error);
    }
};
