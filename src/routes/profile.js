const express = require("express");
const router = express.Router();

const profileController = require("../controllers/ProfileController");

router.get("/:id", profileController.index);
router.put("/:id", profileController.update);

module.exports = router;