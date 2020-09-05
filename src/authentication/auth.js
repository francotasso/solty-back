const config = require("../config/base");
const jwt = require("jsonwebtoken");

const authenticateUser = {};

/*
  Validate if token is valid
*/
authenticateUser.isAuthenticated = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send({
            succes: false,
            message: "Forbidden access token not provided"
        });
    }

    // Get token string from Bearer token
    const token = req.headers.authorization.split(" ")[1];

    // Validate if token exist
    if (token) {
        // Validate if token is valid
        jwt.verify(token, config.USER_SECRET_TOKEN, (err, user) => {
            if (err) {
                return res.status(403).json({
                    succes: false,
                    message: "Failed authentication token does not exist"
                });
            } else {
                req.user = user;
                next();
            }
        });
    }
};

module.exports = authenticateUser;