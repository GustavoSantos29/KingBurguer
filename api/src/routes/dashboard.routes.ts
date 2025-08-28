// import { Router } from "express";
// import { DashboardController } from "../controllers/dashboard.controller";
// import { DashboardService } from "../services/dashboard.service";
// import { authAdminMiddleware } from "../middlewares/authAdmin.middleware";

// const dashboardRouter = Router();

// const dashboardService = new DashboardService();
// const dashboardController = new DashboardController(dashboardService);

// dashboardRouter.get('/', authAdminMiddleware, (req,res) => dashboardController.getVendasPorLanche(req,res));

// export default dashboardRouter