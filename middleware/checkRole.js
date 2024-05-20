const { User } = require('../models/models');

const checkRole = (requiredRole) => {
    return async (req, res, next) => {
        try {
            const user = await User.findByPk(req.userId); // Предполагается, что userId хранится в req после аутентификации

            if (user && user.role === requiredRole) {
                next();
            } else {
                res.status(403).json({ data: null, message: "Access denied. Only teachers are allowed to perform this action." });
            }
        } catch (error) {
            res.status(500).json({ data: null, message: error.message });
        }
    };
};

module.exports = checkRole;
