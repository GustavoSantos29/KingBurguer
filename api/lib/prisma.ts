import { PrismaClient } from '@prisma/client';


// Utilização de um singleton para gerenciar um único pool de conexões

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});


export default prisma;