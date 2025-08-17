import type { Request, Response } from "express";
import { AuthClienteService } from "../services/authCliente.service";

export class AuthClienteController {
  constructor(private authClienteService: AuthClienteService) {}

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
      const { cliente, token } = await this.authClienteService.login({
        email,
        password,
      });

      // Remove a senha do objeto antes de enviar a resposta
      const { password: _, ...clienteSemSenha } = cliente;

      // 2. O Controller envia a resposta HTTP de sucesso
      return res.status(200).json({ token, cliente: clienteSemSenha });
    } catch (error: any) {
      // 3. O Controller lida com os erros e retorna o status HTTP apropriado
      // O erro "Email ou senha inválidos." virá do nosso serviço.
      return res.status(400).json({ message: error.message });
    }
  }

  public async register(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email e senha são obrigatórios." });
      }

      const cliente = await this.authClienteService.register(req.body);

      return res.status(200).json(cliente);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
