import { Router } from "express";
import { AcompanhamentoService } from "src/services/acompanhamento.service.js";
import { AcompanhamentoController } from "src/controllers/acompanhamento.controller.js";
import { authAdminMiddleware } from "src/middlewares/authAdmin.middleware.js";

const acompanhamentoRouter = Router();

const acompanhamentoService = new AcompanhamentoService();
const acompanhamentoController = new AcompanhamentoController(
  acompanhamentoService
);

acompanhamentoRouter.get(
  "/",
  authAdminMiddleware,
  acompanhamentoController.list.bind(acompanhamentoController)
);

acompanhamentoRouter.get(
  "/:id",
  authAdminMiddleware,
  acompanhamentoController.get.bind(acompanhamentoController)
);

acompanhamentoRouter.post(
  "/",
  authAdminMiddleware,
  acompanhamentoController.create.bind(acompanhamentoController)
);

acompanhamentoRouter.patch(
  "/:id",
  authAdminMiddleware,
  acompanhamentoController.update.bind(acompanhamentoController)
);

acompanhamentoRouter.delete(
  "/:id",
  authAdminMiddleware,
  acompanhamentoController.delete.bind(acompanhamentoController)
);

export default acompanhamentoRouter