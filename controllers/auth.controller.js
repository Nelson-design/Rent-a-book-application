const ejs = require("ejs");
const crypto = require("crypto");
const path = require("path");
const { SendEmail } = require("./Services");
const { User } = require("../models/user.model");

const SignupController = async (req, res) => {
    try { // Check if user is already exist
        let userExist = await User.findOne({
            $or: [{ email: req.body.email }, { username: req.body.username }],
        });

        if (userExist) {
            return res.status(400).json({
                message: "Account exist, Login Instead",
            });
        }

        const user = new User(req.body);
        const token = user.generateToken();
        await user.save(function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(result)
            }
        });
        
        return res.status(201).json({
            message: "Account Created",
            user: {
                _id: user._id,
                fullname: user.fullname,
                username: user.username,
                email: user.email,
            },
            token,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Server Issue",
        });
    }
};
const LoginController = async (req, res) => {
    try {
      // Make a call to the db to check if user exist
      let userExist = await User.findOne({
        $or: [{ email: req.body.email }, { username: req.body.username }],
      });
  
      // Return error to client if user has no account
      if (!userExist) {
        return res.status(404).json({
          message: "You have no account. signup instead",
        });
      }
  
  
      //Check if the password is authentic
      const passwordCorrect = userExist.checkPassword(req.body.password);
  
      if (!passwordCorrect) {
        return res.status(400).json({
          message: "incorrect password",
        });
      }
  
      // generate token
      const token = userExist.generateToken();
  
      // send token and user data to client
      return res.status(200).json({
        message: "login successful",
        token,
        user: {
          _id: userExist._id,
          fullName: userExist.fullName,
          email: userExist.email,
          phone: userExist.phone,
          username: userExist.username,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "internal server issues",
      });
    }
  };

const changePasswordController = async (req, res, next) => {
    try {
        // Get request body 
        const { password, oldPassword } = req.body;

        // Find user with id inside of token 
        const user = await User.findById(req.user._id);

        // Verify the old password
        let passwordCorrect = user.checkPassword(oldPassword);


        if (!passwordCorrect)
            return res.status(400).json({
            message: "Incorrect Password",
        });

        //Set the password key
        user.password = password;

        // Call the model instance .save() method
        user.save();
        return res.status(200).json({
            message: "Password changed succefully",
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Issue",
        });
    }
};


module.exports = {
    SignupController,
    LoginController,
    changePasswordController,
};