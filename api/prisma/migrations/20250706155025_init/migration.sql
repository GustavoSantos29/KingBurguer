-- CreateTable
CREATE TABLE "Lanche" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Lanche_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingrediente" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Ingrediente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LancheIngrediente" (
    "lanche_id" INTEGER NOT NULL,
    "ingrediente_id" INTEGER NOT NULL,

    CONSTRAINT "LancheIngrediente_pkey" PRIMARY KEY ("lanche_id","ingrediente_id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Compra" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "observacao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "address" TEXT NOT NULL,

    CONSTRAINT "Compra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompraLanche" (
    "quantidade" INTEGER NOT NULL,
    "compraId" INTEGER NOT NULL,
    "lancheId" INTEGER NOT NULL,

    CONSTRAINT "CompraLanche_pkey" PRIMARY KEY ("compraId","lancheId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

-- AddForeignKey
ALTER TABLE "LancheIngrediente" ADD CONSTRAINT "LancheIngrediente_lanche_id_fkey" FOREIGN KEY ("lanche_id") REFERENCES "Lanche"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LancheIngrediente" ADD CONSTRAINT "LancheIngrediente_ingrediente_id_fkey" FOREIGN KEY ("ingrediente_id") REFERENCES "Ingrediente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompraLanche" ADD CONSTRAINT "CompraLanche_compraId_fkey" FOREIGN KEY ("compraId") REFERENCES "Compra"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompraLanche" ADD CONSTRAINT "CompraLanche_lancheId_fkey" FOREIGN KEY ("lancheId") REFERENCES "Lanche"("id") ON DELETE CASCADE ON UPDATE CASCADE;
