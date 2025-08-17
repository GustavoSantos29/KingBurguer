import { Router } from "express";
import { LancheController } from "../controllers/lanche.controller";
import { LancheService } from "../services/lanche.service";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware";
import { authClienteMiddleware } from "../middlewares/authCliente.middleware";

const lancheRouter = Router();

const lancheService = new LancheService();
const lancheController = new LancheController(lancheService);

// Rotas públicas
lancheRouter.get("/", (req, res) => lancheController.list(req, res));

// Rotas privadas CLIENTES
lancheRouter.get("/:id", authClienteMiddleware, (req, res) =>
  lancheController.get(req, res)
);

// Rotas privadas ADMINS

lancheRouter.post("/", authAdminMiddleware, (req, res) =>
  lancheController.create(req, res)
);

lancheRouter.patch("/:id", authAdminMiddleware, (req, res) =>
  lancheController.update(req, res)
);

lancheRouter.delete("/:id", authAdminMiddleware, (req, res) =>
  lancheController.delete(req, res)
);

lancheRouter.patch("/:id/active", authAdminMiddleware, (req, res) =>
  lancheController.active(req, res)
);

export default lancheRouter;
