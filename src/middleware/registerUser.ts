import { Request, Response, NextFunction } from "express";
import { useMutations } from "../graphql/mutation/useMutation.js";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uid: id, firstName, lastName, email } = req.user;

  try {
    const { insertUser } = useMutations();
    await insertUser(id, firstName, lastName, email);
  } finally {
    return next();
  }
};
