const { User } = require("../models/user.model");

const userAdminUpdate = async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (!userExist) {
      return res.status(400).json({
        message: "user does not exist",
      });
    }
    const userUpdate = await userExist.updateOne(req.body);
    return res.status(200).json({
      message: "User updated",
      data: userUpdate,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "server issues from here",
    });
  }
};

module.exports = userAdminUpdate;