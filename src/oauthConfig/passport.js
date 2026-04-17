import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { findOrCreateOAuthUser } from "../service.js/auth.service.js";

// เก็บแค่ user id ใน session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// ทุกๆ request จะทำการ refresh โดยใช้ user id
passport.deserializeUser(async (id, done) => {
  try {
    const user = await findOrCreateOAuthUser(null, { id });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.OAUTH_GOOGLE_SECRET_ID,
      callbackURL: process.env.OAUTH_GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await findOrCreateOAuthUser("google", profile);
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.OAUTH_FACEBOOK_CLIENT_ID,
      clientSecret: process.env.OAUTH_FACEBOOK_SECRET_ID,
      callbackURL: process.env.OAUTH_FACEBOOK_CALLBACK_URL,
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await findOrCreateOAuthUser("facebook", profile);
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;
