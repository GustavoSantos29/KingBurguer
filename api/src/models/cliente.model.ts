import type { Prisma } from "@prisma/client";
import type { Compra } from "./compra.model";

export type Cliente = Prisma.ClienteGetPayload<{}>;

export type ClienteLoginDTO = {
  email: string;
  password: string;
};

export type ClienteRegisterDTO = {
  name: string;
  address: string;
  phone: string;
  email: string;
  password: string;
};

export type UpdateClienteDTO = {
  clienteId: number;
  name: string;
  address: string;
  phone: string;
  email: string;
};
