import type { Compra } from "./compra.model";

export interface Cliente {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  image?: string;
  compras: Compra[];
}

export interface ClienteLoginDTO {
  email: string;
  password: string;
}

export interface ClienteRegisterDTO {
  name: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

export interface UpdateClienteDTO {
  clienteId: number;
  name: string;
  address: string;
  phone: string;
  email: string;
}
