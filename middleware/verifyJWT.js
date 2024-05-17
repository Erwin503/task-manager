const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    let token = req.headers['authorization'].split(' ')[1];
    if (token) {
        console.log("token");
    }
    const decoded = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decoded.id);
    req.user = { "email": decoded.email, "id": decoded.id }
    next();
}

module.exports = verifyJWT