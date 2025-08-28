import type { Prisma } from "@prisma/client";

export type Acompanhamento = Prisma.AcompanhamentoGetPayload<{}>;

export type CreateAcompanhamentoDTO = {
  name: string;
  quantidadeEstoque: number;
};

export type UpdateAcompanhamentoDTO = {
  name?: string;
  quantidadeEstoque?: number;
};

export type AcompanhamentoAddDTO = {
  id: number;
  quantidade: number;
};
