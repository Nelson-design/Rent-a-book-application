const dotenv = require("dotenv");
dotenv.config();
const { User } = require("../models/user.model");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALL_BACK_URL,
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
          
  
        try {
          let existingUser = await User.findOne({ "google.id": profile.id });
          // if user exists return the user
          if (existingUser) {
            return done(null, existingUser);
          }
          // if user does not exist create a new user
          console.log("Creating new user...");
          // console.log(profile);
          // console.log(profile.emails);
          
          const newUser = new User({
            method: "google",
            google: {
              id: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
            },
          });
          await newUser.save();
          return done(null, newUser);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
  
  
  // const getGoogleLogin = ()=>{
  //     passport.authenticate("google"),
  //      { scope: ["profile", "email"] }
  // }
  // const handleGoogleLogin =(req,res,next)=>{}
  
  
  
  module.exports = {
    getGoogleLogin: [passport.authenticate("google", { scope: ["profile", "email"] })],
  
    handleGoogleLogin: [
      passport.authenticate("google", { session: false }),
      (req, res) => {
        res.redirect("/profile/");
      },
      // passport.authenticate("google", {
      //   failureRedirect: "/login",
      // }),
      // function (req, res) {
      //   res.redirect("/");
      // },
    ],
  };