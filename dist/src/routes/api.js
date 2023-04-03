import express from "express";
import { registerSupplierController } from "../controllers/api.js";
export const apiRouter = express.Router();
apiRouter.get("/registerSupplier", registerSupplierController);
//# sourceMappingURL=api.js.map