import express, { Request, Response, Express } from "express";
import { peoplesController } from "../controllers/peoples.js";
export const apiRouter = express.Router();

apiRouter.get("/", peoplesController);
