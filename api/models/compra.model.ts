import type { Cliente } from "./cliente.model";
import type { Lanche } from "./lanche.model";

export interface Compra {
  id: number;
  clienteId: number;
  total: number;
  observacao?: string;
  cliente: Cliente;
  createdAt: Date;
  address: string;
  lanches: ItensDaCompra[];
}

export interface ItensDaCompra {
  quantidade: number;
  compraId: number;
  lancheId: number;
  compra: Compra;
  lanche: Lanche;
}

/**
 * ----- @DTOS --------
 */

export interface LancheParaCompraDTO {
  lancheId: number;
  quantidade: number;
}

export interface CreateCompraDTO {
  address: string;
  observacao?: string;
  lanches: LancheParaCompraDTO[];
}

export interface CompraToListDTO{
  createdAt: Date;
  total: number;
}


 