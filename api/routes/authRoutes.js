const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateToken = require('../middlewares/authMiddleware');

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.put("/update", authenticateToken, authController.updateUser);
router.get('/compras', authenticateToken, authController.listarCompras);

module.exports = router;
