import { Router } from "express";
import { IngredienteService } from "../services/ingrediente.service.js";
import { IngredienteController } from "../controllers/ingrediente.controller.js";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware.js";

const ingredienteRouter = Router();

const ingredienteService = new IngredienteService();
const ingredienteController = new IngredienteController(ingredienteService);

ingredienteRouter.get(
  "/",
  authAdminMiddleware,
  ingredienteController.list.bind(ingredienteController)
);

ingredienteRouter.get(
  "/:id",
  authAdminMiddleware,
  ingredienteController.get.bind(ingredienteController)
);

ingredienteRouter.post(
  "/",
  authAdminMiddleware,
  ingredienteController.create.bind(ingredienteController)
);

ingredienteRouter.patch(
  "/:id",
  authAdminMiddleware,
  ingredienteController.update.bind(ingredienteController)
);

ingredienteRouter.delete(
  "/:id",
  authAdminMiddleware,
  ingredienteController.delete.bind(ingredienteController)
);

export default ingredienteRouter;
