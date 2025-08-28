import type { Request, Response, NextFunction } from "express";

import { BadRequestError } from "../errors/index.js";
import type { IngredienteService } from "../services/ingrediente.service.js";

export class IngredienteController {
  constructor(private ingredienteService: IngredienteService) {}

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new BadRequestError("Id não foi enviado");
      }
      const ingredienteId = parseInt(id, 10);
      const ingrediente = await this.ingredienteService.get(ingredienteId);

      return res.status(200).json(ingrediente);
    } catch (error) {
      next(error);
    }
  }

  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const ingredientes = await this.ingredienteService.list();
      res.status(200).json(ingredientes);
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const ingrediente = await this.ingredienteService.create(req.body);
      return res.status(201).json(ingrediente);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) {
      throw new BadRequestError("Id não enviado");
    }
    try {
      const ingredienteId = parseInt(id, 10);
      const ingrediente = await this.ingredienteService.delete(ingredienteId);
      res.status(201).json(ingrediente);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const ingredienteData = req.body;
      const { id } = req.params;

      if (!id) {
        throw new BadRequestError("Id nao enviado");
      }

      const ingredienteId = parseInt(id, 10);
      const ingrediente = await this.ingredienteService.update(
        ingredienteId,
        ingredienteData
      );
      return res.status(201).json(ingrediente);
    } catch (error) {
      next(error);
    }
  }
}
