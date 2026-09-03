const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/registration", userController.register);
router.post("/login", userController.login);
router.get("/:id", userController.getById);

module.exports = router;