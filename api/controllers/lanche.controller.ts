import type { Request, Response } from "express";
import type { LancheService } from "../services/lanche.service";

/**
 * TODO rever retornos seguindo padrão REST
 */

export class LancheController {
  constructor(private lancheService: LancheService) {}

  //Busca um lanche em específico
  public async get(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .json({ message: "O ID do lanche é obrigatório." });
      }

      const lancheId = parseInt(id, 10);

      if (isNaN(lancheId)) {
        return res
          .status(400)
          .json({ message: "O ID do lanche deve ser um número." });
      }
      const lanche = await this.lancheService.getLanche(lancheId);

      return res.status(200).json(lanche);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }

   //Lista todos os lanches
  public async list(req: Request, res: Response): Promise<Response> {
    try {
      const lanche = await this.lancheService.findAll();

      return res.status(200).json(lanche);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Cria um novo lanche
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const lanche = await this.lancheService.create(req.body);

      return res.status(201).json(lanche);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  // Soft delete de um lanche
  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const lanche = await this.lancheService.delete(req.body);

      return res.status(201).json(lanche);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Atualiza um lanche
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const lanche = await this.lancheService.update(req.body);
      return res.status(201).json(lanche);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Recupera um lanche exluido anteriormente
  public async active(req: Request, res: Response): Promise<Response> {
    try {
      const lanche = await this.lancheService.active(req.body);

      return res.status(201).json(lanche);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
