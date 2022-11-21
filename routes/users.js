const express = require("express");
const controller = require('../controllers/users');

const router = express.Router();

router.post("/user", controller.user);
router.post("/user/create", controller.create);
router.put("/user/update", controller.update);

module.exports = router;