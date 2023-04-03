import express, { Request, Response, Express } from "express";
import { registerSupplierController } from "../controllers/api.js";
export const apiRouter = express.Router();

apiRouter.post("/registerSupplier", registerSupplierController);
