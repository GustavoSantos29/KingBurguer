import type { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

interface TokenPayload {
  id: number;
  role: string;
}

export function authAdminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token com formato inválido." });
  }

  try {
    const secret = process.env.JWT_ADMIN_SECRET;

    if (!secret) {
      console.error("FATAL ERROR: JWT_ADMIN_SECRET não foi definido no .env");
      throw new Error("Erro de configuração interna do servidor.");
    }

    const decoded = jwt.verify(token, secret);

    const { id, role } = decoded as unknown as TokenPayload;

    if (role !== "ADMIN") {
      return res.status(403).json({ error: "Acesso negado para esta rota." });
    }

    req.user = { id };
    return next();
  } catch (error: any) {
    if (error.message.includes("configuração interna")) {
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
}
