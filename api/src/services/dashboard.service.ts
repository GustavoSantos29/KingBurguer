
/** tem q rever este service como um todo, mas por hora deixa assim mesmo, focar no CRUD dos lanches */


// import prisma from "../lib/prisma";
// import type { VendasPorLancheDTO } from "../models/dashbord.model";
// import type { Lanche } from "../models/lanche.model";

// type VendaAgrupada = {
//   lancheId: number;
//   _sum: {
//     quantidade: number | null;
//   };
// };

// export class DashboardService {
//   public async getVendasPorLanche(): Promise<VendasPorLancheDTO[]> {
//     try {
//       const vendasAgrupadas = await prisma.compraLanche.groupBy({
//         by: ["lancheId"],
//         _sum: {
//           quantidade: true,
//         },
//       });

//       if (vendasAgrupadas.length === 0) {
//         return [];
//       }

//       const lancheIds = vendasAgrupadas.map(
//         (venda: VendaAgrupada) => venda.lancheId
//       );

//       const lanchesInfo = await prisma.lanche.findMany({
//         where: {
//           id: { in: lancheIds },
//         },
//         include: {
//           ingredientes: {
//             include: {
//               ingrediente: true,
//             },
//           },
//         },
//       });

//       const dashboardData = vendasAgrupadas.map((itemVenda: VendaAgrupada) => {
//         // ✅ Adicionamos o tipo 'Lanche' para o parâmetro 'l'
//         const lancheCorrespondente = lanchesInfo.find(
//           (l: Lanche) => l.id === itemVenda.lancheId
//         );

//         const totalUnidades = itemVenda._sum.quantidade ?? 0;

//         const receita = (lancheCorrespondente?.price ?? 0) * totalUnidades;

//         return {
//           lancheId: itemVenda.lancheId,
//           nomeDoLanche: lancheCorrespondente?.name ?? "Lanche Removido",
//           totalUnidadesVendidas: totalUnidades,
//           receitaBrutaGerada: receita,
//         };
//       });

//       // ✅ Adicionamos o tipo 'VendasPorLancheDTO' para os parâmetros 'a' e 'b'
//       const dadosOrdenados = dashboardData.sort(
//         (a: VendasPorLancheDTO, b: VendasPorLancheDTO) =>
//           b.totalUnidadesVendidas - a.totalUnidadesVendidas
//       );

//       return dadosOrdenados;
//     } catch (error) {
//       console.error("Erro ao gerar relatório de vendas por lanche:", error);
//       throw new Error("Não foi possível gerar o relatório de vendas.");
//     }
//   }
// }
