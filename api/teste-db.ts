import { PrismaClient } from '@prisma/client';

// Este script usa o mesmo PrismaClient que sua aplicação usa
const prisma = new PrismaClient({
  // Adicionamos um log para ver o que o Prisma está tentando fazer
  log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  console.log('🚀 Iniciando teste de conexão com o Prisma...');
  try {
    // Tenta forçar a conexão
    await prisma.$connect();
    console.log('✅ Conexão com o banco de dados bem-sucedida!');
    
    // Tenta fazer uma consulta super simples
    const count = await prisma.lanche.count();
    console.log(`✅ Consulta bem-sucedida! Encontrados ${count} lanches na base.`);

  } catch (error) {
    console.error('❌ ERRO DURANTE O TESTE DE CONEXÃO:', error);
  } finally {
    // Garante que a conexão seja encerrada no final
    await prisma.$disconnect();
    console.log('🔚 Conexão com o banco de dados encerrada.');
  }
}

// Executa a função
main();