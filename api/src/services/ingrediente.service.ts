import { BadRequestError, NotFoundError } from "../errors/index.js";
import {prisma} from "src/lib/prisma.js";
import type {
  CreateIngredienteDTO,
  Ingrediente,
  UpdateIngredienteDTO,
} from "../models/ingrediente.model.js";

export class IngredienteService {
  public async get(ingredienteId: number): Promise<Ingrediente> {
    if (!ingredienteId) {
      throw new BadRequestError("Id do ingrediente não enviado");
    }
    const ingrediente = await prisma.ingrediente.findUnique({
      where: {
        id: ingredienteId,
      },
    });

    if (!ingrediente) {
      throw new NotFoundError("ingrediente não encontrado");
    }
    return ingrediente;
  }

  public async list(): Promise<Ingrediente[]> {
    const ingredientes = await prisma.ingrediente.findMany();
    return ingredientes;
  }

  public async create(
    ingredienteData: CreateIngredienteDTO
  ): Promise<Ingrediente> {
    const { name, quantidadeEstoque, unidadeMedida } = ingredienteData;

    if (!name || !unidadeMedida || !quantidadeEstoque) {
      throw new BadRequestError(
        "Dados insuficientes para criação de um lanches"
      );
    }
    const ingrediente = await prisma.ingrediente.create({
      data: {
        name,
        quantidadeEstoque,
        unidadeMedida,
      },
    });
    return ingrediente;
  }

  public async delete(ingredienteId: number): Promise<Ingrediente> {
    if (!ingredienteId) {
      throw new BadRequestError("Id é obrigatório");
    }

    const ingrediente = await prisma.ingrediente.delete({
      where: {
        id: ingredienteId,
      },
    });

    return ingrediente;
  }

  public async update(
    ingredienteId: number,
    ingredienteData: UpdateIngredienteDTO
  ): Promise<Ingrediente> {
    if (!ingredienteId) {
      throw new BadRequestError("Id é obrigatório");
    }

    const ingrediente = await prisma.ingrediente.update({
      where: {
        id: ingredienteId,
      },
      data: ingredienteData,
    });

    return ingrediente;
  }
}
