const joi = require("joi");

// Sign up validation

const signupSchema = joi.object({
    username: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().min(8).required(),
});

const validateSignupData = (data) => {
    let { error: err, value } = signupSchema.validate(data);
    return { err, value };
};

const validateSignupMiddleware = (req, res, next) => {
    try {
        let { error, value } = signupSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error,
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            message: "server issues"
        });
    }
};

// Login validation Data

const LoginSchema = joi.object({
    username: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().min(8).required(),
}).or("email", "username");

const validateLoginMiddleware = (req, res, next) => {
    try {
        let { error, value } = LoginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error,
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            message: "Server issue",
        });
    }
};

// Password change validation

const passwordChangeSchema = joi.object({
    oldPassword: joi.string().min(8).required(),
    password: joi.string().min(8).required(),
});

const validatePasswordChangeMiddleware = (req, res, next) => {
    try {
        let { error, value } = passwordChangeSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error,
            });
        }
        console.log(value);
        next();
    } catch (err) {
        return res.status(500).json({
            message: "Server issue",
        });
    }
};

module.exports = {
    validateSignupData,
    validateSignupMiddleware,
    validateLoginMiddleware,
    validatePasswordChangeMiddleware
};