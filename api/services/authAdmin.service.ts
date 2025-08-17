import prisma from "../lib/prisma";

import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import type { AdminLoginDTO } from "../models/admin.model";

export class AthAdminService {
  public async login(loginData: AdminLoginDTO) {
    const { email, password } = loginData;

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
    const token = jwt.sign(payload, process.env.JWT_ADMIN_SECRET!, {
      expiresIn: "1d",
    });

    return { admin, token };
  }
}
