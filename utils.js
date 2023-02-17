const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.set("strictQuery", false);


const ConnectToDB = async () => {
    try {
      await mongoose.connect(process.env.DB_URL);
      console.log("Connected to DB");
    } catch (err) {
      console.log(err);
      return console.log("Unable to connect to DB");
    }
  };
  

const AppStarter = (port) => {
    console.log("Server start on port " + port);
    ConnectToDB();
};

module.exports = {
    ConnectToDB,
    AppStarter,
};