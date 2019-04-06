const secret = process.env.JWT_TOKEN_SECRET
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];

    if (token) {
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
        }
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: "Token is not valid"
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(500).send({
            success: false,
            message: "Auth token is not supplied"
        });
    }
};