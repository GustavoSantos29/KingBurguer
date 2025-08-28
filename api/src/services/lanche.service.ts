import {prisma} from "src/lib/prisma.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import type {
  CreateLancheDTO,
  Lanche,
  UpdateLancheDTO,
  LancheComIngrediente,
} from "../models/lanche.model.js";

export class LancheService {
  public async get(lancheId: number): Promise<LancheComIngrediente> {
    if (!lancheId) {
      throw new BadRequestError("Id de lanche obrigatório");
    }

    const lanche = await prisma.lanche.findUnique({
      where: {
        id: lancheId,
      },
      include: { ingredientes: { include: { ingrediente: true } } },
    });
    if (!lanche) {
      throw new NotFoundError("Lanche não encontrado");
    }
    return lanche;
  }

  public async list(): Promise<Lanche[]> {
    const lanches: Lanche[] = await prisma.lanche.findMany({
      where: {
        active: true,
      },
      include: { ingredientes: { include: { ingrediente: true } } },
    });

    return lanches;
  }

  public async create(lancheData: CreateLancheDTO): Promise<Lanche> {
    const { name, description, price, image, ingredientId } = lancheData;

    if (!name || !price || !ingredientId || ingredientId.length === 0) {
      throw new BadRequestError(
        "Dados insuficientes para criar o lanche. Nome, preço e ingredientes são obrigatórios."
      );
    }

    const lanche = await prisma.lanche.create({
      data: {
        name,
        description,
        price,
        image,
        active: true,
        ingredientes: {
          create: ingredientId.map((idDoIngrendiente) => ({
            ingrediente: {
              connect: {
                id: idDoIngrendiente,
              },
            },
          })),
        },
      },
      //include aninhado para incluir ingredientes na relação
      include: {
        ingredientes: {
          include: {
            ingrediente: true,
          },
        },
      },
    });

    return lanche;
  }

  public async delete(lancheId: number): Promise<Lanche> {
    const lanche = await prisma.lanche.update({
      where: {
        id: lancheId,
      },
      data: {
        active: false,
      },
      //include aninhado para incluir ingredientes na relação
      include: {
        ingredientes: {
          include: {
            ingrediente: true,
          },
        },
      },
    });
    return lanche;
  }

  public async update(
    lancheId: number,
    lancheData: UpdateLancheDTO
  ): Promise<LancheComIngrediente> {
    const { ingredientIds, ...dadosDoLanche } = lancheData;

    const lancheAtualizado = await prisma.$transaction(async (tx) => {
      if (Object.keys(dadosDoLanche).length > 0) {
        await tx.lanche.update({
          where: { id: lancheId },
          data: dadosDoLanche,
        });
      }

      if (ingredientIds) {
        await tx.lancheIngrediente.deleteMany({
          where: { lancheId: lancheId },
        });

        if (ingredientIds.length > 0) {
          await tx.lancheIngrediente.createMany({
            data: ingredientIds.map((idDoIngrediente: number) => ({
              lancheId: lancheId,
              ingredienteId: idDoIngrediente,
            })),
          });
        }
      }

      const lancheResultante = await tx.lanche.findUniqueOrThrow({
        where: { id: lancheId },
        include: {
          ingredientes: {
            include: {
              ingrediente: true,
            },
          },
        },
      });

      return lancheResultante;
    });

    return lancheAtualizado;
  }

  public async active(lancheId: number): Promise<Lanche> {
    try {
      const lanche = await prisma.lanche.update({
        where: {
          id: lancheId,
        },
        data: {
          active: true,
        },
        //include aninhado para incluir ingredientes na relação
        include: {
          ingredientes: {
            include: {
              ingrediente: true,
            },
          },
        },
      });
      return lanche;
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new Error(`Lanche com o ID ${lancheId} não foi encontrado.`);
      }

      // Para outros erros (ex: falha de conexão com o DB)
      console.error("Falha ao reativar o lanche no serviço:", error);
      throw new Error("Não foi possível reativar o lanche no banco de dados.");
    }
  }
}
