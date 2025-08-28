import type { Request, Response, NextFunction } from "express";
import type { LancheService } from "../services/lanche.service.js";
import { BadRequestError } from "../errors/index.js";


/**
 * TODO rever retornos seguindo padrão REST
 */

export class LancheController {
  constructor(private lancheService: LancheService) {}

  //Busca um lanche em específico
  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) {
       throw new BadRequestError("Id não enviado")
      }

      const lancheId = parseInt(id, 10);
      const lanche = await this.lancheService.get(lancheId);

      return res.status(200).json(lanche);
    } catch (error) {
      next(error)
    }
  }

  //Lista todos os lanches
  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const lanches = await this.lancheService.list();

      return res.status(200).json(lanches);
    } catch (error) {
      next(error)
    }
  }

  // Cria um novo lanche
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const lanche = await this.lancheService.create(req.body);

      return res.status(201).json(lanche);
    } catch (error) {
      next(error)
    }
  }

  // Soft delete de um lanche
  public async delete(req: Request, res: Response, next: NextFunction) {
    
    const {id} = req.params
    if(!id){
      throw new BadRequestError("Id não enviado")
    }

    try {
      const lancheId = parseInt(id,10)
      const lanche = await this.lancheService.delete(lancheId);
      return res.status(201).json(lanche);
    } catch (error) {
     next(error)
    }
  }

  // Atualiza um lanche
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const lancheData = req.body;
      const { id } = req.params;
      
      if (!id) {
        throw new BadRequestError("Id nao enviado")
      }

      const lancheId = parseInt(id, 10);
      const lanche = await this.lancheService.update(lancheId, lancheData);
      return res.status(201).json(lanche);
    } catch (error) {
      next(error)
    }
  }

  // Recupera um lanche exluido anteriormente
  public async active(req: Request, res: Response, next: NextFunction){
    try {
      const lanche = await this.lancheService.active(req.body);

      return res.status(201).json(lanche);
    } catch (error) {
      next(error)
    }
  }
}
