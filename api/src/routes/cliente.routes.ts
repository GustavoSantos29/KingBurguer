import { Router } from "express";
import { AuthClienteService } from "../services/authCliente.service.js";
import { AuthClienteController } from "../controllers/auth.cliente.controller.js";

const clienteRouter = Router();

const clienteService = new AuthClienteService();
const clienteController = new AuthClienteController(clienteService);

clienteRouter.post("/login", clienteController.login.bind(clienteController));
clienteRouter.post(
  "/register",
  clienteController.register.bind(clienteController)
);

export default clienteRouter;
