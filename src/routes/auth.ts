import express, { Request, Response, Express } from "express";
import {
  loginController,
  logoutController,
  refreshController,
} from "../controllers/auth.js";
import { verifyIDToken } from "../middleware/verifyIDToken.js";
import { registerUser } from "../middleware/registerUser.js";

export const authRouter = express.Router();
authRouter.post("/login", verifyIDToken, registerUser, loginController);
authRouter.post("/refresh", refreshController);
authRouter.post("/logout", logoutController);
authRouter.get("/get",(req:Request,res:Response)=>{
  console.log(req);
  return res.json({message:req});
});
