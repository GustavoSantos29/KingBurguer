const prisma = require("../prisma/client");

exports.comprar = async (req, res) => {
  const clienteId = req.user.id;
  const { lanches, total, observacao, address } = req.body;

  try {
    const compra = await prisma.compra.create({
      data: {
        clienteId,
        total,
        observacao,
        address,
        lanches: {
          create: lanches.map((l) => ({
            lancheId: l.id,
            quantidade: l.quantidade
          })),
        },
      },
    });
    res.json({ message: "Compra realizada", compra });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
