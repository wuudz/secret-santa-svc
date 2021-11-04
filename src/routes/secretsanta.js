const express = require("express");
const router = express.Router();

const secretSantaController = require("../controllers/SecretSantaController");

router.post("/", secretSantaController.create);

module.exports = router;