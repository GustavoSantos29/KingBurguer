import { Prisma } from "@prisma/client";
import {prisma} from "src/lib/prisma.js";
import type { CreateCompraItemDTO } from "../models/compra.model.js";
import { ConflictError, NotFoundError } from "../errors/index.js";

type PrismaTransactionClient = Prisma.TransactionClient;

export class EstoqueService {

  public async adicionarAoEstoqueIngrediente(
    ingredienteId: number,
    quantidade: number
  ) {
 
    return prisma.ingrediente.update({
      where: { id: ingredienteId },
      data: {
        quantidadeEstoque: {
          increment: quantidade,
        },
      },
    });
  }

  public async adicionarAoEstoqueAcompanhamento(
    acompanhamentoId: number,
    quantidade: number
  ) {
    return prisma.acompanhamento.update({
      where: { id: acompanhamentoId },
      data: {
        quantidadeEstoque: {
          increment: quantidade,
        },
      },
    });
  }

  public async darBaixaDeCompra(
    itens: CreateCompraItemDTO[],
    tx: PrismaTransactionClient
  ) {
    // Calcular consumo total
    const consumoAcompanhamentos = new Map<number, number>();
    const consumoIngredientes = new Map<number, number>();

    for (const item of itens) {
    // Comsumo de acompanhamentos
      if (item.acompanhamentoId) {
        const consumoAtual =
          consumoAcompanhamentos.get(item.acompanhamentoId) || 0;
        consumoAcompanhamentos.set(
          item.acompanhamentoId,
          consumoAtual + item.quantidade
        );
      }
    // Comsumo de ingredientes
      if (item.lancheId) {
        const receita = await tx.lancheIngrediente.findMany({
          where: { lancheId: item.lancheId },
        });

        for (const receitaItem of receita) {
          const consumoTotalDoIngrediente =
            receitaItem.quantidadePadrão * item.quantidade;
          const consumoAtual =
            consumoIngredientes.get(receitaItem.ingredienteId) || 0;
          consumoIngredientes.set(
            receitaItem.ingredienteId,
            consumoAtual + consumoTotalDoIngrediente
          );
        }
      }
    }

    // Verificar disponibilidade
    for (const [id, consumo] of consumoAcompanhamentos.entries()) {
      const acompanhamento = await tx.acompanhamento.findUniqueOrThrow({
        where: { id },
      });
      if (acompanhamento.quantidadeEstoque < consumo) {
        throw new ConflictError(
          `Estoque insuficiente para o acompanhamento: ${acompanhamento.name}`
        );
      }
    }

    for (const [id, consumo] of consumoIngredientes.entries()) {
      const ingrediente = await tx.ingrediente.findUniqueOrThrow({
        where: { id },
      });
      if (ingrediente.quantidadeEstoque < consumo) {
        throw new ConflictError(
          `Estoque insuficiente para o ingrediente: ${ingrediente.name}`
        );
      }
    }

    //Executar baixa no estoque
    const updatesAcompanhamentos = Array.from(
      consumoAcompanhamentos.entries()
    ).map(([id, consumo]) =>
      tx.acompanhamento.update({
        where: { id },
        data: { quantidadeEstoque: { decrement: consumo } },
      })
    );

    const updatesIngredientes = Array.from(consumoIngredientes.entries()).map(
      ([id, consumo]) =>
        tx.ingrediente.update({
          where: { id },
          data: { quantidadeEstoque: { decrement: consumo } },
        })
    );

    await Promise.all([...updatesAcompanhamentos, ...updatesIngredientes]);
  }
}
