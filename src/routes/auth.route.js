import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import {
  loginController,
  registerController,
} from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/register", registerController);

authRouter.post("/login", loginController);

// Google Oauth
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/auth/oauth/failed",
  }),
  oauthSuccessHandler
);

// Facebook Oauth
authRouter.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

authRouter.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: "/auth/oauth/failed",
  }),
  oauthSuccessHandler
);

function oauthSuccessHandler(req, res) {
  const user = req.user;

  const payload = { id: user.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "7d",
  });

  const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
  res.redirect(`${frontendURL}/oauth/callback?token=${token}`);
}

authRouter.get("/oauth/failed", (req, res) => {
  res.status(401).json({ message: "OAuth login failed. Please try again." });
});

export default authRouter;
