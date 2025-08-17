import { Router } from 'express';
import { CompraController } from '../controllers/compra.controller';
import { CompraService } from '../services/compra.service';

const compraRouter = Router();

const compraService = new CompraService();
const compraController = new CompraController(compraService);

compraRouter.post('/compra', (req,res) => compraController.create(req,res));



export default compraRouter;