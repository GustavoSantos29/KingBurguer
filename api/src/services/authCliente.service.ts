import type { Prisma } from "@prisma/client";
import { prisma } from "src/lib/prisma.js";

import type {
  ClienteLoginDTO,
  ClienteRegisterDTO,
  UpdateClienteDTO,
} from "../models/cliente.model.js";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { BadRequestError, NotFoundError } from "../errors/index.js";

export class AuthClienteService {
  public async login(loginData: ClienteLoginDTO) {
    const { email, password } = loginData;

    if (!email || !password) {
      throw new BadRequestError("Email e senha obrigatorios");
    }

    const cliente = await prisma.cliente.findUnique({
      where: { email: email },
    });

    if (!cliente) {
      throw new NotFoundError("Email ou senha inválidos.");
    }

    const isPassworValid = await bcrypt.compare(password, cliente.password);

    if (!isPassworValid) {
      throw new NotFoundError("Email ou senha inválidos.");
    }

    const payload = {
      id: cliente.id,
      name: cliente.name,
      role: "CLIENTE",
    };
    const segredoDeCriacao = process.env.JWT_CLIENTE_SECRET;
    console.log("🔑 Segredo usado para CRIAR o token:", segredoDeCriacao);

    const token = jwt.default.sign(payload, process.env.JWT_CLIENTE_SECRET!, {
      expiresIn: "1d",
    });

    const tokenDecodificado = jwt.default.decode(token);
    console.log("📦 Conteúdo do token recém-criado:", tokenDecodificado);

    return { cliente, token };
  }

  public async register(registerData: ClienteRegisterDTO) {
    const { name, email, password, phone, address } = registerData;

    if (!name || !email || !password || !phone || !address) {
      throw new BadRequestError(
        "Dados insuficientes para cadastrar um novo cliente"
      );
    }

    const formatedPassword = await bcrypt.hash(password, 10);

    const cliente = await prisma.cliente.create({
      data: {
        name,
        email,
        password: formatedPassword,
        phone,
        address,
      },
    });

    const { password: _, ...clienteSemSenha } = cliente;

    return clienteSemSenha;
  }

  public async update(updateData: UpdateClienteDTO) {
    const { clienteId, name, address, phone, email } = updateData;

    if (!clienteId) {
      throw new BadRequestError("Dados do cliente não enviado corretamente");
    }
    const dataToUpdate: Prisma.ClienteUpdateInput = {
      name,
      address,
      phone,
      email,
    };

    const cliente = await prisma.cliente.update({
      where: {
        id: clienteId,
      },
      data: dataToUpdate,
    });
    return cliente;
  }
}
