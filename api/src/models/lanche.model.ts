import type { Prisma } from "@prisma/client";

export type Lanche = Prisma.LancheGetPayload<{}>;

export type LancheComIngrediente = Prisma.LancheGetPayload<{
  include: {
    ingredientes: {
      include: {
        ingrediente: true;
      };
    };
  };
}>;


export type CreateLancheDTO = {
  name: string;
  description: string;
  price: number;
  image: string;
  ingredientId: number[];
};

export type UpdateLancheDTO = {
  lancheId: number;
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  active?: boolean;
  ingredientIds?: number[]; 
};

