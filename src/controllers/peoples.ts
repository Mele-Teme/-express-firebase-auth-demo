import { Request, Response } from "express";

export const peoplesController = (req: Request, res: Response) => {
  res.status(200).json([
    { name: "Getaye", age: 21 },
    { name: "Melaku", age: 22 },
    { name: "Eyob", age: 22 },
  ]);
};
