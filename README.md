🇧🇷 Projeto Hamburgueria
Um projeto feito utilizando Flutter e JavaScript, criado com o propósito de simular um aplicativo de uma hamburgueria real.
O aplicativo conta com sistema de:

Criação de conta

Carrinho de compras

Lista de pedidos

🚀 Como usar
1️⃣ Você precisa ter o PostgreSQL e o Node.js instalados.

2️⃣ É necessário criar um arquivo .env na raiz da pasta backend com os seguintes dados:

DATABASE_URL="postgresql://seu_login_postgres:sua_senha_postgres@localhost:5432/Jardim"
SECRET="Uma palavra chave de criptografia para os tokens"
3️⃣ Na raiz do backend, rode os seguintes comandos para iniciar a API:

npm install express bcryptjs jsonwebtoken dotenv @prisma/client
npm install -D prisma
npx prisma generate
npx prisma migrate dev
node index.js
4️⃣ Você também pode usar o SQL abaixo para popular o banco de dados com alguns lanches:

-- Inserir ingredientes
INSERT INTO "Ingrediente" (name) VALUES
('Pão'),
('Carne Bovina'),
('Frango'),
('Alface'),
('Maionese'),
('Cebola');

-- Inserir lanches
INSERT INTO "Lanche" (name, description, price, image) VALUES
('X-bacon', 'descrição do lanche Lanche 1', 19.99, 'assets/images/hamburguerExemplo.jpg'),
('X-tudo', 'descrição do lanche Lanche 2', 21.99, 'assets/images/hamburguerExemplo.jpg'),
('X-salad', 'descrição do lanche Lanche 3', 18.99, 'assets/images/hamburguerExemplo.jpg'),
('Duplo cheddar', 'descrição do lanche Lanche 4', 22.99, 'assets/images/hamburguerExemplo.jpg'),
('Moda da casa', 'descrição do lanche Lanche 5', 20.99, 'assets/images/hamburguerExemplo.jpg'),
('Triplo frango', 'descrição do lanche Lanche 6', 19.49, 'assets/images/hamburguerExemplo.jpg'),
('Vegâno', 'descrição do lanche Lanche 7', 23.49, 'assets/images/hamburguerExemplo.jpg'),
('Smash simples', 'descrição do lanche Lanche 8', 24.99, 'assets/images/hamburguerExemplo.jpg'),
('Smash duplo', 'descrição do lanche Lanche 9', 17.99, 'assets/images/hamburguerExemplo.jpg'),
('Super smash', 'descrição do lanche Lanche 10', 25.99, 'assets/images/hamburguerExemplo.jpg');

-- Associar ingredientes aos lanches
INSERT INTO "LancheIngrediente" (lanche_id, ingrediente_id) VALUES
(1, 1), (1, 2), (1, 4),
(2, 1), (2, 3), (2, 5),
(3, 1), (3, 2), (3, 6),
(4, 1), (4, 3), (4, 4),
(5, 1), (5, 2), (5, 5),
(6, 1), (6, 3), (6, 6),
(7, 1), (7, 2), (7, 4),
(8, 1), (8, 3), (8, 5),
(9, 1), (9, 2), (9, 6),
(10, 1), (10, 3), (10, 4);
🇺🇸 Burger Shop Project
A project developed using Flutter and JavaScript, created to simulate a real burger shop app.
The app features:

Account creation

Shopping cart

Orders list

🚀 How to use
1️⃣ You need to have PostgreSQL and Node.js installed.

2️⃣ Create a .env file at the root of the backend folder with the following data:

DATABASE_URL="postgresql://your_postgres_login:your_postgres_password@localhost:5432/Jardim"
SECRET="A secret word for token encryption"

3️⃣ In the backend root, run the following commands to start the API:

npm install express bcryptjs jsonwebtoken dotenv @prisma/client
npm install -D prisma
npx prisma generate
npx prisma migrate dev
node index.js

4️⃣ You can also use the SQL below to populate the database with some burgers:

-- Insert ingredients
INSERT INTO "Ingrediente" (name) VALUES
('Bread'),
('Beef'),
('Chicken'),
('Lettuce'),
('Mayonnaise'),
('Onion');

-- Insert burgers
INSERT INTO "Lanche" (name, description, price, image) VALUES
('X-bacon', 'Burger description 1', 19.99, 'assets/images/hamburguerExemplo.jpg'),
('X-tudo', 'Burger description 2', 21.99, 'assets/images/hamburguerExemplo.jpg'),
('X-salad', 'Burger description 3', 18.99, 'assets/images/hamburguerExemplo.jpg'),
('Double cheddar', 'Burger description 4', 22.99, 'assets/images/hamburguerExemplo.jpg'),
('House special', 'Burger description 5', 20.99, 'assets/images/hamburguerExemplo.jpg'),
('Triple chicken', 'Burger description 6', 19.49, 'assets/images/hamburguerExemplo.jpg'),
('Vegan', 'Burger description 7', 23.49, 'assets/images/hamburguerExemplo.jpg'),
('Simple smash', 'Burger description 8', 24.99, 'assets/images/hamburguerExemplo.jpg'),
('Double smash', 'Burger description 9', 17.99, 'assets/images/hamburguerExemplo.jpg'),
('Super smash', 'Burger description 10', 25.99, 'assets/images/hamburguerExemplo.jpg');

-- Associate ingredients to burgers
INSERT INTO "LancheIngrediente" (lanche_id, ingrediente_id) VALUES
(1, 1), (1, 2), (1, 4),
(2, 1), (2, 3), (2, 5),
(3, 1), (3, 2), (3, 6),
(4, 1), (4, 3), (4, 4),
(5, 1), (5, 2), (5, 5),
(6, 1), (6, 3), (6, 6),
(7, 1), (7, 2), (7, 4),
(8, 1), (8, 3), (8, 5),
(9, 1), (9, 2), (9, 6),
(10, 1), (10, 3), (10, 4);
