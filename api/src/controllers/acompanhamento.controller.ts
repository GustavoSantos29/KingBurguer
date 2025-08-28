import type { Request, Response, NextFunction } from "express";

import type { AcompanhamentoService } from "../services/acompanhamento.service.js";
import { BadRequestError } from "src/errors/index.js";

export class AcompanhamentoController {
  constructor(private acompanhamentoService: AcompanhamentoService) {}

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new BadRequestError("Id não foi enviado");
      }
      const acompanhamentoId = parseInt(id, 10);
      const acompanhamento = await this.acompanhamentoService.get(
        acompanhamentoId
      );

      return res.status(200).json(acompanhamento);
    } catch (error) {
      next(error);
    }
  }

  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const acompanhamentos = await this.acompanhamentoService.list();
      res.status(200).json(acompanhamentos);
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const acompanhamento = await this.acompanhamentoService.create(req.body);
      return res.status(201).json(acompanhamento);
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
      const acompanhamentoId = parseInt(id, 10);
      const acompanhamento = await this.acompanhamentoService.delete(
        acompanhamentoId
      );
      res.status(201).json(acompanhamento);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const acompanhamentoData = req.body;
      const { id } = req.params;

      if (!id) {
        throw new BadRequestError("Id nao enviado");
      }

      const acompanhamentoId = parseInt(id, 10);
      const acompanhamento = await this.acompanhamentoService.update(
        acompanhamentoId,
        acompanhamentoData
      );
      return res.status(201).json(acompanhamento);
    } catch (error) {
      next(error);
    }
  }
}
