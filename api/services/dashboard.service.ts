import prisma from "../lib/prisma";

import type { VendasPorLancheDTO } from "../models/dashbord.models";

export class DashboardService {
  public async getVendasPorLanche(): Promise<VendasPorLancheDTO[]> {
    // 1. Agregamos os dados da tabela de junção 'CompraLanche'
    const vendasAgrupadas = await prisma.compraLanche.groupBy({
      // Agrupar por ID do lanche
      by: ["lancheId"],

      //comando prisma que realiza soma
      _sum: {
        quantidade: true, // Somar a quantidade de cada lanche vendido
      },
    });

    // 2. Buscamos os detalhes de todos os lanches para obter nome e preço
    const todosOsLanches = await prisma.lanche.findMany({
      where: {
        id: { in: vendasAgrupadas.map((v) => v.lancheId) },
      },
    });

    // 3. Combinamos os dados para montar a resposta final
    const dashboardData = vendasAgrupadas.map((venda) => {
      const lancheInfo = todosOsLanches.find((l) => l.id === venda.lancheId);
      const totalUnidades = venda._sum.quantidade || 0;
      const receita = (lancheInfo?.price || 0) * totalUnidades;

      return {
        lancheId: venda.lancheId,
        nomeDoLanche: lancheInfo?.name || "Lanche não encontrado",
        totalUnidadesVendidas: totalUnidades,
        receitaBrutaGerada: receita,
      };
    });

    // Opcional: Ordenar do mais vendido para o menos vendido
    dashboardData.sort(
      (a, b) => b.totalUnidadesVendidas - a.totalUnidadesVendidas
    );

    return dashboardData;
  }
}
