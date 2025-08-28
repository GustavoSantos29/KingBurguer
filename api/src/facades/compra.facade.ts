import {prisma} from "src/lib/prisma.js";
import type { CreateCompraDTO } from "../models/compra.model.js";
import { CompraRepository } from "../repositories/compra.repository.js";
import { EstoqueService } from "../services/estoque.service.js";
import { NotificacaoService } from "../services/notificacao.service.js";

export class ComprFacade {
  private compraRepository: CompraRepository;
  private estoqueService: EstoqueService;
  private notificacaoService: NotificacaoService;

  constructor() {
    this.compraRepository = new CompraRepository();
    this.estoqueService = new EstoqueService();
    this.notificacaoService = new NotificacaoService();
  }

  public async processarNovaCompra(compraData: CreateCompraDTO) {
    
    return prisma.$transaction(async (tx) => {
      
      await this.estoqueService.darBaixaDeCompra(compraData.itens, tx);
      const compra = await this.compraRepository.create(compraData);
      await this.notificacaoService.notificarNovaCompra(compraData);

      return compra;
    });
  }
}
