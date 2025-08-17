import type { CompraToListDTO, CreateCompraDTO } from "../models/compra.model";
import type { CompraService } from "../services/compra.service";
import type { Request, Response } from "express";

export class CompraController {
  constructor(private CompraService: CompraService) {}

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const compraData: CreateCompraDTO = req.body;
      if (!req.user?.id) {
        throw new Error("Algo deu errado no compra controller");
      }
      const clienteId = req.user.id;
      const compra = await this.CompraService.create(compraData, clienteId);
      return res
        .status(200)
        .json({ message: "Compra realizada com sucesso", compra: compra });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  public async list(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.user?.id) {
        throw new Error("Algo deu errado no compra controller");
      }
      const clienteId = req.user.id;
      const listaDeCompras = await this.CompraService.list(clienteId);
      return res.status(200).json(listaDeCompras);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
