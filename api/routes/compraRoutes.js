const express = require("express");
const router = express.Router();
const compraController = require("../controllers/compraController");
const authController = require("../controllers/authController");
const authenticateToken = require('../middlewares/authMiddleware');

router.post("/comprar", authenticateToken, compraController.comprar);
router.get('/compras', authenticateToken, authController.listarCompras);

module.exports = router;

