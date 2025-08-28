import { Router } from "express";
import { LancheController } from "../controllers/lanche.controller.js";
import { LancheService } from "../services/lanche.service.js";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware.js";
import { authClienteMiddleware } from "../middlewares/authCliente.middleware.js";

const lancheRouter = Router();

const lancheService = new LancheService();
const lancheController = new LancheController(lancheService);

// Rotas públicas
lancheRouter.get(
  "/",
  authClienteMiddleware,
  lancheController.list.bind(lancheController)
);

// Rotas privadas CLIENTES
lancheRouter.get(
  "/:id",
  authClienteMiddleware,
  lancheController.get.bind(lancheController)
);

// Rotas privadas ADMINS

lancheRouter.post(
  "/",
  authAdminMiddleware,
  lancheController.create.bind(lancheController)
);

lancheRouter.patch(
  "/:id",
  authAdminMiddleware,
  lancheController.update.bind(lancheController)
);

lancheRouter.delete(
  "/:id",
  authAdminMiddleware,
  lancheController.delete.bind(lancheController)
);

lancheRouter.patch(
  "/:id/active",
  authAdminMiddleware,
  lancheController.active.bind(lancheController)
);

export default lancheRouter;
