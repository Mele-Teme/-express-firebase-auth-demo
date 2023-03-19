import express from "express";
import { peoplesController } from "../controllers/peoples.js";
export const apiRouter = express.Router();
apiRouter.get("/", peoplesController);
//# sourceMappingURL=peoples.js.map