import { Router } from "express";
import { AuthAdminController } from "../controllers/auth.admin.controller.js";
import { AuthAdminService } from "../services/authAdmin.service.js";


const adminRouter = Router();
const adminService = new AuthAdminService();
const adminController = new AuthAdminController(adminService)

adminRouter.post('/login',adminController.login.bind(adminController));

export default adminRouter