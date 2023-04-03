import { Request, Response } from "express";

export const registerSupplierController = (req: Request, res: Response) => {
  return res.json({ accessToken: "Access Token 1" });
};
