import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import {
  loginController,
  oauthFailedController,
  oauthSuccessController,
  registerController,
} from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/register", registerController);

authRouter.post("/login", loginController);


// ========================
// Google Routes
// ========================
authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

authRouter.get("/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/auth/oauth/failed" }),
  oauthSuccessController
);

// ========================
// Facebook Routes
// ========================
authRouter.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

authRouter.get("/facebook/callback",
  passport.authenticate("facebook", { session: false, failureRedirect: "/auth/oauth/failed" }),
  oauthSuccessController
);

// ========================
// Twitter Routes
// ========================
authRouter.get("/twitter", passport.authenticate("twitter"));

authRouter.get("/twitter/callback",
  passport.authenticate("twitter", { session: false, failureRedirect: "/auth/oauth/failed" }),
  oauthSuccessController
);

// ========================
// Failed Route
// ========================
authRouter.get("/oauth/failed", oauthFailedController);

export default authRouter;
