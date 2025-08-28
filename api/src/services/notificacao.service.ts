import {prisma} from "src/lib/prisma.js";
import type { CreateCompraDTO } from "../models/compra.model.js";

export class NotificacaoService {
  public async notificarNovaCompra(compra: CreateCompraDTO): Promise<void> {
    console.log("============================================");
    console.log("📢 [SERVIÇO DE NOTIFICAÇÃO - MOCK]");
    console.log("-> Notificando a cozinha sobre um novo pedido...");
    console.log("-> Cliente ID:", compra.clienteId);
    console.log("-> Itens:", compra.itens.length);
    console.log("-> Total: R$", compra.total);
    console.log("============================================");

    // Como é uma função assíncrona, retornamos uma Promise resolvida.
    // Não fazemos nada complexo, apenas simulamos que a operação terminou.
    return Promise.resolve();
  }
}
