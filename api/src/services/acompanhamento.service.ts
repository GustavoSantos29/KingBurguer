import {
  AppError,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../errors/index.js";
import {prisma} from "src/lib/prisma.js";

import type {
  Acompanhamento,
  CreateAcompanhamentoDTO,
  UpdateAcompanhamentoDTO,
} from "../models/acompanhamento.model.js";

export class AcompanhamentoService {
  public async get(acompanhamentoId: number): Promise<Acompanhamento> {
   
    if(!acompanhamentoId){
      throw new BadRequestError("Id do acompanhamento é obrigatório")
    }

    const acompanhamento = await prisma.acompanhamento.findUnique({
      where: {
        id: acompanhamentoId,
      },
    });

    if (!acompanhamento) {
      throw new NotFoundError("Acompanhamento não encontrado");
    }
    return acompanhamento;
  }

  public async list(): Promise<Acompanhamento[]> {
    const acompanhamentos = await prisma.acompanhamento.findMany();
    return acompanhamentos;
  }

  public async create(
    acompanhamentoData: CreateAcompanhamentoDTO
  ): Promise<Acompanhamento> {
    const { name, quantidadeEstoque } = acompanhamentoData;

    if (!name || typeof quantidadeEstoque !== "number") {
      throw new BadRequestError("Campos faltando na requisição");
    }

    const acompanhamento = await prisma.acompanhamento.create({
      data: {
        name,
        quantidadeEstoque,
      },
    });

    return acompanhamento;
  }

  public async delete(acompanhamentoId: number): Promise<Acompanhamento> {
    if (!acompanhamentoId) {
      throw new ForbiddenError("Id é obrigatório");
    }

    const acompanhamento = await prisma.acompanhamento.delete({
      where: {
        id: acompanhamentoId,
      },
    });

    return acompanhamento;
  }

  public async update(
    acompanhamentoId: number,
    AcompanhamentoData: UpdateAcompanhamentoDTO
  ): Promise<Acompanhamento> {
    if (!acompanhamentoId) {
      throw new BadRequestError("Dados do acompanhamento não enviado corretamente");
    }

    const acompanhamento = await prisma.acompanhamento.update({
      where: {
        id: acompanhamentoId,
      },
      data: AcompanhamentoData,
    });

    return acompanhamento;
  }
}
