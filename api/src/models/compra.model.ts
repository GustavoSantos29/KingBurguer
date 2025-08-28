import type { Prisma } from "@prisma/client";

export type Compra = Prisma.CompraGetPayload<{
  include:{
    itens: true
  }
}>;

export type CreateCompraItemDTO = {
  lancheId?: number;
  acompanhamentoId?: number;
  quantidade: number;
  nomeDoProduto: string;
  valorUnitario: number;
};

export type CreateCompraDTO = {
  clienteId: number;
  total: number;
  address: string;
  observacao?: string;
  itens: CreateCompraItemDTO[];
};
