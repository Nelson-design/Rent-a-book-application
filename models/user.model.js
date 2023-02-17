const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const userSchema = new Schema(
  {
    google: {
      id: {
        type: String,
      },
      name: {
        type: String,
      },
      email: {
        type: String,
      },
    },
    username: String,
    password: String,
    email: String,
    fullName: String,
    phone: String,
    resetToken: String,
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// userSchema.pre("save", () => {
//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync(this.password, salt);
//   this.password = hash;
// });

userSchema.pre("save", function () {
 if(this.password){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
 }
});

userSchema.method("generateToken", function() {
  let token = JWT.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      issuer: "process.env.ISSUER",
      expiresIn: "24h",
    }
  );
  return token;
});

userSchema.method("checkPassword", function (password) {
  let valid = bcrypt.compareSync(password, this.password);
  return valid;
});

const User = model("User", userSchema);
module.exports = { User };