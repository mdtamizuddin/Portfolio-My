const jwt = require('jsonwebtoken')
require('dotenv').config()

function verifyJWT(req, res, next) {
    const token = req.headers.auth;
    if (!token) {
        return res.send({ varifyed: false });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
        if (err) {
            return res.send({ varifyed: false })
        }
        req.decoded = decoded;
        next();
    });
}

module.exports = verifyJWT
