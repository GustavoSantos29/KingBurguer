import type { Request, Response, NextFunction } from "express";
import type { ComprFacade } from "../facades/compra.facade.js";
import type { CreateCompraDTO } from "../models/compra.model.js";

export class CompraController {
  constructor(private compraFacade: ComprFacade) {}

  public async realizarCompra(req: Request, res: Response, next: NextFunction) {
    try {
      const compraData: CreateCompraDTO = req.body;
      const novaCompra = await this.compraFacade.processarNovaCompra(
        compraData
      );

      return res.status(201).json(novaCompra);
    } catch (error) {
      next(error)
    }
  }
}
