require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app = express();

const authRoutes = require("./routes/authRoutes");
const lancheRoutes = require("./routes/lancheRoutes");
const compraRoutes = require("./routes/compraRoutes");

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/lanches", lancheRoutes);
app.use("/compras", compraRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
