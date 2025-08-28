import { Prisma } from "@prisma/client";
import {prisma} from "src/lib/prisma.js";
import type { CreateCompraDTO } from "../models/compra.model.js";

type PrismaTransactionClient = Prisma.TransactionClient;

export class CompraRepository {

  public async create(
    dadosDaCompra: CreateCompraDTO,
    tx?: PrismaTransactionClient
  ) {
    const prismaClient = tx || prisma;

    const novaCompra = await prismaClient.compra.create({
      data: {
        clienteId: dadosDaCompra.clienteId,
        total: dadosDaCompra.total,
        address: dadosDaCompra.address,
        ...(dadosDaCompra.observacao && {
          observacao: dadosDaCompra.observacao,
        }),
        itens: {
          create: dadosDaCompra.itens.map((item) => ({
            lancheId: item.lancheId,
            acompanhamentoId: item.acompanhamentoId,
            quantidade: item.quantidade,
            nomeDoProduto: item.nomeDoProduto,
            valorUnitario: item.valorUnitario,
          })),
        },
      },
      include: {
        itens: true,
      },
    });

    return novaCompra;
  }

  public async findById(compraId: number) {
    const compra = await prisma.compra.findUnique({
      where: { id: compraId },
      include: {
        cliente: true,
        itens: {
          include: {
            lanche: true,
            acompanhamento: true,
          },
        },
      },
    });

    return compra;
  }

  public async list(clienteId: number) {
    const compras = await prisma.compra.findMany({
      where: { clienteId: clienteId },
      include: {
        itens: {
          include: {
            lanche: true,
            acompanhamento: true,
          },
        },
      },
    });
    return compras;
  }
}
