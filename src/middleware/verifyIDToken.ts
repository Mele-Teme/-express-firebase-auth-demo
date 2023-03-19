import { Request, Response } from "express";
import admin from "../config/firebase-config.js";

export const verifyIDToken = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const idToken = req.body.input.token;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken, true);

    if (decodedToken.email_verified) {
      const user = await admin.auth().getUser(decodedToken.uid);
      const userName = user.displayName?.split(" ");
      req.user = {
        uid: user.uid,
        email: user.email,
        firstName: userName[0],
        lastName: userName[1],
      };
      return next();
    } else return res.sendStatus(403).send("Email Not Verified.");
  } catch (error) {
    console.log(error);

    return res.status(401).send("UNAUTHORIZED REQUEST!");
  }
};
