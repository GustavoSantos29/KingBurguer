const prisma = require("../prisma/client");

exports.listar = async (req, res) => {
  const lanches = await prisma.lanche.findMany({
    include: { ingredientes: { include: { ingrediente: true } } },
  });
  res.json(lanches);
};
