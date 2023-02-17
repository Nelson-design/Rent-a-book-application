const authController = require("./auth.controller");

const indexController = (req, res) => {
    return res.status(200).json({
        message: "Welcome to book collection page",
    });
};

const notFoundController = (req, res) => {
    return res.status(400).json({
        message: "Bad Request"
    });
};

module.exports = {
    authController,
    indexController,
    notFoundController,
}