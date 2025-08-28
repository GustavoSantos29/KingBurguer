import type { Request, Response, NextFunction } from "express";
import { AuthAdminService } from "../services/authAdmin.service.js";

export class AuthAdminController {
  constructor(private authAdminService: AuthAdminService) {}

  public async login(req: Request, res: Response, next: NextFunction){
    try {
      // É uma boa prática usar um DTO para validar o corpo da requisição
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email e senha são obrigatórios." });
      }

      // 1. O Controller delega o trabalho pesado para o Serviço
      const { admin, token } = await this.authAdminService.login({
        email,
        password,
      });

      // Remove a senha do objeto antes de enviar a resposta
      const { password: _, ...adminSemSenha } = admin;

      // 2. O Controller envia a resposta HTTP de sucesso
      return res.status(200).json({ token, admin: adminSemSenha });
    } catch (error) {
      next(error)
    }
  }

}
