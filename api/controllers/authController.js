const prisma = require("../prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

exports.register = async (req, res) => {
  const { name, address, phone, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.cliente.create({
      data: { name, address, phone, email, password: hashedPassword },
    });
    console.log("conta criada");
    res.json({ message: "Conta criada", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log("deu erro");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.cliente.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ message: "Usuário não encontrado" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Senha incorreta" });
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
  console.log(user);
  return res.status(200).json({ token, user });
};

exports.logout = (req, res) => {
  res.json({ message: "Logout efetuado com sucesso." });
};

exports.updateUser = async (req, res) => {
  const clienteId = req.user.id;
  const { name, address, phone } = req.body;

  if (!name && !address && !phone) {
    return res.status(400).json({ message: "Nenhum dado para atualizar." });
  }

  try {
    const updatedUser = await prisma.cliente.update({
      where: { id: clienteId },
      data: {
        name,
        address,
        phone,
      },
    });

    res.json({
      message: "Usuário atualizado com sucesso.",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao atualizar usuário." });
  }
};

exports.listarCompras = async (req, res) => {
  const clienteId = req.user.id;

  try {
    const compras = await prisma.compra.findMany({
      where: { clienteId },
      orderBy: { createdAt: 'desc' },
      include: {
        lanches: {
          include: { lanche: true },
        },
      },
    });

    const resultado = compras.map(compra => ({
      id: compra.id,
      total: compra.total,
      createdAt: compra.createdAt,
      observacao : compra.observacao,
      primeiroLanche: compra.lanches[0]?.lanche || null
    }));

    res.json(resultado);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar compras' });
  }
};
