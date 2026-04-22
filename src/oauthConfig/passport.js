import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { findOrCreateOAuthUser } from "../service.js/auth.service.js";

// // เก็บแค่ user id ใน session
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// // ทุกๆ request จะทำการ refresh โดยใช้ user id
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await findOrCreateOAuthUser(null, { id });
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });


// --- Google ---
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await findOrCreateOAuthUser("google", profile);
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// --- Facebook ---
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET_ID,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "emails", "photos"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await findOrCreateOAuthUser("facebook", profile);
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// --- Twitter (X) ---
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CLIENT_ID,
      consumerSecret: process.env.TWITTER_SECRET_ID,
      callbackURL: "/auth/twitter/callback",
      includeEmail: true,
    },
    async (token, tokenSecret, profile, done) => {
      try {
        const user = await findOrCreateOAuthUser("twitter", profile);
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;
