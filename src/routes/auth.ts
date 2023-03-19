import express, { Request, Response, Express } from "express";
import { loginController, logoutController } from "../controllers/auth.js";
import { verifyIDToken } from "../middleware/verifyIDToken.js";
import { registerUser } from "../middleware/registerUser.js";

export const authRouter = express.Router();
authRouter.post("/login", verifyIDToken, registerUser, loginController);
authRouter.post("/logout", logoutController);
