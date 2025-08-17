import { PrismaClient } from "@prisma/client";
import type { ClienteRegisterDTO, ClienteLoginDTO } from "../models/cliente.model";

const prisma = new PrismaClient();