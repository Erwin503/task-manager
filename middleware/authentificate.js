const jwt = require('jsonwebtoken');
const { User } = require('../models/models');
require('dotenv').config();

const authenticate = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ data: null, message: 'No token provided' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ data: null, message: 'Failed to authenticate token' });
        }

        try {
            const user = await User.findByPk(decoded.id);
            if (!user) {
                return res.status(404).json({ data: null, message: 'User not found' });
            }
            req.user = user;
            next();
        } catch (error) {
            res.status(500).json({ data: null, message: error.message });
        }
    });
};

module.exports = authenticate;
