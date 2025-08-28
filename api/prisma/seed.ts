import { PrismaClient } from '@prisma/client';
// Se você tem um model Admin com Role, pode precisar do import
// import { Role } from '@prisma/client'; 
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando o processo de seeding...');

  const adminPassword = await hash('admin123', 10);
  await prisma.admin.upsert({
    where: { email: 'admin@burguer.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@burguer.com',
      password: adminPassword,
    },
  });

  const clientePassword = await hash('cliente123', 10);
  await prisma.cliente.upsert({
    where: { email: 'cliente@email.com' },
    update: {},
    create: {
      name: 'Cliente Teste',
      email: 'cliente@email.com',
      password: clientePassword,
      address: 'Rua dos Testes, 123, Bairro Beta',
      phone: '55999999999',
    },
  });

  console.log('👤 Admin e Cliente criados.');

  await prisma.ingrediente.createMany({
    data: [
      { name: 'Pão de Brioche', quantidadeEstoque: 99, unidadeMedida: 'un' },
      { name: 'Hambúrguer de Carne 150g', quantidadeEstoque: 99, unidadeMedida: 'un' },
      { name: 'Queijo Cheddar', quantidadeEstoque: 99, unidadeMedida: 'fatia' },
      { name: 'Bacon Crocante', quantidadeEstoque: 99, unidadeMedida: 'fatia' },
      { name: 'Alface Americana', quantidadeEstoque: 99, unidadeMedida: 'folha' },
      { name: 'Tomate', quantidadeEstoque: 99, unidadeMedida: 'rodela' },
      { name: 'Cebola Roxa', quantidadeEstoque: 99, unidadeMedida: 'anel' },
      { name: 'Picles', quantidadeEstoque: 99, unidadeMedida: 'fatia' },
      { name: 'Molho Especial', quantidadeEstoque: 99, unidadeMedida: 'ml' },
      { name: 'Ovo', quantidadeEstoque: 99, unidadeMedida: 'un' },
    ],
    skipDuplicates: true,
  });

  await prisma.acompanhamento.createMany({
    data: [
      { name: 'Batata Frita P', quantidadeEstoque: 99 },
      { name: 'Batata Frita G', quantidadeEstoque: 99 },
      { name: 'Anéis de Cebola', quantidadeEstoque: 99 },
      { name: 'Refrigerante Lata', quantidadeEstoque: 99 },
      { name: 'Milk-shake de Chocolate', quantidadeEstoque: 99 },
    ],
    skipDuplicates: true,
  });

  console.log('🧀 Ingredientes e Acompanhamentos criados.');
  
  const ingredientes = await prisma.ingrediente.findMany();
  const ingredientesMap = new Map(ingredientes.map(i => [i.name, i.id]));

  const lanchesData = [
    { name: 'Classic Burger', description: 'Pão, carne e queijo na medida certa.', price: 25.0, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add', ingredientes: ['Pão de Brioche', 'Hambúrguer de Carne 150g', 'Queijo Cheddar'] },
    { name: 'Bacon Supreme', description: 'O clássico, agora com bacon.', price: 30.5, image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50', ingredientes: ['Pão de Brioche', 'Hambúrguer de Carne 150g', 'Queijo Cheddar', 'Bacon Crocante'] },
    { name: 'Salad Burger', description: 'Uma opção mais leve.', price: 28.0, image: 'https://images.unsplash.com/photo-1550317138-10000687a72b', ingredientes: ['Pão de Brioche', 'Hambúrguer de Carne 150g', 'Queijo Cheddar', 'Alface Americana', 'Tomate', 'Cebola Roxa'] },
    { name: 'Double Trouble', description: 'Dois hambúrgueres para o dobro de fome.', price: 38.0, image: 'https://images.unsplash.com/photo-1549611016-3a70d82b5040', ingredientes: ['Pão de Brioche', 'Hambúrguer de Carne 150g', 'Hambúrguer de Carne 150g', 'Queijo Cheddar', 'Queijo Cheddar'] },
    { name: 'Picles Power', description: 'Para os amantes do azedinho.', price: 27.0, image: 'https://images.unsplash.com/photo-1603043435899-31c34a2ed8d5', ingredientes: ['Pão de Brioche', 'Hambúrguer de Carne 150g', 'Queijo Cheddar', 'Picles', 'Molho Especial'] },
    { name: 'The Big Boss', description: 'O chefão da casa. Você aguenta?', price: 45.0, image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330', ingredientes: ['Pão de Brioche', 'Hambúrguer de Carne 150g', 'Hambúrguer de Carne 150g', 'Queijo Cheddar', 'Bacon Crocante', 'Ovo', 'Alface Americana', 'Molho Especial'] },
    { name: 'Chicken Classic', description: 'Uma alternativa saborosa com frango grelhado.', price: 26.0, image: 'https://images.unsplash.com/photo-1562967914-608f82629710', ingredientes: ['Pão de Brioche', 'Alface Americana', 'Tomate', 'Molho Especial'] },
    { name: 'Veggie Delight', description: 'Hambúrguer de plantas, cheio de sabor.', price: 32.0, image: 'https://images.unsplash.com/photo-1551615593-ef5fe247e8f7', ingredientes: ['Pão de Brioche', 'Alface Americana', 'Tomate', 'Cebola Roxa'] },
    { name: 'Spicy Jalapeño', description: 'Para quem gosta de um toque picante.', price: 31.0, image: 'https://images.unsplash.com/photo-1604391183325-bdda61fe94e0', ingredientes: ['Pão de Brioche', 'Hambúrguer de Carne 150g', 'Queijo Cheddar'] },
    { name: 'Melted Cheese', description: 'Simplesmente uma explosão de queijo.', price: 29.0, image: 'https://images.unsplash.com/photo-1605691234724-4f4281b61b8f', ingredientes: ['Pão de Brioche', 'Hambúrguer de Carne 150g', 'Queijo Cheddar', 'Queijo Cheddar'] }
  ];

  for (const lanche of lanchesData) {
    const ingredientCounts = new Map<string, number>();
    for (const nomeIngrediente of lanche.ingredientes) {
      const count = ingredientCounts.get(nomeIngrediente) || 0;
      ingredientCounts.set(nomeIngrediente, count + 1);
    }

    const ingredientesParaCriar = Array.from(ingredientCounts.entries()).map(
      ([nomeIngrediente, quantidade]) => ({
        ingredienteId: ingredientesMap.get(nomeIngrediente)!,
        quantidadePadrão: quantidade,
      })
    );

    await prisma.lanche.upsert({
      where: { name: lanche.name },
      update: {},
      create: {
        name: lanche.name,
        description: lanche.description,
        price: lanche.price,
        image: lanche.image,
        ingredientes: {
          create: ingredientesParaCriar,
        },
      },
    });
  }

  console.log('🍔 Lanches e suas receitas criados.');
  console.log('✅ Seeding finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o processo de seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });