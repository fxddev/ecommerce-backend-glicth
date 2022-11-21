const express = require("express");
const controller = require('../controllers/auth');

const router = express.Router();

router.post("/auth/signup", controller.signUp);
router.post("/auth/login", controller.login);

module.exports = router;