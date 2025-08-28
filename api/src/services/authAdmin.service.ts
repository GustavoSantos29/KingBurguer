import {prisma} from "src/lib/prisma.js";

import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import type { AdminLoginDTO } from "../models/admin.model.js";
import { BadRequestError } from "../errors/index.js";

export class AuthAdminService {
  public async login(loginData: AdminLoginDTO) {
    const { email, password } = loginData;

    if (!email || !password) {
      throw new BadRequestError("Email ou senha não enviados corretamente");
    }

    const admin = await prisma.admin.findUnique({
      where: { email: email },
    });

    if (!admin) {
      throw new Error("Email ou senha inválidos.");
    }

    const isPassworValid = await bcrypt.compare(password, admin.password);

    if (!isPassworValid) {
      throw new Error("Email ou senha inválidos.");
    }

    const payload = {
      id: admin.id,
      name: admin.name,
      role: "ADMIN",
    };
    const token = jwt.default.sign(payload, process.env.JWT_ADMIN_SECRET!, {
      expiresIn: "1d",
    });

    return { admin, token };
  }
}
