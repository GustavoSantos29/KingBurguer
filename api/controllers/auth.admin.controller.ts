import type { Request, Response } from "express";
import { AthAdminService } from "../services/authAdmin.service";

export class AuthClienteController {
  constructor(private authAdminService: AthAdminService) {}

  public async login(req: Request, res: Response): Promise<Response> {
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
    } catch (error: any) {
      // 3. O Controller lida com os erros e retorna o status HTTP apropriado
      // O erro "Email ou senha inválidos." virá do nosso serviço.
      return res.status(400).json({ message: error.message });
    }
  }

  // Você poderia adicionar um método de registro (register) aqui também


}
