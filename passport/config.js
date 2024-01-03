import { Strategy as LocalStrategy } from "passport-local";
import { usersModel } from "../models/Users.js";
import bcrypt from "bcrypt";

export const initializePassport = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (username, password, done) => {
        try {
          const user = await usersModel
            .findOne({ email: username })
            .select("+password");
          if (!user) {
            return done(null, false, {
              success: false,
              message: "User not found",
            }); // Login failed (no user found or invalid credentials)
          }
          if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
              return done(null, user); // Login successfull
            } else {
              return done(null, false, {
                success: false,
                message: "Invalid Credentials",
              }); // Login failed (no user found or invalid credentials)
            }
          }
        } catch (error) {
          console.log(error);
          return done(error, false, { success: false, error }); // if some error occurs during login
        }
      }
    )
  );

  // Boiler plate code mandatory to implement for passport
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await usersModel.findById(id);
      done(null, user);
    } catch (error) {
      return done(error, false); // if some error occurs
    }
  });
};
