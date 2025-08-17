import type { Prisma } from "@prisma/client";
import prisma from "../lib/prisma";

import type {
  ClienteLoginDTO,
  ClienteRegisterDTO,
  UpdateClienteDTO,
} from "../models/cliente.model";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export class AuthClienteService {
  public async login(loginData: ClienteLoginDTO) {
    const { email, password } = loginData;

    const cliente = await prisma.cliente.findUnique({
      where: { email: email },
    });

    if (!cliente) {
      throw new Error("Email ou senha inválidos.");
    }

    const isPassworValid = await bcrypt.compare(password, cliente.password);

    if (!isPassworValid) {
      throw new Error("Email ou senha inválidos.");
    }

    const payload = {
      id: cliente.id,
      name: cliente.name,
      role: "CLIENTE",
    };
    const token = jwt.sign(payload, process.env.JWT_CLIENTE_SECRET!, {
      expiresIn: "1d",
    });

    return { cliente, token };
  }

  public async register(registerData: ClienteRegisterDTO) {
    const { name, email, password, phone, address } = registerData;

    if (!name || !email || !password || !phone || !address) {
      throw new Error("Dados insuficientes para cadastrar um novo cliente");
    }

    const formatedPassword = await bcrypt.hash(password, 10);

    try {
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
    } catch (error: any) {
      console.error("Falha ao cadastrar cliente no serviço:", error);

      // código P2002 significa que esta tentando cadastrar um email já existente

      if (error?.code === "P2002") {
        throw new Error("Este email já está em uso.");
      }
      throw new Error("Não foi possível cadastrar cliente no banco de dados.");
    }
  }

  public async update(updateData: UpdateClienteDTO) {
    const { clienteId, name, address, phone, email } = updateData;

    const dataToUpdate: Prisma.ClienteUpdateInput = {
      name,
      address,
      phone,
      email,
    };

    try {
      const cliente = await prisma.cliente.update({
        where: {
          id: clienteId,
        },
        data: dataToUpdate,
      });
      return cliente;
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new Error(`Cliente com o ID ${clienteId} não foi encontrado.`);
      }
      console.error("Falha ao atualizar o cliente no serviço:", error);
      throw new Error(
        "Não foi possível atualizar o cliente no banco de dados."
      );
    }
  }
}
