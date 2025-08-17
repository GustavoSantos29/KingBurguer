import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma";

import type {
  CreateLancheDTO,
  Lanche,
  UpdateLancheDTO,
} from "../models/lanche.model";


export class LancheService {
  public async getLanche(lancheId: number): Promise<Lanche> {
    try {
      const lanche = await prisma.lanche.findUnique({
        where: {
          id: lancheId,
        },
        include: { ingredientes: { include: { ingrediente: true } } },
      });
      if(!lanche){
        throw new Error("Lanche não encontrado")
      }
      return lanche;
    } catch (error) {
      console.log("Falha ao buscar lanche no serviço:", error);
      throw new Error("Não foi possível buscar o lanche no banco de dados.");
    }
  }

  public async findAll(): Promise<Lanche[]> {
    try {
      const lanches = await prisma.lanche.findMany({
        where: {
          active: true,
        },
        include: { ingredientes: { include: { ingrediente: true } } },
      });

      return lanches;
    } catch (error) {
      console.error("Falha ao buscar lanches no serviço:", error);
      throw new Error("Não foi possível buscar os lanches no banco de dados.");
    }
  }

  public async create(lancheData: CreateLancheDTO): Promise<Lanche> {
    const { name, description, price, image, ingredientIds } = lancheData;

    if (!name || !price || !ingredientIds || ingredientIds.length === 0) {
      throw new Error(
        "Dados insuficientes para criar o lanche. Nome, preço e ingredientes são obrigatórios."
      );
    }

    try {
      const lanche = await prisma.lanche.create({
        data: {
          name,
          description,
          price,
          image,
          active: true,
          ingredientes: {
            create: ingredientIds.map((idDoIngrendiente) => ({
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
    } catch (error) {
      console.log("Falha ao criar o lanche no serviço:", error);
      throw new Error("Não foi possível salvar o lanche no banco de dados.");
    }
  }

  public async delete(lancheId: number): Promise<Lanche> {
    try {
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
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new Error(`Lanche com o ID ${lancheId} não foi encontrado.`);
      }

      // Para outros erros (ex: falha de conexão com o DB)
      console.error("Falha ao deletar o lanche no serviço:", error);
      throw new Error("Não foi possível desativar o lanche no banco de dados.");
    }
  }

  public async update(lancheData: UpdateLancheDTO): Promise<Lanche> {
    const { lancheId, name, description, price, image, ingredientesId } =
      lancheData;

    const dataToUpdate: Prisma.LancheUpdateInput = {
      name,
      description,
      price,
      image,
    };

    if (ingredientesId) {
      dataToUpdate.ingredientes = {
        deleteMany: {},
        create: ingredientesId.map((idDoIngrediente) => ({
          ingrediente: {
            connect: {
              id: idDoIngrediente,
            },
          },
        })),
      };
    }
    try {
      const lanche = await prisma.lanche.update({
        where: {
          id: lancheId,
        },
        data: dataToUpdate,

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
      console.error("Falha ao atualizar o lanche no serviço:", error);
      throw new Error("Não foi possível atualizar o lanche no banco de dados.");
    }
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
