
// REFAZER DEPOIS

// import type { Request, Response } from 'express';
// import { DashboardService } from '../services/dashboard.service';

// export class DashboardController {
//   constructor(private dashboardService: DashboardService) {}

//   public async getVendasPorLanche(req: Request, res: Response): Promise<Response> {
//     try {
//       const relatorioDeVendas = await this.dashboardService.getVendasPorLanche();
//       return res.status(200).json(relatorioDeVendas);
//     } catch (error: any) {
//       return res.status(500).json({ message: error.message });
//     }
//   }
// }