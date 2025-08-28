import type { Prisma } from "@prisma/client";

export type Ingrediente = Prisma.IngredienteGetPayload<{}>;

export type CreateIngredienteDTO = {
  name: string;
  quantidadeEstoque: number;
  unidadeMedida: string;
};
export type UpdateIngredienteDTO = {
  name?: string;
  quantidadeEstoque?: number;
  unidadeMedida?: string;
};
