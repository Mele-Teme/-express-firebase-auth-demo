import express, { Request, Response, Express } from "express";
import {
  loginController,
  logoutController,
  setSessionCookieController,
} from "../controllers/auth.js";
import {
  verifyIDToken,
  verifyIDTokenForSessionCreation,
} from "../middleware/verifyIDToken.js";
import { registerUser } from "../middleware/registerUser.js";

export const authRouter = express.Router();

authRouter.post("/login", verifyIDToken, registerUser, loginController);
authRouter.post(
  "/setSessionCookie",
  verifyIDTokenForSessionCreation,
  setSessionCookieController
);
authRouter.post("/logout", logoutController);
