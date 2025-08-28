import { Router } from "express";
import { CompraController } from "../controllers/compra.controller.js";
import { authClienteMiddleware } from "../middlewares/authCliente.middleware.js";
import { ComprFacade } from "../facades/compra.facade.js";

const compraRouter = Router();

const compraFacade = new ComprFacade();
const compraController = new CompraController(compraFacade);

compraRouter.post(
  "/compra",
  authClienteMiddleware,
  compraController.realizarCompra.bind(compraController)
);

export default compraRouter;
