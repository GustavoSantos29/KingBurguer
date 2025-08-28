import { Request, Response, NextFunction } from 'express';
// Corrigido para importar a classe base diretamente para a verificação
import { AppError } from 'src/errors/index.js';

export function errorHandler(
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
){
    console.error("❗️ Erro capturado:", error);

    if (error instanceof AppError) {
        // CORREÇÃO: Usamos '(error as AppError)' para que o TypeScript
        // saiba que esta propriedade existe.
        return response.status((error as AppError).statusCode).json({
            status: "error",
            message: error.message,
        });
    }

    // Se o erro não for uma instância de AppError, é um erro inesperado.
    return response.status(500).json({
        status: "error",
        message: "Erro interno do servidor.",
    });
}