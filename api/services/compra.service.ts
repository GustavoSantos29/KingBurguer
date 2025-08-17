import prisma from "../lib/prisma";
import type { CreateCompraDTO, CompraToListDTO } from "../models/compra.model";

export class CompraService {
  public async create(compraData: CreateCompraDTO, clienteId: number) {
    const { lanches, observacao, address } = compraData;

    if (!lanches || lanches.length === 0) {
      throw new Error("É preciso ao menos um item para realizar a compra");
    }

    const lancheIds = lanches.map((l) => l.lancheId);
    const lanchesDoBanco = await prisma.lanche.findMany({
      where: {
        id: { in: lancheIds },
        active: true,
      },
    });

    if (lanchesDoBanco.length !== lancheIds.length) {
      throw new Error(
        "Um ou mais lanches não foram encontrados ou estão inativos."
      );
    }

    // calculo do valor total no backend como medida de seguraça

    const total = lanches.reduce((acc, lancheCarrinho) => {
      const lancheInfo = lanchesDoBanco.find(
        (l) => l.id === lancheCarrinho.lancheId
      );
      return acc + lancheInfo!.price * lancheCarrinho.quantidade;
    }, 0);

    try {
      const novaCompra = await prisma.compra.create({
        data: {
          clienteId,
          total,
          observacao: observacao ?? null,
          address,
          lanches: {
            create: lanches.map((l) => ({
              lancheId: l.lancheId,
              quantidade: l.quantidade,
            })),
          },
        },
        include: {
          lanches: { include: { lanche: true } },
        },
      });
      return novaCompra;
    } catch (error) {
      console.error("Erro ao realizar a compra:", error);
      throw new Error("Não foi possível registrar a compra no banco de dados.");
    }
  }

  public async list(clienteId: number): Promise<CompraToListDTO> {
    try {
      const listaDeLanches = await prisma.compra.findMany({
        where: {
          clienteId: clienteId,
        },
      });

      if (!listaDeLanches) {
        return listaDeLanches;
      }

      throw new Error("Nenhuma compra encontrada");
    } catch (error) {
      console.log("Erro ao listar compras", error);
      throw new Error("Não foi possivel listar as compras");
    }
  }
}
