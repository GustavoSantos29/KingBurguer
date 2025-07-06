const express = require("express");
const router = express.Router();
const lancheController = require("../controllers/lancheController");

router.get("/", lancheController.listar);

module.exports = router;
