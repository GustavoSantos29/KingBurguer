// 1. Importa o 'dotenv' para carregar as variáveis de ambiente o mais cedo possível
import "dotenv/config";

// 2. Importa as bibliotecas necessárias
import express from "express";
import cors from "cors";
import clienteRouter from "./routes/cliente.routes.js";
import lancheRouter from "./routes/lanche.routes.js";
import compraRouter from "./routes/compra.routes.js";
import adminRouter from "./routes/admin.routes.js";
import acompanhamentoRouter from "./routes/acompanhamento.routes.js";
import ingredienteRouter from "./routes/ingrediente.routes.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

// 4. Inicializa a aplicação Express
const app = express();

// 5. Aplica os middlewares globais
app.use(cors()); // Permite que o frontend acesse a API
app.use(express.json()); // Permite que o Express entenda requisições com corpo em JSON

// =================================================================
// 6. CONECTA AS ROTAS NA APLICAÇÃO
// =================================================================

// --- Rotas Públicas ---
// Qualquer um pode acessar as rotas de login e registro.
app.use("/cliente", clienteRouter);
app.use("/admin", adminRouter);

// --- Rotas Mistas (Públicas e Protegidas) ---
// O arquivo 'lanche.routes.ts' já define internamente quais rotas são
// públicas (GET) e quais são protegidas por admin (POST, PATCH, DELETE).
app.use("/lanches", lancheRouter);

// --- Rotas Protegidas para Clientes ---
// Todas as rotas dentro de 'compraRouter' exigirão um token de cliente.
app.use("/compras", compraRouter);

// --- Rotas Protegidas para Admins ---
// Todas as rotas dentro de 'acompanhamento' exigirão um token de admin.
app.use("/acompanhamentos", acompanhamentoRouter);
app.use("/ingredientes", ingredienteRouter);

app.use(errorHandler);
// =================================================================
// 7. INICIALIZA O SERVIDOR
// =================================================================
const PORT = process.env.PORT || 3333; // Usa a porta do .env ou a 3333 como padrão

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
